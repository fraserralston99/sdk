import type { BlockchainWallet } from "@rarible/sdk-wallet";
export declare function mintOffChain(wallet: BlockchainWallet, contractAddress: string): Promise<import("@rarible/types").ItemId | undefined>;
