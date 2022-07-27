import type { TezosProvider, TezosNetwork } from "@rarible/tezos-sdk";
import type { PrepareBurnRequest, PrepareBurnResponse } from "../../types/nft/burn/domain";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider } from "./common";
export declare class TezosBurn {
    private provider;
    private unionAPI;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk, network: TezosNetwork);
    private getRequiredProvider;
    burn(prepare: PrepareBurnRequest): Promise<PrepareBurnResponse>;
}
