import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { CreateCollectionResponse, CreateCollectionRequest } from "@rarible/sdk/src/types/nft/deploy/domain";
/**
 * Deploy new collection, await transaction, check address
 */
export declare function createCollection(sdk: IRaribleSdk, wallet: BlockchainWallet, deployRequest: CreateCollectionRequest): Promise<CreateCollectionResponse>;
