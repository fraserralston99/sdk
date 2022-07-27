import type { BlockchainWallet } from "@rarible/sdk-wallet";
export declare function mintOnChainWithTokenId(wallet: BlockchainWallet, contractAddress: string): Promise<import("@rarible/types").ItemId | undefined>;
