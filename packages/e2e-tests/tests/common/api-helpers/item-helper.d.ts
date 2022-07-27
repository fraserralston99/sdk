import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { BigNumber, ContractAddress, ItemId, UnionAddress } from "@rarible/types";
import type { CheckItemRestrictionResponse, GetAllItemsResponse, GetItemByIdResponse, GetItemRoyaltiesByIdResponse, GetItemsByCollectionResponse, GetItemsByCreatorResponse, GetItemsByOwnerResponse } from "@rarible/api-client/build/apis/ItemControllerApi";
import type { Blockchain, Items, Royalties } from "@rarible/api-client";
import type { RestrictionCheckResult } from "@rarible/api-client/build/models";
export declare function awaitForItemSupply(sdk: IRaribleSdk, itemId: ItemId, supply: string | number | BigNumber): Promise<string>;
export declare function getItemByIdRaw(sdk: IRaribleSdk, itemId: ItemId): Promise<GetItemByIdResponse>;
export declare function getAllItems(sdk: IRaribleSdk, blockchains: Array<Blockchain>, size: number): Promise<Items>;
export declare function getAllItemsRaw(sdk: IRaribleSdk, blockchains: Array<Blockchain>, size: number): Promise<GetAllItemsResponse>;
export declare function getItemsByCollection(sdk: IRaribleSdk, collection: string, size: number): Promise<Items>;
export declare function getItemsByCollectionRaw(sdk: IRaribleSdk, collection: string, size: number): Promise<GetItemsByCollectionResponse>;
export declare function getItemsByCreator(sdk: IRaribleSdk, creator: string, size: number): Promise<Items>;
export declare function getItemsByCreatorRaw(sdk: IRaribleSdk, creator: string, size: number): Promise<GetItemsByCreatorResponse>;
export declare function getItemsByOwner(sdk: IRaribleSdk, owner: string, size: number): Promise<Items>;
export declare function getItemsByOwnerRaw(sdk: IRaribleSdk, owner: string, size: number): Promise<GetItemsByOwnerResponse>;
export declare function getItemRoyaltiesById(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber): Promise<Royalties>;
export declare function getItemRoyaltiesByIdRaw(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber): Promise<GetItemRoyaltiesByIdResponse>;
export declare function checkItemRestriction(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber, user: UnionAddress): Promise<RestrictionCheckResult>;
export declare function checkItemRestrictionRaw(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber, user: UnionAddress): Promise<CheckItemRestrictionResponse>;
export declare function verifyItemsByBlockchain(items: Items, blockchain: Blockchain): Promise<void>;
export declare function verifyItemsContainsItem(items: Items, itemId: ItemId): Promise<void>;
