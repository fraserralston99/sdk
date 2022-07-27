import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
export interface IAccountRevokeDelegateRequest {
    connection: Connection;
    signer: IWalletSigner;
    tokenAccount: PublicKey;
}
export declare function getAccountRevokeDelegateInstructions(request: IAccountRevokeDelegateRequest): Promise<{
    instructions: import("@solana/web3.js").TransactionInstruction[];
    signers: IWalletSigner[];
}>;
