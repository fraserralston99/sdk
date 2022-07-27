/// <reference types="bn.js" />
import type { BN } from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";
import { TransactionInstruction } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import type { BigNumberValue } from "@rarible/utils";
export interface ITokenBurnRequest {
    connection: Connection;
    signer: IWalletSigner;
    tokenAccount: PublicKey;
    mint: PublicKey;
    amount: BigNumberValue;
    owner?: PublicKey;
    close?: boolean;
}
export declare function getTokenBurnInstructions(request: ITokenBurnRequest): Promise<{
    instructions: TransactionInstruction[];
    signers: IWalletSigner[];
}>;
export declare function createBurnTokenInstruction(mint: PublicKey, tokenAccount: PublicKey, owner: PublicKey, amount: BN): TransactionInstruction;
