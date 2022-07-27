import type { TezosNetwork, TezosProvider, FTAssetType, XTZAssetType } from "@rarible/tezos-sdk";
import type { PrepareOrderUpdateRequest } from "../../types/order/common";
import type { PrepareBidResponse } from "../../types/order/bid/domain";
import type { PrepareBidRequest } from "../../types/order/bid/domain";
import type { PrepareBidUpdateResponse } from "../../types/order/bid/domain";
import type { RequestCurrencyAssetType } from "../../common/domain";
import type { ITezosAPI, MaybeProvider } from "./common";
import type { TezosBalance } from "./balance";
export declare class TezosBid {
    private provider;
    private apis;
    private balanceService;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, apis: ITezosAPI, balanceService: TezosBalance, network: TezosNetwork);
    getMakeAssetType(type: RequestCurrencyAssetType): XTZAssetType | FTAssetType;
    private getConvertMap;
    bid(prepare: PrepareBidRequest): Promise<PrepareBidResponse>;
    update(request: PrepareOrderUpdateRequest): Promise<PrepareBidUpdateResponse>;
}
