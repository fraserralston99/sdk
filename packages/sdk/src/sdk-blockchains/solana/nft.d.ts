/// <reference types="@solana/web3.js" />
import type { SolanaSdk } from "@rarible/solana-sdk";
import type { Maybe } from "@rarible/types/build/maybe";
import type { SolanaWallet } from "@rarible/sdk-wallet";
import type { PrepareMintResponse } from "../../types/nft/mint/domain";
import type { PrepareMintRequest } from "../../types/nft/mint/prepare-mint-request.type";
import type { PrepareBurnRequest, PrepareBurnResponse } from "../../types/nft/burn/domain";
import type { IApisSdk } from "../../domain";
import type { PrepareTransferRequest, PrepareTransferResponse } from "../../types/nft/transfer/domain";
import type { PreprocessMetaRequest } from "../../types/nft/mint/preprocess-meta";
import type { ISolanaSdkConfig } from "./domain";
import type { ISolanaMetadataResponse } from "./domain";
export declare class SolanaNft {
    readonly sdk: SolanaSdk;
    readonly wallet: Maybe<SolanaWallet>;
    private readonly apis;
    private readonly config;
    constructor(sdk: SolanaSdk, wallet: Maybe<SolanaWallet>, apis: IApisSdk, config: ISolanaSdkConfig | undefined);
    getCollectionId(prepareRequest: PrepareMintRequest): import("@solana/web3.js").PublicKey;
    mint(prepareRequest: PrepareMintRequest): Promise<PrepareMintResponse>;
    burn(prepare: PrepareBurnRequest): Promise<PrepareBurnResponse>;
    transfer(prepare: PrepareTransferRequest): Promise<PrepareTransferResponse>;
    preprocessMeta(meta: PreprocessMetaRequest): ISolanaMetadataResponse;
}
