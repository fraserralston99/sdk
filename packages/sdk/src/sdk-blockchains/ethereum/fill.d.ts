import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { BigNumber } from "@rarible/types";
import type { FillOrderRequest } from "@rarible/protocol-ethereum-sdk/build/order/fill-order/types";
import type { SimpleOrder } from "@rarible/protocol-ethereum-sdk/build/order/types";
import type { EthereumWallet } from "@rarible/sdk-wallet";
import type { Maybe } from "@rarible/types/build/maybe";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { FillRequest, PrepareFillRequest, PrepareFillResponse } from "../../types/order/fill/domain";
import { MaxFeesBasePointSupport, OriginFeeSupport, PayoutsSupport } from "../../types/order/fill/domain";
import type { IEthereumSdkConfig } from "./domain";
export declare type SupportFlagsResponse = {
    originFeeSupport: OriginFeeSupport;
    payoutsSupport: PayoutsSupport;
    maxFeesBasePointSupport: MaxFeesBasePointSupport;
    supportsPartialFill: boolean;
};
export declare type SimplePreparedOrder = SimpleOrder & {
    makeStock: BigNumber;
};
export declare class EthereumFill {
    private sdk;
    private wallet;
    private network;
    private config?;
    constructor(sdk: RaribleSdk, wallet: Maybe<EthereumWallet>, network: EthereumNetwork, config?: IEthereumSdkConfig | undefined);
    getFillOrderRequest(order: SimpleOrder, fillRequest: FillRequest): FillOrderRequest;
    getSupportFlags(order: SimpleOrder): SupportFlagsResponse;
    getMaxAmount(order: SimplePreparedOrder): Promise<BigNumber | null>;
    isMultiple(order: SimplePreparedOrder): Promise<boolean>;
    getOrderHashFromRequest(request: PrepareFillRequest): string;
    hasCollectionAssetType(order: SimplePreparedOrder): boolean;
    private commonFill;
    /**
     * @deprecated
     * @param request
     */
    fill(request: PrepareFillRequest): Promise<PrepareFillResponse>;
    buy(request: PrepareFillRequest): Promise<PrepareFillResponse>;
    acceptBid(request: PrepareFillRequest): Promise<PrepareFillResponse>;
}
