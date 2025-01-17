import type { IRaribleSdk } from "@rarible/sdk/src/domain";
import type { Ownership } from "@rarible/api-client/build/models";
import type { Blockchain, GetOwnershipByIdResponse } from "@rarible/api-client";
import type { BigNumber, ContractAddress, ItemId } from "@rarible/types";
import type { Ownerships } from "@rarible/api-client/build/models";
import type { GetOwnershipsByItemResponse } from "@rarible/api-client/build/apis/OwnershipControllerApi";
export declare function getOwnershipById(sdk: IRaribleSdk, blockchain: Blockchain, contractAddress: string, tokenId: string, targetAddress: string): Promise<Ownership>;
export declare function awaitForOwnershipValue(sdk: IRaribleSdk, itemId: ItemId, recipientAddress: string, value?: BigNumber): Promise<Ownership>;
export declare function getOwnershipByIdRaw(sdk: IRaribleSdk, itemId: ItemId, recipientAddress: string): Promise<GetOwnershipByIdResponse>;
export declare function getOwnershipsByItem(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber): Promise<Ownerships>;
export declare function getOwnershipsByItemRaw(sdk: IRaribleSdk, contract: ContractAddress, tokenId: BigNumber): Promise<GetOwnershipsByItemResponse>;
