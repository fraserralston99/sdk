import type { Blockchain } from "@rarible/api-client";
import type { TezosMetadataResponse } from "../../../sdk-blockchains/tezos/common";
import type { ISolanaMetadataResponse } from "../../../sdk-blockchains/solana/domain";
import type { ISolanaTokenMetadata } from "../../../sdk-blockchains/solana/domain";
export declare type IPreprocessMeta = (meta: PreprocessMetaRequest) => PreprocessMetaResponse;
export declare type PreprocessMetaRequest = ({
    blockchain: Blockchain.ETHEREUM | Blockchain.POLYGON | Blockchain.TEZOS | Blockchain.FLOW;
} & CommonTokenMetadata) | ({
    blockchain: Blockchain.SOLANA;
} & ISolanaTokenMetadata);
export declare type PreprocessMetaResponse = CommonTokenMetadataResponse | TezosMetadataResponse | ISolanaMetadataResponse;
export declare type TokenMetadataAttribute = {
    key: string;
    value: string;
    type?: string;
};
export declare type CommonTokenMetadata = {
    name: string;
    description: string | undefined;
    image: CommonTokenContent | undefined;
    animation: CommonTokenContent | undefined;
    external: string | undefined;
    attributes: TokenMetadataAttribute[];
};
export declare type CommonTokenContent = {
    url: string;
    mimeType: string;
    hash?: string;
    fileSize?: number;
    fileName?: string;
    duration?: string;
    dataRate?: {
        value: number;
        unit: string;
    };
    dimensions?: {
        value: string;
        unit: string;
    };
};
export declare type CommonTokenMetadataResponse = {
    name: string;
    description: string | undefined;
    image: string | undefined;
    "animation_url": string | undefined;
    "external_url": string | undefined;
    attributes: TokenMetadataAttribute[];
};
