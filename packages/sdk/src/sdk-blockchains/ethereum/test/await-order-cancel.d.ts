import type { OrderId } from "@rarible/types";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitOrderCancel(sdk: IRaribleSdk, orderId: OrderId): Promise<import("@rarible/api-client").Order>;
