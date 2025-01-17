import type { Connection, PublicKey } from "@solana/web3.js";
import type { BigNumberValue } from "@rarible/utils";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { DebugLogger } from "../../logger/debug-logger";
import { PreparedTransaction } from "../prepared-transaction";
export interface ISellRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export interface IBuyRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    tokenAccount?: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export interface ICancelRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    mint: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export interface IExecuteSellRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    buyerWallet: PublicKey;
    sellerWallet: PublicKey;
    mint: PublicKey;
    tokenAccount?: PublicKey;
    price: BigNumberValue;
    tokensAmount: BigNumberValue;
}
export interface ISolanaOrderSdk {
    sell(request: ISellRequest): Promise<PreparedTransaction>;
    buy(request: IBuyRequest): Promise<PreparedTransaction>;
    cancel(request: ICancelRequest): Promise<PreparedTransaction>;
    executeSell(request: IExecuteSellRequest): Promise<PreparedTransaction>;
}
export declare class SolanaOrderSdk implements ISolanaOrderSdk {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: DebugLogger);
    sell(request: ISellRequest): Promise<PreparedTransaction>;
    buy(request: IBuyRequest): Promise<PreparedTransaction>;
    cancel(request: ICancelRequest): Promise<PreparedTransaction>;
    acceptBid(request: ISellRequest): Promise<PreparedTransaction>;
    bid(request: IBuyRequest): Promise<PreparedTransaction>;
    executeSell(request: IExecuteSellRequest): Promise<PreparedTransaction>;
}
