import type { TezosNetwork, TezosProvider } from "@rarible/tezos-sdk";
import type { BigNumber as RaribleBigNumber } from "@rarible/types";
import type { Order } from "@rarible/api-client";
import type { PrepareFillRequest, PrepareFillResponse } from "../../types/order/fill/domain";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider } from "./common";
export declare class TezosFill {
    private provider;
    private unionAPI;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk, network: TezosNetwork);
    getPreparedOrder(request: PrepareFillRequest): Promise<Order>;
    getMaxAmount(order: Order): Promise<RaribleBigNumber>;
    isMultiple(order: Order): boolean;
    private buyV2;
    fill(request: PrepareFillRequest): Promise<PrepareFillResponse>;
    private fillV1Order;
}
