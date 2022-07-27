"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionType = exports.isFTAssetType = exports.isXtzAssetType = exports.isMTAssetType = exports.isNftAssetType = exports.getTokenIdString = exports.getTezosAssetTypeV2 = exports.convertTezosToUnionAddress = exports.convertTezosToCollectionAddress = exports.convertTezosToContractAddress = exports.convertTezosItemId = exports.convertTezosOrderId = exports.convertUnionAddress = exports.convertFromContractAddress = exports.convertUnionParts = exports.getCollectionTypeAssetClass = exports.convertTezosToUnionAsset = exports.covertToLibAsset = exports.getTezosAssetType = exports.convertOrderToOrderForm = exports.convertOrderToFillOrder = exports.getSupportedCurrencies = exports.getPayouts = exports.getMakerPublicKey = exports.getTezosAddress = exports.getTezosItemData = exports.getTezosOrderId = exports.getRequiredProvider = exports.checkChainId = exports.getMaybeTezosProvider = exports.isExistedTezosProvider = exports.getTezosBasePath = exports.getTezosAPIs = exports.XTZ_DECIMALS = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
// eslint-disable-next-line camelcase
var tezos_common_1 = require("@rarible/tezos-common");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var build_1 = require("tezos-api-client/build");
var types_1 = require("@rarible/types");
var big_number_1 = require("@rarible/types/build/big-number");
var axios_1 = tslib_1.__importDefault(require("axios"));
exports.XTZ_DECIMALS = 6;
function getTezosAPIs(network) {
    var config = new build_1.Configuration({
        basePath: getTezosBasePath(network),
    });
    return {
        collection: new build_1.NftCollectionControllerApi(config),
        item: new build_1.NftItemControllerApi(config),
        ownership: new build_1.NftOwnershipControllerApi(config),
        order: new build_1.OrderControllerApi(config),
    };
}
exports.getTezosAPIs = getTezosAPIs;
function getTezosBasePath(network) {
    switch (network) {
        case "testnet": {
            return "https://test-tezos-api.rarible.org";
        }
        case "dev": {
            return "https://dev-tezos-api.rarible.org";
        }
        case "mainnet": {
            return "https://tezos-api.rarible.org";
        }
        default: {
            throw new Error("Unsupported tezos network");
        }
    }
}
exports.getTezosBasePath = getTezosBasePath;
function isExistedTezosProvider(provider) {
    return provider.tezos !== undefined;
}
exports.isExistedTezosProvider = isExistedTezosProvider;
function getMaybeTezosProvider(provider, network, config) {
    var unionApiBaseUrl = "".concat(config.basePath, "/v0.1");
    switch (network) {
        case "testnet": {
            return {
                tezos: provider,
                config: {
                    exchange: "KT1S6H2FWxrpaD7aPRSW1cTTE1xPucXBSTL5",
                    transfer_proxy: "KT1WbVjXdmBpzzVoYSSUiNt6QFnSC3W768d1",
                    fees: new bignumber_js_1.default(0),
                    nft_public: "",
                    mt_public: "",
                    api: "".concat(getTezosBasePath(network), "/v0.1"),
                    api_permit: "".concat(getTezosBasePath(network), "/v0.1"),
                    permit_whitelist: [],
                    wrapper: "",
                    auction: "KT1CB5JBSC7kTxRV3ir2xsooMA1FLieiD4Mt",
                    auction_storage: "KT1KWAPPjuDq4ZeX67rzZWsf6eAeqwtuAfSP",
                    node_url: "https://rpc.tzkt.io/ithacanet",
                    chain_id: "NetXnHfVqm9iesp",
                    sales: "KT1NcKyhPnomH9PKGeDfvMiGH2PDgKCd5YuM",
                    sales_storage: "KT1GDUG3AQpaKmFjFHVn6PYT4Tprf7ccwPa3",
                    transfer_manager: "KT1LQPAi4w2h9GQ61S8NkENcNe3aH5vYEzjP",
                    bid: "KT1UcBbv2D84mZ9tZx4MVLbCNyC5ihJERED2",
                    bid_storage: "KT1VXSBANyhqGiGgXjt5mT9XXQMbujdfJFw2",
                    sig_checker: "KT1RGGtyEtGCYCoRmTVNoE6qg3ay2DZ1BmDs",
                    tzkt: "https://api.ithacanet.tzkt.io",
                    dipdup: "https://test-tezos-indexer.rarible.org/v1/graphql",
                    union_api: unionApiBaseUrl,
                    objkt_sales_v2: "KT1T1JMFGipL6EdCmeL8tDfLiTi1BFZ1yAKV",
                    royalties_provider: "KT1AZfqFGFLMUrscNFyawDYAyqXYydz714ya",
                },
            };
        }
        case "dev": {
            return {
                tezos: provider,
                config: {
                    exchange: "KT18isH58SBp7UaRWB652UwLMPxCe1bsjMMe",
                    transfer_proxy: "KT1LmiHVNjfbZvPx9qvASVk8mzFcaJNtfj8q",
                    fees: new bignumber_js_1.default(0),
                    nft_public: "",
                    mt_public: "",
                    api: "".concat(getTezosBasePath(network), "/v0.1"),
                    api_permit: "".concat(getTezosBasePath(network), "/v0.1"),
                    permit_whitelist: [],
                    wrapper: "",
                    auction: "KT1UThqUUyAM9g8Nk6u74ke6XAFZNycAWU7c",
                    auction_storage: "KT1AJXNtHfFMB4kuJJexdevH2XeULivjThEX",
                    node_url: "https://dev-tezos-node.rarible.org",
                    chain_id: "NetXfHjxW3qBoxi",
                    sales: "KT198cr9bKZDGVtgj7P4DazAjq38r74hFSVu",
                    sales_storage: "KT19i8Dc5Bibei6YrtdzUt27B9UBkQo6oLsG",
                    transfer_manager: "KT1Xj6gsE694LkMg25SShYkU7dGzagm7BTSK",
                    bid: "KT1H9fa1QF4vyAt3vQcj65PiJJNG7vNVrkoW",
                    bid_storage: "KT19c5jc4Y8so1FWbrRA8CucjUeNXZsP8yHr",
                    sig_checker: "KT1ShTc4haTgT76z5nTLSQt3GSTLzeLPZYfT",
                    tzkt: "https://dev-tezos-tzkt.rarible.org",
                    dipdup: "https://dev-tezos-indexer.rarible.org/v1/graphql",
                    union_api: unionApiBaseUrl,
                    objkt_sales_v2: "KT1X1sxF2kqNKMKcNatbrx3d5M11LhSthQ3L",
                    royalties_provider: "KT1Q6gnT9KB3Y5ause5sZq3pFmBJnAeE5nvi",
                },
            };
        }
        case "mainnet": {
            return {
                tezos: provider,
                config: {
                    exchange: "KT198mqFKkiWerXLmMCw69YB1i6yzYtmGVrC",
                    transfer_proxy: "KT1N2oby9tYmv5tjkGD1KyVzkDRCmgDkXgSD",
                    fees: new bignumber_js_1.default(0),
                    nft_public: "",
                    mt_public: "",
                    api: "".concat(getTezosBasePath(network), "/v0.1"),
                    api_permit: "".concat(getTezosBasePath(network), "/v0.1"),
                    permit_whitelist: [],
                    wrapper: "KT1EJkjatSNWD2NiPx8hivKnawxuyaVTwP6n",
                    auction: "",
                    auction_storage: "",
                    node_url: "https://rpc.tzkt.io/mainnet",
                    chain_id: "NetXdQprcVkpaWU",
                    sales: "KT1N4Rrm6BU6229drs6scrH3vard1pPngMyA",
                    sales_storage: "KT1BEZNm3E25rZtXfPPKr5Jxygbi2kL2cCEW",
                    transfer_manager: "KT1ViAbsAM5rp89yVydEkbQozp1S12zqirwS",
                    bid: "",
                    bid_storage: "",
                    sig_checker: "KT1VAmfDTkcYKMZZQhwuxtCGoD1hx7v5bjZ9",
                    tzkt: "https://api.mainnet.tzkt.io",
                    dipdup: "https://tezos-indexer.rarible.org/v1/graphql",
                    union_api: unionApiBaseUrl,
                    objkt_sales_v2: "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC",
                    royalties_provider: "KT1HNNrmCk1fpqveRDz8Fvww2GM4gPzmA7fo",
                },
            };
        }
        default: {
            throw new Error("Unsupported tezos network for config");
        }
    }
}
exports.getMaybeTezosProvider = getMaybeTezosProvider;
var checkChainIdCache = new Map();
function checkChainId(provider) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var walletChainId;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    walletChainId = checkChainIdCache.get(provider.tezos);
                    if (!!walletChainId) return [3 /*break*/, 2];
                    return [4 /*yield*/, ((_a = provider.tezos) === null || _a === void 0 ? void 0 : _a.chain_id())];
                case 1:
                    walletChainId = _b.sent();
                    checkChainIdCache.set(provider.tezos, walletChainId);
                    _b.label = 2;
                case 2:
                    if (walletChainId !== provider.config.chain_id) {
                        throw new Error("Config chainId=".concat(provider.config.chain_id, ", but wallet chainId=").concat(walletChainId));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkChainId = checkChainId;
function getRequiredProvider(provider) {
    if (!isExistedTezosProvider(provider)) {
        throw new Error("Tezos provider is required");
    }
    return provider;
}
exports.getRequiredProvider = getRequiredProvider;
function getTezosOrderId(orderId) {
    if (!orderId) {
        throw new Error("OrderId has not been specified");
    }
    var _a = tslib_1.__read(orderId.split(":"), 2), blockchain = _a[0], id = _a[1];
    if (blockchain !== api_client_1.Blockchain.TEZOS) {
        throw new Error("Not an TEZOS order");
    }
    return id;
}
exports.getTezosOrderId = getTezosOrderId;
function getTezosItemData(itemId) {
    var _a = tslib_1.__read(itemId.split(":"), 3), domain = _a[0], contract = _a[1], tokenId = _a[2];
    if (domain !== api_client_1.Blockchain.TEZOS) {
        throw new Error("Not an tezos item: ".concat(itemId));
    }
    return {
        itemId: "".concat(contract, ":").concat(tokenId),
        contract: contract,
        tokenId: tokenId,
        domain: domain,
    };
}
exports.getTezosItemData = getTezosItemData;
function getTezosAddress(address) {
    var _a = tslib_1.__read(address.split(":"), 2), blockchain = _a[0], tezosAddress = _a[1];
    if (blockchain !== api_client_1.Blockchain.TEZOS) {
        throw new Error("Not an tezos item: ".concat(address));
    }
    return tezosAddress;
}
exports.getTezosAddress = getTezosAddress;
function getMakerPublicKey(provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var maker;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, tezos_sdk_1.get_public_key)(provider)];
                case 1:
                    maker = _a.sent();
                    if (!maker) {
                        throw new Error("Maker does not exist");
                    }
                    return [2 /*return*/, maker];
            }
        });
    });
}
exports.getMakerPublicKey = getMakerPublicKey;
function getPayouts(provider, requestPayouts) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var payouts, _a;
        var _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    payouts = requestPayouts || [];
                    if (!(!Array.isArray(payouts) || payouts.length === 0)) return [3 /*break*/, 2];
                    _b = {};
                    _a = tezos_sdk_1.pk_to_pkh;
                    return [4 /*yield*/, getMakerPublicKey(provider)];
                case 1: return [2 /*return*/, [(_b.account = _a.apply(void 0, [_c.sent()]),
                            _b.value = new bignumber_js_1.default(10000),
                            _b)]];
                case 2: return [2 /*return*/, convertUnionParts(payouts)];
            }
        });
    });
}
exports.getPayouts = getPayouts;
function getSupportedCurrencies() {
    return [
        { blockchain: api_client_1.Blockchain.TEZOS, type: "NATIVE" },
        { blockchain: api_client_1.Blockchain.TEZOS, type: "TEZOS_FT" },
    ];
}
exports.getSupportedCurrencies = getSupportedCurrencies;
function convertOrderToFillOrder(order) {
    return tslib_1.__assign(tslib_1.__assign({}, convertOrderToOrderForm(order)), { makeStock: (0, big_number_1.toBigNumber)(order.makeStock) });
}
exports.convertOrderToFillOrder = convertOrderToFillOrder;
function convertOrderToOrderForm(order) {
    if (order.data["@type"] !== "TEZOS_RARIBLE_V2") {
        throw new Error("Unsupported order data type");
    }
    return {
        type: "RARIBLE_V2",
        maker: order.maker,
        maker_edpk: order.data.makerEdpk,
        taker: order.taker,
        taker_edpk: order.data.takerEdpk,
        make: {
            asset_type: getTezosAssetType(order.make.type),
            value: new bignumber_js_1.default(order.make.value),
        },
        take: {
            asset_type: getTezosAssetType(order.take.type),
            value: new bignumber_js_1.default(order.take.value),
        },
        salt: order.salt,
        start: order.startedAt ? parseInt(order.startedAt) : undefined,
        end: order.endedAt ? parseInt(order.endedAt) : undefined,
        signature: order.signature,
        data: {
            data_type: "V1",
            payouts: convertUnionParts(order.data.payouts),
            origin_fees: convertUnionParts(order.data.originFees),
        },
    };
}
exports.convertOrderToOrderForm = convertOrderToOrderForm;
function getTezosAssetType(type) {
    switch (type["@type"]) {
        case "XTZ": {
            return {
                asset_class: "XTZ",
            };
        }
        case "TEZOS_FT": {
            return {
                asset_class: "FT",
                contract: convertFromContractAddress(type.contract),
                token_id: type.tokenId ? new bignumber_js_1.default(type.tokenId) : undefined,
            };
        }
        case "TEZOS_NFT": {
            return {
                asset_class: "NFT",
                contract: convertFromContractAddress(type.contract),
                token_id: new bignumber_js_1.default(type.tokenId),
            };
        }
        case "TEZOS_MT": {
            return {
                asset_class: "MT",
                contract: convertFromContractAddress(type.contract),
                token_id: new bignumber_js_1.default(type.tokenId),
            };
        }
        default: {
            throw new Error("Invalid take asset type");
        }
    }
}
exports.getTezosAssetType = getTezosAssetType;
function covertToLibAsset(a) {
    switch (a.assetType.assetClass) {
        case "XTZ": {
            return {
                asset_type: { asset_class: a.assetType.assetClass },
                value: new bignumber_js_1.default(a.value),
            };
        }
        case "FT": {
            return {
                asset_type: {
                    asset_class: a.assetType.assetClass,
                    contract: a.assetType.contract,
                    token_id: (a.assetType.tokenId === undefined) ? undefined : new bignumber_js_1.default(a.assetType.tokenId),
                },
                value: new bignumber_js_1.default(a.value),
            };
        }
        case "NFT":
        case "MT":
            return {
                asset_type: {
                    asset_class: a.assetType.assetClass,
                    contract: a.assetType.contract,
                    token_id: new bignumber_js_1.default(a.assetType.tokenId),
                },
                value: new bignumber_js_1.default(a.value),
            };
        default: throw new Error("Unknown Asset Class");
    }
}
exports.covertToLibAsset = covertToLibAsset;
function convertTezosToUnionAsset(assetType) {
    switch (assetType.assetClass) {
        case "XTZ": {
            return { "@type": "XTZ" };
        }
        case "FT": {
            return {
                "@type": "TEZOS_FT",
                contract: convertTezosToContractAddress(assetType.contract),
                tokenId: assetType.tokenId ? (0, big_number_1.toBigNumber)(assetType.tokenId) : undefined,
            };
        }
        case "NFT": {
            return {
                "@type": "TEZOS_NFT",
                contract: convertTezosToContractAddress(assetType.contract),
                tokenId: (0, big_number_1.toBigNumber)(assetType.tokenId),
            };
        }
        case "MT": {
            return {
                "@type": "TEZOS_MT",
                contract: convertTezosToContractAddress(assetType.contract),
                tokenId: (0, big_number_1.toBigNumber)(assetType.tokenId),
            };
        }
        default: {
            throw new Error("Invalid asset type");
        }
    }
}
exports.convertTezosToUnionAsset = convertTezosToUnionAsset;
function getCollectionTypeAssetClass(type) {
    switch (type) {
        case api_client_1.CollectionType.TEZOS_MT: return "MT";
        case api_client_1.CollectionType.TEZOS_NFT: return "NFT";
        default: throw new Error("Unrecognized NFT collection type");
    }
}
exports.getCollectionTypeAssetClass = getCollectionTypeAssetClass;
function convertUnionParts(parts) {
    return (parts === null || parts === void 0 ? void 0 : parts.map(function (p) { return ({
        account: getTezosAddress(p.account),
        value: new bignumber_js_1.default(p.value),
    }); })) || [];
}
exports.convertUnionParts = convertUnionParts;
function convertFromContractAddress(contract) {
    var _a = tslib_1.__read(contract.split(":"), 2), blockchain = _a[0], tezosAddress = _a[1];
    if (blockchain !== api_client_1.Blockchain.TEZOS) {
        throw new Error("Not a tezos contract address: ".concat(contract));
    }
    return tezosAddress;
}
exports.convertFromContractAddress = convertFromContractAddress;
function convertUnionAddress(address) {
    var _a = tslib_1.__read(address.split(":"), 2), blockchain = _a[0], tezosAddress = _a[1];
    if (blockchain !== api_client_1.Blockchain.TEZOS) {
        throw new Error("Not a tezos address: ".concat(address));
    }
    return tezosAddress;
}
exports.convertUnionAddress = convertUnionAddress;
function convertTezosOrderId(hash) {
    return (0, types_1.toOrderId)("".concat(api_client_1.Blockchain.TEZOS, ":").concat(hash));
}
exports.convertTezosOrderId = convertTezosOrderId;
function convertTezosItemId(itemId) {
    return (0, types_1.toItemId)("".concat(api_client_1.Blockchain.TEZOS, ":").concat(itemId));
}
exports.convertTezosItemId = convertTezosItemId;
function convertTezosToContractAddress(address) {
    return (0, types_1.toContractAddress)("".concat(api_client_1.Blockchain.TEZOS, ":").concat(address));
}
exports.convertTezosToContractAddress = convertTezosToContractAddress;
function convertTezosToCollectionAddress(address) {
    return (0, types_1.toCollectionId)("".concat(api_client_1.Blockchain.TEZOS, ":").concat(address));
}
exports.convertTezosToCollectionAddress = convertTezosToCollectionAddress;
function convertTezosToUnionAddress(address) {
    return (0, types_1.toUnionAddress)("".concat(api_client_1.Blockchain.TEZOS, ":").concat(address));
}
exports.convertTezosToUnionAddress = convertTezosToUnionAddress;
function getTezosAssetTypeV2(config, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, contract, ftType, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = type["@type"];
                    switch (_a) {
                        case "XTZ": return [3 /*break*/, 1];
                        case "TEZOS_FT": return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    {
                        return [2 /*return*/, {
                                type: tezos_sdk_1.AssetTypeV2.XTZ,
                                asset_contract: undefined,
                                asset_token_id: undefined,
                            }];
                    }
                    _b.label = 2;
                case 2:
                    contract = convertFromContractAddress(type.contract);
                    ftType = tezos_sdk_1.AssetTypeV2.FA2;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, tezos_common_1.get_ft_type)(config, contract)];
                case 4:
                    ftType = _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _b.sent();
                    console.log("error get_ft_type", e_1, contract);
                    return [3 /*break*/, 6];
                case 6:
                    if (ftType === tezos_sdk_1.AssetTypeV2.FA2) {
                        return [2 /*return*/, {
                                type: tezos_sdk_1.AssetTypeV2.FA2,
                                asset_contract: contract,
                                asset_token_id: new bignumber_js_1.default(type.tokenId || 0),
                            }];
                    }
                    else if (ftType === tezos_sdk_1.AssetTypeV2.FA12) {
                        return [2 /*return*/, {
                                type: tezos_sdk_1.AssetTypeV2.FA12,
                                asset_contract: contract,
                                asset_token_id: undefined,
                            }];
                    }
                    else {
                        throw new Error("Unrecognized FT contract type, check contract and network");
                    }
                    _b.label = 7;
                case 7:
                    {
                        throw new Error("Invalid asset type");
                    }
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getTezosAssetTypeV2 = getTezosAssetTypeV2;
function getTokenIdString(tokenId) {
    return tokenId !== undefined ? tokenId.toString() : undefined;
}
exports.getTokenIdString = getTokenIdString;
function isNftAssetType(assetType) {
    return assetType["@type"] === "TEZOS_NFT";
}
exports.isNftAssetType = isNftAssetType;
function isMTAssetType(assetType) {
    return assetType["@type"] === "TEZOS_MT";
}
exports.isMTAssetType = isMTAssetType;
function isXtzAssetType(assetType) {
    return assetType["@type"] === "XTZ";
}
exports.isXtzAssetType = isXtzAssetType;
function isFTAssetType(assetType) {
    return assetType["@type"] === "TEZOS_FT";
}
exports.isFTAssetType = isFTAssetType;
function getCollectionType(provider, collection) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var response, data, e_2, schema;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(provider.config.tzkt, "/v1/contracts/").concat(collection, "/storage/schema"))];
                case 1:
                    data = (_a.sent()).data;
                    response = data;
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    throw new Error("Getting tezos collection data error");
                case 3:
                    schema = response["schema:object"];
                    if ("ledger:big_map:object:nat" in schema) {
                        return [2 /*return*/, api_client_1.CollectionType.TEZOS_MT];
                    }
                    else if ("ledger:big_map_flat:nat:address" in schema) {
                        return [2 /*return*/, api_client_1.CollectionType.TEZOS_NFT];
                    }
                    else {
                        throw new Error("Unrecognized tezos collection");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCollectionType = getCollectionType;
