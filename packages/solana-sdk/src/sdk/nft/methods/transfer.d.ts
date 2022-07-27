/// <reference types="bn.js" />
import type { Connection, PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type { BN } from "@project-serum/anchor";
import type { BigNumberValue } from "@rarible/utils";
import type { IWalletSigner } from "@rarible/solana-wallet";
export interface ITokenTransferRequest {
    connection: Connection;
    signer: IWalletSigner;
    tokenAccount: PublicKey;
    to: PublicKey;
    mint: PublicKey;
    amount: BigNumberValue;
}
export declare function getTokenTransferInstructions(request: ITokenTransferRequest): Promise<{
    instructions: TransactionInstruction[];
    signers: IWalletSigner[];
}>;
export declare function createTransferTokenInstruction(sourceTokenAccount: PublicKey, destinationTokenAccount: PublicKey, owner: PublicKey, amount: BN): TransactionInstruction;
