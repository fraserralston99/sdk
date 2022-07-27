import type { ItemId } from "@rarible/api-client";
import type { BigNumber } from "@rarible/types";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitItemSupply(sdk: IRaribleSdk, itemId: ItemId, value: BigNumber | string): Promise<import("@rarible/api-client").Item>;
