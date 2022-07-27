import type { OrderId } from "@rarible/types";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitForOrderStatus(sdk: IRaribleSdk, orderId: OrderId, status: string): Promise<void>;
