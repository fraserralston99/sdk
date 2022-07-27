import type { BlockchainWallet } from "@rarible/sdk-wallet";
import type { CreateCollectionRequest } from "@rarible/sdk/src/types/nft/deploy/domain";
export declare function createCollection(wallet: BlockchainWallet, collectionRequest: CreateCollectionRequest): Promise<import("@rarible/types").ContractAddress>;
