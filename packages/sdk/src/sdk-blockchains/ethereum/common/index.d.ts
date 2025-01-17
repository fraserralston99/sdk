import type { Address, UnionAddress, Word } from "@rarible/types";
import type { AssetType, CollectionId, Creator, ItemId, OrderId } from "@rarible/api-client";
import { Blockchain } from "@rarible/api-client";
import type { UnionPart } from "packages/sdk/src/types/order/common";
import type { ContractAddress } from "@rarible/types/build/contract-address";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { AssetType as EthereumAssetType, Part } from "@rarible/ethereum-api-client";
import type { Order } from "@rarible/ethereum-api-client/build/models";
import type { EthereumTransaction } from "@rarible/ethereum-provider";
import type { CurrencyType } from "../../../common/domain";
import type { RequestCurrencyAssetType } from "../../../common/domain";
import { OriginFeeSupport, PayoutsSupport } from "../../../types/order/fill/domain";
export declare type EVMBlockchain = Blockchain.ETHEREUM | Blockchain.POLYGON;
export declare const EVMBlockchains: EVMBlockchain[];
export declare type CreateEthereumCollectionResponse = {
    tx: EthereumTransaction;
    address: Address;
};
export declare function getEthTakeAssetType(currency: RequestCurrencyAssetType): {
    assetClass: "ERC20";
    contract: Address;
} | {
    assetClass: "ETH";
    contract?: undefined;
};
export declare function convertToEthereumAssetType(assetType: AssetType): EthereumAssetType;
export declare function toEthereumParts(parts: UnionPart[] | Creator[] | undefined): Part[];
export declare function getOriginFeesSum(originFees: Array<Part>): number;
export declare function getOrderFeesSum(order: Order): number;
export declare function getOriginFeeSupport(type: "RARIBLE_V1" | "RARIBLE_V2"): OriginFeeSupport;
export declare function getPayoutsSupport(type: "RARIBLE_V1" | "RARIBLE_V2"): PayoutsSupport;
export declare function getEVMBlockchain(network: EthereumNetwork): EVMBlockchain;
export declare function getSupportedCurrencies(blockchain?: EVMBlockchain, forBids?: boolean): CurrencyType[];
export declare function isEVMBlockchain(blockchain: string): blockchain is EVMBlockchain;
export declare function convertToEthereumAddress(contractAddress: UnionAddress | ContractAddress | CollectionId): Address;
export declare function convertEthereumOrderHash(hash: Word, blockchain: EVMBlockchain): OrderId;
export declare function convertOrderIdToEthereumHash(orderId: OrderId): string;
export declare function convertEthereumContractAddress(address: string, blockchain: EVMBlockchain): ContractAddress;
export declare function convertEthereumCollectionId(address: string, blockchain: EVMBlockchain): CollectionId;
export declare function convertEthereumToUnionAddress(address: string, blockchain: EVMBlockchain): UnionAddress;
export declare function convertEthereumItemId(itemId: string, blockchain: EVMBlockchain): ItemId;
export declare function getEthereumItemId(itemId: ItemId): {
    itemId: string;
    contract: string;
    tokenId: string;
    domain: EVMBlockchain;
};
export * from "./validators";
