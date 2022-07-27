import type { OrderId } from "@rarible/api-client";
import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BigNumber } from "@rarible/types";
import type { Order } from "@rarible/api-client/build/models";
import type { Collection } from "@rarible/api-client/build/models";
import type { ItemId } from "@rarible/types";
import type { Ownership } from "@rarible/api-client/build/models";
export declare function awaitOrderStock(sdk: IRaribleSdk, id: OrderId, awaitingValue: BigNumber | string): Promise<Order>;
export declare function awaitOrderCancel(sdk: IRaribleSdk, id: OrderId): Promise<Order>;
export declare function awaitForItemSupply(sdk: IRaribleSdk, itemId: ItemId, supply: string | number | BigNumber): Promise<string>;
export declare function awaitForOwnership(sdk: IRaribleSdk, itemId: ItemId, receipent: string): Promise<Ownership>;
/**
 * Get Collection by Id
 */
export declare function getCollection(sdk: IRaribleSdk, collectionId: string): Promise<Collection>;
