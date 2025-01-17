import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { NftTokenId } from "@rarible/ethereum-api-client";
import type { Collection, CollectionControllerApi } from "@rarible/api-client";
import type { CommonNftCollection } from "@rarible/protocol-ethereum-sdk/build/common/mint";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { PrepareMintResponse } from "../../types/nft/mint/domain";
import type { MintRequest } from "../../types/nft/mint/mint-request.type";
import type { HasCollection, HasCollectionId, PrepareMintRequest } from "../../types/nft/mint/prepare-mint-request.type";
import type { IApisSdk } from "../../domain";
import type { CommonTokenMetadataResponse, PreprocessMetaRequest } from "../../types/nft/mint/preprocess-meta";
export declare class EthereumMint {
    private readonly sdk;
    private readonly apis;
    private network;
    private readonly blockchain;
    constructor(sdk: RaribleSdk, apis: IApisSdk, network: EthereumNetwork);
    handleSubmit(request: MintRequest, nftCollection: CommonNftCollection, nftTokenId?: NftTokenId): Promise<import("@rarible/protocol-ethereum-sdk/build/nft/mint").MintOnChainResponse | import("@rarible/protocol-ethereum-sdk/build/nft/mint").MintOffChainResponse>;
    private toPart;
    isSupportsRoyalties(collection: CommonNftCollection): boolean;
    isSupportsLazyMint(collection: CommonNftCollection): boolean;
    prepare(request: PrepareMintRequest): Promise<PrepareMintResponse>;
    preprocessMeta(meta: PreprocessMetaRequest): CommonTokenMetadataResponse;
}
export declare function getCollection(api: CollectionControllerApi, req: HasCollection | HasCollectionId): Promise<Collection>;
