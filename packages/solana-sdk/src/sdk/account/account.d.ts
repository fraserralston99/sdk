import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { DebugLogger } from "../../logger/debug-logger";
import { PreparedTransaction } from "../prepared-transaction";
import { getAccountInfo } from "../../common/helpers";
export interface ITokenAccountRequest {
    mint: PublicKey;
    owner: PublicKey;
}
export interface IAccountInfoRequest {
    mint: PublicKey;
    tokenAccount: PublicKey;
}
export interface IRevokeRequest {
    signer: IWalletSigner;
    tokenAccount: PublicKey;
}
export interface ISolanaAccountSdk {
    getTokenAccountForMint(request: ITokenAccountRequest): Promise<PublicKey | undefined>;
    getAccountInfo(request: IAccountInfoRequest): ReturnType<typeof getAccountInfo>;
    revokeDelegate(request: IRevokeRequest): Promise<PreparedTransaction>;
}
export declare class SolanaAccountSdk implements ISolanaAccountSdk {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: DebugLogger);
    getTokenAccountForMint(request: ITokenAccountRequest): Promise<PublicKey | undefined>;
    getAccountInfo(request: IAccountInfoRequest): ReturnType<typeof getAccountInfo>;
    revokeDelegate(request: IRevokeRequest): Promise<PreparedTransaction>;
}
