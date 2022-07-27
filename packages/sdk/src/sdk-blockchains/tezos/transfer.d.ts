import type { TezosProvider, TezosNetwork } from "@rarible/tezos-sdk";
import type { PrepareTransferRequest } from "../../types/nft/transfer/domain";
import type { PrepareTransferResponse } from "../../types/nft/transfer/domain";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider } from "./common";
export declare class TezosTransfer {
    private provider;
    private unionAPI;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk, network: TezosNetwork);
    private getRequiredProvider;
    transfer(prepare: PrepareTransferRequest): Promise<PrepareTransferResponse>;
}
