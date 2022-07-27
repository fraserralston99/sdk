import type { Connection, PublicKey } from "@solana/web3.js";
import { DataV2 } from "@metaplex-foundation/mpl-token-metadata";
import type { Uses } from "@metaplex-foundation/mpl-token-metadata";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { ITransactionPreparedInstructions } from "../../../common/transactions";
export declare function createMetadata(metadataLink: string, collection: PublicKey | null, verifyCreators?: Record<string, boolean>, uses?: Uses | null): Promise<DataV2>;
export declare function getMintNftInstructions(connection: Connection, signer: IWalletSigner, params: {
    metadataLink: string;
    collection: PublicKey | null;
    verifyCreators: boolean;
    use?: Uses;
    masterEditionSupply: number | undefined;
    amount: number;
}): Promise<ITransactionPreparedInstructions & {
    mint: PublicKey;
}>;
