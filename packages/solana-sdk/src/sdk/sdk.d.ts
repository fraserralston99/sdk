import type { Cluster, Commitment, ConnectionConfig } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import { Connection } from "@solana/web3.js";
import { DebugLogger } from "../logger/debug-logger";
import type { TransactionResult } from "../types";
import type { PreparedTransaction } from "./prepared-transaction";
import type { ISolanaBalancesSdk } from "./balance/balance";
import type { ISolanaNftSdk } from "./nft/nft";
import type { ISolanaOrderSdk } from "./order/order";
import type { ISolanaCollectionSdk } from "./collection/collection";
import type { ISolanaAuctionHouseSdk } from "./auctionHouse/auction-house";
import type { ISolanaAccountSdk } from "./account/account";
export interface IRaribleSolanaSdk {
    nft: ISolanaNftSdk;
    balances: ISolanaBalancesSdk;
    order: ISolanaOrderSdk;
    confirmTransaction(...args: Parameters<typeof Connection.prototype.confirmTransaction>): ReturnType<typeof Connection.prototype.confirmTransaction>;
    unionInstructionsAndSend(signer: IWalletSigner, preparedTransactions: PreparedTransaction[], commitment: Commitment): Promise<TransactionResult>;
}
export interface ISolanaSdkConfig {
    connection: {
        cluster: Cluster;
        endpoint?: string;
        commitmentOrConfig?: Commitment | ConnectionConfig;
    };
    debug?: boolean;
}
interface ILoggingConfig {
    debug: boolean;
}
export declare class SolanaSdk implements IRaribleSolanaSdk {
    readonly connection: Connection;
    readonly cluster: Cluster;
    private readonly logging;
    readonly debugLogger: DebugLogger;
    readonly balances: ISolanaBalancesSdk;
    readonly nft: ISolanaNftSdk;
    readonly order: ISolanaOrderSdk;
    readonly collection: ISolanaCollectionSdk;
    readonly auctionHouse: ISolanaAuctionHouseSdk;
    readonly account: ISolanaAccountSdk;
    constructor(connection: Connection, cluster: Cluster, logging: ILoggingConfig);
    confirmTransaction(...args: Parameters<typeof Connection.prototype.confirmTransaction>): Promise<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>>;
    unionInstructionsAndSend(signer: IWalletSigner, preparedTransactions: PreparedTransaction[], commitment: Commitment): Promise<TransactionResult>;
    static create(config: ISolanaSdkConfig): SolanaSdk;
}
export {};
