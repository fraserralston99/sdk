import type { RequestCurrency } from "@rarible/sdk/build/common/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
export declare function getCurrency(wallets: {
    seller: BlockchainWallet;
    buyer: BlockchainWallet;
}, currency: string): Promise<RequestCurrency>;
