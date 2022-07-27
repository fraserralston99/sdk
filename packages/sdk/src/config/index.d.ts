import type { RaribleSdkConfig, RaribleSdkEnvironment } from "./domain";
export declare const configsDictionary: Record<RaribleSdkEnvironment, RaribleSdkConfig>;
export declare function getSdkConfig(env: RaribleSdkEnvironment): RaribleSdkConfig;
export declare const NFT_STORAGE_URL = "https://api.nft.storage/upload";
