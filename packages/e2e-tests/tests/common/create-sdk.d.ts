import { Blockchain } from "@rarible/api-client";
import type { IRaribleSdk } from "@rarible/sdk";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
export declare function createSdk(blockchain: Blockchain, wallet: BlockchainWallet): IRaribleSdk;
