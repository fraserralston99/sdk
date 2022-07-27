import { Blockchain } from "@rarible/api-client";
import type { IPreprocessMeta } from "../../../types/nft/mint/preprocess-meta";
import type { MetaUploadRequest, UploadedFolder, UploadMetaResponse } from "./domain";
export declare class MetaUploader {
    readonly blockchain: Blockchain;
    readonly preprocessMeta: IPreprocessMeta;
    constructor(blockchain: Blockchain, preprocessMeta: IPreprocessMeta);
    private getRoyalties;
    uploadMeta(request: MetaUploadRequest): Promise<UploadMetaResponse>;
    uploadFile(nftStorageApiKey: string, file: File): Promise<UploadMetaResponse>;
    uploadFolder(nftStorageApiKey: string, upload: Record<string, File | undefined>): Promise<UploadedFolder>;
}
