import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { RequestCurrency } from "@rarible/sdk/build/common/domain";
export declare function sellAndUpdate(wallet: BlockchainWallet, assetType: RequestCurrency): Promise<void>;
