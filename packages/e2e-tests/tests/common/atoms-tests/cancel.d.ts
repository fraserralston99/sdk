import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { CancelOrderRequest } from "@rarible/sdk/src/types/order/cancel/domain";
/**
 * Cancel an order
 */
export declare function cancel(sdk: IRaribleSdk, wallet: BlockchainWallet, cancelRequest: CancelOrderRequest): Promise<IBlockchainTransaction>;
