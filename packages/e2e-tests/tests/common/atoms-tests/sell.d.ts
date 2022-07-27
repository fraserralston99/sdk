import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { Order } from "@rarible/api-client";
import type { OrderRequest, PrepareOrderRequest } from "@rarible/sdk/src/types/order/common";
/**
 * Make new sell order and check stocks
 */
export declare function sell(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareOrderRequest: PrepareOrderRequest, orderRequest: OrderRequest): Promise<Order>;
