import type { FTAssetType, TezosProvider, XTZAssetType } from "@rarible/tezos-sdk";
import type { OrderId } from "@rarible/api-client";
import type * as OrderCommon from "../../types/order/common";
import type { PrepareOrderUpdateRequest, PrepareOrderUpdateResponse } from "../../types/order/common";
import type { RequestCurrencyAssetType } from "../../common/domain";
import type { PrepareSellInternalResponse } from "../../types/order/sell/domain";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider } from "./common";
export declare class TezosSell {
    private provider;
    private unionAPI;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk);
    parseTakeAssetType(type: RequestCurrencyAssetType): Promise<XTZAssetType | FTAssetType>;
    sell(): Promise<PrepareSellInternalResponse>;
    sellV2(request: OrderCommon.OrderInternalRequest): Promise<OrderId>;
    update(request: PrepareOrderUpdateRequest): Promise<PrepareOrderUpdateResponse>;
    sellV1(request: OrderCommon.OrderInternalRequest): Promise<OrderId>;
}
