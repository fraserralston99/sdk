import { Blockchain } from "@rarible/api-client";
import type { TransactionResult } from "@rarible/solana-sdk";
import type { SolanaSdk } from "@rarible/solana-sdk";
import type { IBlockchainTransaction } from "../domain";
export declare class BlockchainSolanaTransaction implements IBlockchainTransaction {
    transaction: TransactionResult;
    blockchain: Blockchain;
    cluster: string;
    getSdk: () => SolanaSdk;
    constructor(transaction: TransactionResult, sdk: SolanaSdk);
    hash(): string;
    wait(): Promise<{
        blockchain: Blockchain;
        hash: string;
    }>;
    getTxLink(): string;
    valueOf(): {
        blockchain: Blockchain;
        transaction: TransactionResult;
    };
}
