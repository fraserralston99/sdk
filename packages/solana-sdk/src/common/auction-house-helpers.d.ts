import type BigNumber from "bignumber.js";
import type { Connection } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import type { IWalletSigner } from "@rarible/solana-wallet";
import { Program } from "@project-serum/anchor";
export declare function loadAuctionHouseProgram(connection: Connection, signer: IWalletSigner): Promise<Program<import("@project-serum/anchor").Idl>>;
export declare function getAuctionHouseProgramAsSigner(): Promise<[PublicKey, number]>;
export declare function getAuctionHouseTradeState(auctionHouse: PublicKey, wallet: PublicKey, tokenAccount: PublicKey, treasuryMint: PublicKey, tokenMint: PublicKey, tokenSize: BigNumber, buyPrice: BigNumber): Promise<[PublicKey, number]>;
export declare function getAuctionHouseBuyerEscrow(auctionHouse: PublicKey, wallet: PublicKey): Promise<[PublicKey, number]>;
