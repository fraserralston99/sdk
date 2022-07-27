import type { Connection, PublicKey } from "@solana/web3.js";
import type { BigNumberValue } from "@rarible/utils";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { DebugLogger } from "../../logger/debug-logger";
import type { ISolanaAccountSdk } from "../account/account";
import { PreparedTransaction } from "../prepared-transaction";
export declare type IMintRequest = {
    metadataUrl: string;
    signer: IWalletSigner;
    collection: PublicKey | null;
} & ({
    masterEditionSupply: number;
} | {
    amount: number;
});
export declare type IMintResponse = {
    tx: PreparedTransaction;
    mint: PublicKey;
};
export interface ITransferRequest {
    signer: IWalletSigner;
    tokenAccount?: PublicKey;
    to: PublicKey;
    mint: PublicKey;
    amount: BigNumberValue;
}
export interface IBurnRequest {
    signer: IWalletSigner;
    mint: PublicKey;
    amount: BigNumberValue;
    tokenAccount?: PublicKey;
    owner?: PublicKey;
    closeAssociatedAccount?: boolean;
}
export interface ISolanaNftSdk {
    mint(request: IMintRequest): Promise<IMintResponse>;
    transfer(request: ITransferRequest): Promise<PreparedTransaction>;
    burn(request: IBurnRequest): Promise<PreparedTransaction>;
}
export declare class SolanaNftSdk implements ISolanaNftSdk {
    private readonly connection;
    private readonly logger;
    private readonly accountSdk;
    constructor(connection: Connection, logger: DebugLogger, accountSdk: ISolanaAccountSdk);
    mint(request: IMintRequest): Promise<IMintResponse>;
    transfer(request: ITransferRequest): Promise<PreparedTransaction>;
    burn(request: IBurnRequest): Promise<PreparedTransaction>;
}
