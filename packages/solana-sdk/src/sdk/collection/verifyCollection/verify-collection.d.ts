import type { Connection, PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
export declare function getVerifyCollectionInstructions(request: {
    connection: Connection;
    signer: IWalletSigner;
    mint: PublicKey;
    collection: PublicKey;
}): Promise<{
    instructions: import("@solana/web3.js").TransactionInstruction[];
    signers: IWalletSigner[];
}>;
