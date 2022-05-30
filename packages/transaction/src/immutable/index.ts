import type { Blockchain } from "@rarible/api-client"
import type { ImxNetwork } from "@rarible/immutable-wallet"
import type { IBlockchainTransaction } from "../domain"

export class BlockchainImxTransaction implements IBlockchainTransaction {

	blockchain: Blockchain = <Blockchain>"IMMUTABLEX"

	constructor(public transaction: { txId: string }, public network: ImxNetwork) {
	}

	hash() {
		return this.transaction.txId
	}

	async wait() {
		return {
			blockchain: this.blockchain,
			hash: this.transaction.txId,
		}
	}

	getTxLink() {
		switch (this.network) {
			case "mainnet":
				return `https://immutascan.io/tx/${this.hash()}`
			case "ropsten":
				return this.hash()
			default:
				throw new Error("Unsupported transaction network")
		}
	}
}
