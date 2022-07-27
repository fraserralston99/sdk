import type { TezosNetwork, TezosProvider } from "@rarible/tezos-sdk";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { Order } from "@rarible/api-client";
import type { ICancel } from "../../types/order/cancel/domain";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider } from "./common";
export declare class TezosCancel {
    private provider;
    private unionAPI;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk, network: TezosNetwork);
    cancel: ICancel;
    cancelV2SellOrder(order: Order): Promise<IBlockchainTransaction>;
}
