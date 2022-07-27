import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { RequestCurrency } from "@rarible/sdk/build/common/domain";
export declare function mintAndSell(wallet: BlockchainWallet, currency: RequestCurrency): Promise<import("@rarible/types").ItemId | undefined>;
