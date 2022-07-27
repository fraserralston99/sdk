import type { OrderId } from "@rarible/api-client";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitStock(sdk: IRaribleSdk, id: OrderId, value: string | number): Promise<import("@rarible/api-client").Order>;
