import type { UnionAddress } from "@rarible/types";
export declare enum IPFSUploadProvider {
    PINATA = "pinata",
    IPFS_UPLOAD = "ipfs-upload",
    NFT_STORAGE = "nft-storage"
}
export declare type IPFSHash = string & {
    isIPFSHash: true;
};
export declare type IPFSServiceResponse = {
    ipfsHash: IPFSHash;
    size?: number;
};
export declare type IPFSUploadResponse = {
    ipfsHash: IPFSHash;
    pinSize?: number;
};
export declare type NftStorageResponse = {
    value: {
        cid: IPFSHash;
        size: number;
    };
};
export declare type MintProperties = {
    name: string;
    description?: string;
    image?: File;
    animationUrl?: File;
    attributes: MintAttribute[];
};
export declare type MintAttribute = {
    key: string;
    value: string;
};
export declare type MetaUploadRequest = {
    nftStorageApiKey: string;
    properties: MintProperties;
    royalty: string;
    accountAddress: UnionAddress;
};
export declare type UploadMetaResponse = {
    originalFile: File;
    URL: string;
    IPFSURL: IPFSHash;
};
export declare type UploadedFolder = {
    hash: IPFSHash;
    files: Record<string, UploadMetaResponse | undefined>;
};
