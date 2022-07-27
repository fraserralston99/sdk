import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { Order } from "@rarible/api-client";
import type { OrderUpdateRequest, PrepareOrderUpdateRequest } from "@rarible/sdk/build/types/order/common";
/**
 * Make update of bid order
 */
export declare function bidUpdate(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareOrderUpdateRequest: PrepareOrderUpdateRequest, orderUpdateRequest: OrderUpdateRequest): Promise<Order>;
