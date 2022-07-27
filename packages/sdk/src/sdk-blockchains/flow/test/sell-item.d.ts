import type { ItemId, OrderId } from "@rarible/types";
import type { FlowSell } from "../sell";
export declare function sellItem(sell: FlowSell, itemId: ItemId, priceDecimals: string): Promise<OrderId>;
export declare function sellItemWithCurrencyId(sell: FlowSell, itemId: ItemId, priceDecimals: string): Promise<OrderId>;
