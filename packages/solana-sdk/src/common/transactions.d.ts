import type { Commitment, Connection, TransactionInstruction } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { DebugLogger } from "../logger/debug-logger";
import type { TransactionResult } from "../types";
export declare const DEFAULT_TIMEOUT = 60000;
export interface ITransactionPreparedInstructions {
    instructions: TransactionInstruction[];
    signers: IWalletSigner[];
}
export declare function sendTransactionWithRetry(connection: Connection, wallet: IWalletSigner, instructions: TransactionInstruction[], signers: IWalletSigner[], commitment: Commitment, logger?: DebugLogger): Promise<TransactionResult>;
export declare function sendSignedTransaction({ signedTransaction, connection, timeout, }: {
    signedTransaction: Transaction;
    connection: Connection;
    sendingMessage?: string;
    sentMessage?: string;
    successMessage?: string;
    timeout?: number;
}, logger?: DebugLogger): Promise<TransactionResult>;
