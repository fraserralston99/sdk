import type BigNumber from "bignumber.js";
import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { BigNumberValue } from "@rarible/utils";
import type { DebugLogger } from "../../logger/debug-logger";
import { PreparedTransaction } from "../prepared-transaction";
export interface IGetEscrowBalanceRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    wallet: PublicKey;
}
export interface IWithdrawEscrowRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    amount: BigNumberValue;
}
export interface IDepositEscrowRequest {
    auctionHouse: PublicKey;
    signer: IWalletSigner;
    amount: BigNumberValue;
}
export interface ISolanaAuctionHouseSdk {
    getEscrowBalance(request: IGetEscrowBalanceRequest): Promise<BigNumber>;
    withdrawEscrow(request: IWithdrawEscrowRequest): Promise<PreparedTransaction>;
    depositEscrow(request: IDepositEscrowRequest): Promise<PreparedTransaction>;
}
export declare class SolanaAuctionHouseSdk implements ISolanaAuctionHouseSdk {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: DebugLogger);
    getEscrowBalance(request: IGetEscrowBalanceRequest): Promise<BigNumber>;
    withdrawEscrow(request: IWithdrawEscrowRequest): Promise<PreparedTransaction>;
    depositEscrow(request: IDepositEscrowRequest): Promise<PreparedTransaction>;
}
