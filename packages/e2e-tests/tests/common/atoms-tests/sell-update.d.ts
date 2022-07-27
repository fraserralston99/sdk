import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { OrderUpdateRequest, PrepareOrderUpdateRequest } from "@rarible/sdk/build/types/order/common";
import type { Order } from "@rarible/api-client";
/**
 * Update sell order and check stocks
 */
export declare function sellUpdate(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareOrderUpdateRequest: PrepareOrderUpdateRequest, orderUpdateRequest: OrderUpdateRequest): Promise<Order>;
