import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { RequestCurrency } from "@rarible/sdk/build/common/domain";
export declare function mintOnChain(wallet: BlockchainWallet, assetType: RequestCurrency): Promise<import("@rarible/types").OrderId>;
