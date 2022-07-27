import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type * as OrderCommon from "../../types/order/common";
import type { PrepareSellInternalResponse } from "../../types/order/sell/domain";
import type { IEthereumSdkConfig } from "./domain";
export declare class EthereumSell {
    private sdk;
    private network;
    private config?;
    private readonly blockchain;
    constructor(sdk: RaribleSdk, network: EthereumNetwork, config?: IEthereumSdkConfig | undefined);
    sell(): Promise<PrepareSellInternalResponse>;
    private sellDataV2;
    sellDataV3(): Promise<PrepareSellInternalResponse>;
    update(prepareRequest: OrderCommon.PrepareOrderUpdateRequest): Promise<OrderCommon.PrepareOrderUpdateResponse>;
}
