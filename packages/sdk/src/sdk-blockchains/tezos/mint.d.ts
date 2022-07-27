import type { TezosNetwork, TezosProvider } from "@rarible/tezos-sdk";
import type { CollectionId } from "@rarible/api-client";
import { CollectionType } from "@rarible/api-client";
import type { HasCollection, HasCollectionId, PrepareMintRequest } from "../../types/nft/mint/prepare-mint-request.type";
import type { PrepareMintResponse } from "../../types/nft/mint/domain";
import type { MintRequest } from "../../types/nft/mint/mint-request.type";
import type { PreprocessMetaRequest } from "../../types/nft/mint/preprocess-meta";
import type { IApisSdk } from "../../domain";
import type { MaybeProvider, TezosMetaContent, TezosMetadataResponse } from "./common";
export declare class TezosMint {
    private provider;
    private unionAPI;
    private network;
    constructor(provider: MaybeProvider<TezosProvider>, unionAPI: IApisSdk, network: TezosNetwork);
    getFormatsMeta(meta: PreprocessMetaRequest): TezosMetaContent[];
    preprocessMeta(meta: PreprocessMetaRequest): TezosMetadataResponse;
    getOwner(request: MintRequest): Promise<string>;
    mint(prepareRequest: PrepareMintRequest): Promise<PrepareMintResponse>;
}
export declare function getCollectionData(unionAPI: IApisSdk, prepareRequest: HasCollection | HasCollectionId): Promise<{
    contract: string;
    owner: import("@rarible/api-client").UnionAddress | undefined;
    type: CollectionType;
}>;
export declare function getContractFromRequest(request: HasCollection | HasCollectionId): CollectionId;
