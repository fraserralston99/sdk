import type { FlowContractAddress, FlowCurrency, FlowItemId as FlowItemIdSdk } from "@rarible/flow-sdk";
import type { CollectionId, ItemId, OrderId } from "@rarible/api-client";
import type { ContractAddress, FlowAddress, UnionAddress } from "@rarible/types";
import type { FlowFee } from "@rarible/flow-sdk/build/types";
import type { UnionPart } from "../../../../types/order/common";
import type { ParsedFlowItemIdFromUnionItemId } from "../domain";
/**
 * Get flow collection from union collection
 * @param collection - e.g. "FLOW:A.0xabcdef0123456789.ContractName", contract address can be unprefixed
 */
export declare function getFlowCollection(collection: ContractAddress | CollectionId): FlowContractAddress;
/**
 * Parse union item id
 * @param unionItemId - e.g. "FLOW:A.0xabcdef0123456789.ContractName:123", contract address can be unprefixed
 * @returns blockchain, collectionId, itemId
 */
export declare function parseFlowItemIdFromUnionItemId(unionItemId: ItemId): ParsedFlowItemIdFromUnionItemId;
/**
 * Get maker account address
 * @param maker - "FLOW:0xabcdef0123456789", address can be unprefixed
 */
export declare function parseFlowAddressFromUnionAddress(maker: UnionAddress): FlowAddress;
/**
 *
 * @param id - "FLOW:{any count of digits}"
 */
export declare function parseOrderId(id: string): number;
/**
 * Get fungible token name
 * @param contract - e.g. "FLOW:A.0xabcdef0123456789.ContractName", contract address can be unprefixed
 */
export declare function getFungibleTokenName(contract: ContractAddress): FlowCurrency;
export declare function convertToFlowAddress(contractAddress: UnionAddress | ContractAddress): FlowAddress;
export declare function toFlowParts(parts: UnionPart[] | undefined): FlowFee[];
export declare function convertFlowOrderId(orderId: number): OrderId;
export declare function convertFlowItemId(itemId: FlowItemIdSdk): ItemId;
export declare function convertFlowContractAddress(contractAddress: string): ContractAddress;
export declare function convertFlowCollectionId(contractAddress: string): CollectionId;
export declare function convertFlowUnionAddress(address: string): UnionAddress;
