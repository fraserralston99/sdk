import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { TransferRequest, PrepareTransferRequest } from "@rarible/sdk/build/types/nft/transfer/domain";
/**
 * Transfer NFT
 */
export declare function transfer(sdk: IRaribleSdk, prepareTransferRequest: PrepareTransferRequest, transferRequest: TransferRequest): Promise<void>;
