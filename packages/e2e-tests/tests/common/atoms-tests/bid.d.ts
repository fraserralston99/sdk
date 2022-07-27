import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { Order } from "@rarible/api-client";
import type { OrderRequest, PrepareOrderRequest } from "@rarible/sdk/src/types/order/common";
import type { CollectionId } from "@rarible/api-client";
/**
 * Make new bid order
 */
export declare function bid(sdk: IRaribleSdk, wallet: BlockchainWallet, prepareOrderRequest: PrepareOrderRequest | {
    collectionId: CollectionId;
}, orderRequest: OrderRequest): Promise<Order>;
