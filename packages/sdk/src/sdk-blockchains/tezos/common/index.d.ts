import type { AssetType, CollectionId, ItemId, Order, TezosFTAssetType, TezosMTAssetType, TezosNFTAssetType, TezosXTZAssetType, UnionAddress } from "@rarible/api-client";
import { Blockchain, CollectionType } from "@rarible/api-client";
import type { Asset as TezosLibAsset, AssetType as TezosAssetType, Config, Provider, TezosNetwork, TezosProvider } from "@rarible/tezos-sdk";
import { AssetTypeV2 } from "@rarible/tezos-sdk";
import type { Part } from "@rarible/tezos-common";
import BigNumber from "bignumber.js";
import type { Asset as TezosClientAsset, AssetType as TezosClientAssetType } from "tezos-api-client/build";
import { NftCollectionControllerApi, NftItemControllerApi, NftOwnershipControllerApi, OrderControllerApi } from "tezos-api-client/build";
import type { Maybe } from "@rarible/types/build/maybe";
import type { ContractAddress, OrderId } from "@rarible/types";
import type { BigNumber as RaribleBigNumber } from "@rarible/types/build/big-number";
import type { OrderForm } from "@rarible/tezos-sdk/dist/order";
import type { Payout } from "@rarible/api-client/build/models/Payout";
import type { UnionPart } from "../../../types/order/common";
import type { CurrencyType } from "../../../common/domain";
import type { RaribleSdkConfig } from "../../../config/domain";
export interface ITezosAPI {
    collection: NftCollectionControllerApi;
    item: NftItemControllerApi;
    ownership: NftOwnershipControllerApi;
    order: OrderControllerApi;
}
export declare type MaybeProvider<P extends TezosProvider> = {
    tezos: Maybe<P>;
    config: Config;
};
export declare type PreparedOrder = OrderForm & {
    makeStock: RaribleBigNumber;
};
export declare type TezosMetadataResponse = {
    name: string;
    description?: string;
    artifactUri?: string;
    decimals: number;
    displayUri?: string;
    externalUri?: string;
    formats?: Array<TezosMetaContent>;
    attributes: Array<TezosMetaAttribute>;
};
export declare type TezosMetaContent = {
    uri: string;
    hash?: string;
    mimeType?: string;
    fileSize?: number;
    fileName?: string;
    duration?: string;
    dimensions?: {
        value: string;
        unit: string;
    };
    dataRate?: {
        value: number;
        unit: string;
    };
};
export declare type TezosMetaAttribute = {
    name: string;
    value?: string;
    type?: string;
};
export declare const XTZ_DECIMALS = 6;
export declare function getTezosAPIs(network: TezosNetwork): ITezosAPI;
export declare function getTezosBasePath(network: TezosNetwork): string;
export declare function isExistedTezosProvider(provider: MaybeProvider<TezosProvider>): provider is Provider;
export declare function getMaybeTezosProvider(provider: Maybe<TezosProvider>, network: TezosNetwork, config: RaribleSdkConfig): MaybeProvider<TezosProvider>;
export declare function checkChainId(provider: MaybeProvider<TezosProvider>): Promise<void>;
export declare function getRequiredProvider(provider: MaybeProvider<TezosProvider>): Provider;
export declare function getTezosOrderId(orderId: OrderId): string;
export declare function getTezosItemData(itemId: ItemId): {
    itemId: string;
    contract: string;
    tokenId: string;
    domain: Blockchain;
};
export declare function getTezosAddress(address: UnionAddress): string;
export declare function getMakerPublicKey(provider: Provider): Promise<string>;
export declare function getPayouts(provider: Provider, requestPayouts?: UnionPart[]): Promise<Part[]>;
export declare function getSupportedCurrencies(): CurrencyType[];
export declare function convertOrderToFillOrder(order: Order): PreparedOrder;
export declare function convertOrderToOrderForm(order: Order): OrderForm;
export declare function getTezosAssetType(type: AssetType): TezosAssetType;
export declare function covertToLibAsset(a: TezosClientAsset): TezosLibAsset;
export declare function convertTezosToUnionAsset(assetType: TezosClientAssetType): AssetType;
export declare function getCollectionTypeAssetClass(type: CollectionType.TEZOS_NFT | CollectionType.TEZOS_MT): "MT" | "NFT";
export declare function convertUnionParts(parts?: Array<Payout>): Array<Part>;
export declare function convertFromContractAddress(contract: ContractAddress): string;
export declare function convertUnionAddress(address: UnionAddress): string;
export declare function convertTezosOrderId(hash: string): OrderId;
export declare function convertTezosItemId(itemId: string): ItemId;
export declare function convertTezosToContractAddress(address: string): ContractAddress;
export declare function convertTezosToCollectionAddress(address: string): CollectionId;
export declare function convertTezosToUnionAddress(address: string): UnionAddress;
export declare type CurrencyV2 = {
    type: AssetTypeV2;
    asset_contract: string | undefined;
    asset_token_id: BigNumber | undefined;
};
export declare function getTezosAssetTypeV2(config: Config, type: AssetType): Promise<CurrencyV2>;
export declare function getTokenIdString(tokenId: BigNumber | string | undefined): string | undefined;
export declare function isNftAssetType(assetType: AssetType): assetType is TezosNFTAssetType;
export declare function isMTAssetType(assetType: AssetType): assetType is TezosMTAssetType;
export declare function isXtzAssetType(assetType: AssetType): assetType is TezosXTZAssetType;
export declare function isFTAssetType(assetType: AssetType): assetType is TezosFTAssetType;
export declare function getCollectionType(provider: MaybeProvider<TezosProvider>, collection: string): Promise<CollectionType.TEZOS_NFT | CollectionType.TEZOS_MT>;
