import type { ItemId } from "@rarible/api-client";
import type { FlowBid } from "../bid";
export declare function createTestBid(bid: FlowBid, itemId: ItemId): Promise<import("@rarible/types").OrderId>;
export declare function createTestBidWithCurrencyId(bid: FlowBid, itemId: ItemId): Promise<import("@rarible/types").OrderId>;
