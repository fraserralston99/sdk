import type { SolanaSdk } from "@rarible/solana-sdk";
import type { Maybe } from "@rarible/types/build/maybe";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { PrepareOrderUpdateRequest, PrepareOrderUpdateResponse } from "../../types/order/common";
import type { IApisSdk } from "../../domain";
import type { ICancel } from "../../types/order/cancel/domain";
import type { PrepareBidRequest, PrepareBidResponse, PrepareBidUpdateResponse } from "../../types/order/bid/domain";
import type { PrepareSellInternalResponse } from "../../types/order/sell/domain";
import type { ISolanaSdkConfig } from "./domain";
export declare class SolanaOrder {
    readonly sdk: SolanaSdk;
    readonly wallet: Maybe<SolanaWallet>;
    private readonly apis;
    private readonly config;
    constructor(sdk: SolanaSdk, wallet: Maybe<SolanaWallet>, apis: IApisSdk, config: ISolanaSdkConfig | undefined);
    sell(): Promise<PrepareSellInternalResponse>;
    sellUpdate(prepareRequest: PrepareOrderUpdateRequest): Promise<PrepareOrderUpdateResponse>;
    private getConvertableValue;
    bid(prepare: PrepareBidRequest): Promise<PrepareBidResponse>;
    bidUpdate(prepareRequest: PrepareOrderUpdateRequest): Promise<PrepareBidUpdateResponse>;
    cancel: ICancel;
}
