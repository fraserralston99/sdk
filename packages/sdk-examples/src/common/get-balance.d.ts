import type { RequestCurrency } from "@rarible/sdk";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
export declare function getBalance(wallet: BlockchainWallet, assetType: RequestCurrency): Promise<import("bignumber.js").default.Value>;
