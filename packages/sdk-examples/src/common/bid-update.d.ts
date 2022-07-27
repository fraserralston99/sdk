import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { RequestCurrency } from "@rarible/sdk/build/common/domain";
export declare function bid(wallet: BlockchainWallet, assetType: RequestCurrency): Promise<void>;
