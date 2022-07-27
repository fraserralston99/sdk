import type { OrderId } from "@rarible/types";
import type { Order } from "@rarible/api-client/build/models";
import type { IRaribleSdk } from "../../../domain";
export declare function awaitForOrder(sdk: IRaribleSdk, orderId: OrderId): Promise<Order>;
