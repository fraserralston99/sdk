import type {
	Commitment,
	Connection,
	RpcResponseAndContext,
	SignatureStatus,
	SimulatedTransactionResponse,
	TransactionInstruction,
	TransactionSignature,
} from "@solana/web3.js"
import {
	Transaction,
} from "@solana/web3.js"
import type { IWalletSigner } from "@rarible/solana-wallet"
import type { TransactionResult } from "../types"
import { getUnixTs, sleep } from "./utils"

export const DEFAULT_TIMEOUT = 15000

export async function sendTransactionWithRetry(
	connection: Connection,
	wallet: IWalletSigner,
	instructions: TransactionInstruction[],
	signers: IWalletSigner[],
	commitment: Commitment = "singleGossip",
): Promise<TransactionResult> {
	const transaction = new Transaction({ feePayer: wallet.publicKey })
	instructions.forEach(instruction => transaction.add(instruction))
	transaction.recentBlockhash = (await connection.getRecentBlockhash(commitment)).blockhash

	if (signers.length > 0) {
		await wallet.signTransaction(transaction)
		for (let signer of signers) {
			await signer.signTransaction(transaction)
		}
	} else {
		await wallet.signTransaction(transaction)
	}

	return await sendSignedTransaction({
		connection,
		signedTransaction: transaction,
	})
}

export async function sendSignedTransaction(
	{
		signedTransaction,
		connection,
		timeout = DEFAULT_TIMEOUT,
	}: {
		signedTransaction: Transaction
		connection: Connection
		sendingMessage?: string
		sentMessage?: string
		successMessage?: string
		timeout?: number
	}): Promise<TransactionResult> {
	const rawTransaction = signedTransaction.serialize()
	const startTime = getUnixTs()
	let slot = 0
	const txId: TransactionSignature = await connection.sendRawTransaction(
		rawTransaction,
		{
			skipPreflight: true,
		},
	)

	console.log("Started awaiting confirmation for", txId)

	let done = false;
	(async () => {
		while (!done && getUnixTs() - startTime < timeout) {
			connection.sendRawTransaction(rawTransaction, {
				skipPreflight: true,
			})
			await sleep(500)
		}
	})()
	try {
		const confirmation = await awaitTransactionSignatureConfirmation(
			txId,
			timeout,
			connection,
			"confirmed",
			true,
		)

		if (!confirmation) {
			throw new Error("Timed out awaiting confirmation on transaction")
		}
		if (confirmation.err) {
			console.error(confirmation.err)
			throw new Error("Transaction failed: Custom instruction error")
		}

		slot = confirmation?.slot || 0
	} catch (err: any) {
		console.error("Timeout Error caught", err)
		if (err.timeout) {
			throw new Error("Timed out awaiting confirmation on transaction")
		}
		let simulateResult: SimulatedTransactionResponse | null = null
		try {
			simulateResult = (
				await simulateTransaction(connection, signedTransaction, "single")
			).value
		} catch (e) {
			console.error("Simulate Transaction error", e)
		}
		if (simulateResult && simulateResult.err) {
			if (simulateResult.logs) {
				for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
					const line = simulateResult.logs[i]
					if (line.startsWith("Program log: ")) {
						console.log(simulateResult.logs)
						throw new Error(
							"Transaction failed: " + line.slice("Program log: ".length),
						)
					}
				}
			}
			throw new Error(JSON.stringify(simulateResult.err))
		}
		console.error("Got this far.")
		// throw new Error("Transaction failed")
	} finally {
		done = true
	}

	console.debug("Latency (ms)", txId, getUnixTs() - startTime)
	return { txId, slot }
}

async function simulateTransaction(
	connection: Connection,
	transaction: Transaction,
	commitment: Commitment,
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
	// @ts-ignore
	transaction.recentBlockhash = await connection._recentBlockhash(
		// @ts-ignore
		connection._disableBlockhashCaching,
	)

	const signData = transaction.serializeMessage()
	// @ts-ignore
	const wireTransaction = transaction._serialize(signData)
	const encodedTransaction = wireTransaction.toString("base64")
	const config: any = { encoding: "base64", commitment }
	const args = [encodedTransaction, config]

	// @ts-ignore
	const res = await connection._rpcRequest("simulateTransaction", args)
	if (res.error) {
		throw new Error("failed to simulate transaction: " + res.error.message)
	}
	return res.result
}

async function awaitTransactionSignatureConfirmation(
	txid: TransactionSignature,
	timeout: number,
	connection: Connection,
	commitment: Commitment = "recent",
	queryStatus = false,
): Promise<SignatureStatus | null | void> {
	let done = false
	let status: SignatureStatus | null | void = {
		slot: 0,
		confirmations: 0,
		err: null,
	}
	let subId = 0
	// eslint-disable-next-line no-async-promise-executor
	status = await new Promise(async (resolve, reject) => {
		setTimeout(() => {
			if (done) {
				return
			}
			done = true
			console.warn("Rejecting for timeout...")
			reject({ timeout: true })
		}, timeout)
		try {
			subId = connection.onSignature(
				txid,
				(result, context) => {
					done = true
					status = {
						err: result.err,
						slot: context.slot,
						confirmations: 0,
					}
					if (result.err) {
						console.warn("Rejected via websocket", result.err)
						reject(status)
					} else {
						console.debug("Resolved via websocket", result)
						resolve(status)
					}
				},
				commitment,
			)
		} catch (e) {
			done = true
			console.error("WS error in setup", txid, e)
		}
		while (!done && queryStatus) {
			// eslint-disable-next-line no-loop-func
			(async () => {
				try {
					const signatureStatuses = await connection.getSignatureStatuses([
						txid,
					])
					status = signatureStatuses && signatureStatuses.value[0]
					if (!done) {
						if (!status) {
							console.debug("REST null result for", txid, status)
						} else if (status.err) {
							console.error("REST error for", txid, status)
							done = true
							reject(status.err)
						} else if (!status.confirmations) {
							console.debug("REST no confirmations for", txid, status)
						} else {
							console.debug("REST confirmation for", txid, status)
							done = true
							resolve(status)
						}
					}
				} catch (e) {
					if (!done) {
						console.error("REST connection error: txid", txid, e)
					}
				}
			})()
			await sleep(2000)
		}
	})

	//@ts-ignore
	if (connection._signatureSubscriptions[subId]) {
		connection.removeSignatureListener(subId)
	}
	done = true
	console.debug("Returning status", status)
	return status
}
