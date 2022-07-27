import type { ItemId } from "@rarible/api-client";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitDeletedItem(sdk: IRaribleSdk, itemId: ItemId): Promise<import("@rarible/api-client").Item>;
