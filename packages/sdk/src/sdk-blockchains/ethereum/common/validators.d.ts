import type * as OrderCommon from "../../../types/order/common";
import type { FillRequest } from "../../../types/order/fill/domain";
export declare function validateOrderDataV3Request(request: OrderCommon.OrderRequest | FillRequest, options?: {
    shouldProvideMaxFeesBasePoint?: boolean;
}): void;
