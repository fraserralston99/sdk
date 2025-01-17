import type { PublicKey } from "@solana/web3.js";
import type { SolanaNftAssetType, SolanaSolAssetType } from "@rarible/api-client";
import type { SolanaAuctionHouseMapping } from "../domain";
declare type CurrencyType = SolanaNftAssetType | SolanaSolAssetType;
export declare function getAuctionHouse(currency: CurrencyType, auctionHouseMapping: SolanaAuctionHouseMapping | undefined): PublicKey;
export declare function getAuctionHouseFee(ah: PublicKey | string, auctionHouseMapping: SolanaAuctionHouseMapping | undefined): Promise<number>;
export {};
