"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var retry_1 = require("../../common/retry");
var init_providers_1 = require("./test/init-providers");
describe.skip("create collection", function () {
    var web31 = (0, init_providers_1.initProviders)().web31;
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var ethereumWallet = new sdk_wallet_1.EthereumWallet(ethereum1);
    var sdk1 = (0, index_1.createRaribleSdk)(ethereumWallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    test("create erc-721 collection legacy", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, address, tx;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk1.nft.createCollection({
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        asset: {
                            assetType: "ERC721",
                            arguments: {
                                name: "name",
                                symbol: "RARI",
                                baseURI: "https://ipfs.rarible.com",
                                contractURI: "https://ipfs.rarible.com",
                                isUserToken: false,
                            },
                        },
                    })];
                case 1:
                    _a = _b.sent(), address = _a.address, tx = _a.tx;
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _b.sent();
                    console.log(address);
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.collection.getCollectionById({
                                        collection: address,
                                    })];
                            });
                        }); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create erc-721 collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, address, tx;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk1.nft.createCollection({
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        asset: {
                            assetType: "ERC721",
                            arguments: {
                                name: "name",
                                symbol: "RARI",
                                baseURI: "https://ipfs.rarible.com",
                                contractURI: "https://ipfs.rarible.com",
                                isUserToken: false,
                            },
                        },
                    })];
                case 1:
                    _a = _b.sent(), address = _a.address, tx = _a.tx;
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.collection.getCollectionById({
                                        collection: address,
                                    })];
                            });
                        }); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create erc-721 user collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, address, tx;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk1.nft.createCollection({
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        asset: {
                            assetType: "ERC721",
                            arguments: {
                                name: "name",
                                symbol: "RARI",
                                baseURI: "https://ipfs.rarible.com",
                                contractURI: "https://ipfs.rarible.com",
                                isUserToken: true,
                                operators: [],
                            },
                        },
                    })];
                case 1:
                    _a = _b.sent(), address = _a.address, tx = _a.tx;
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.collection.getCollectionById({
                                        collection: address,
                                    })];
                            });
                        }); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create erc-1155 collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, address, tx;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk1.nft.createCollection({
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        asset: {
                            assetType: "ERC1155",
                            arguments: {
                                name: "name",
                                symbol: "RARI",
                                baseURI: "https://ipfs.rarible.com",
                                contractURI: "https://ipfs.rarible.com",
                                isUserToken: false,
                            },
                        },
                    })];
                case 1:
                    _a = _b.sent(), address = _a.address, tx = _a.tx;
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.collection.getCollectionById({
                                        collection: address,
                                    })];
                            });
                        }); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create erc-1155 user collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var _a, address, tx;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk1.nft.createCollection({
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        asset: {
                            assetType: "ERC1155",
                            arguments: {
                                name: "name",
                                symbol: "RARI",
                                baseURI: "https://ipfs.rarible.com",
                                contractURI: "https://ipfs.rarible.com",
                                isUserToken: true,
                                operators: [],
                            },
                        },
                    })];
                case 1:
                    _a = _b.sent(), address = _a.address, tx = _a.tx;
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.collection.getCollectionById({
                                        collection: address,
                                    })];
                            });
                        }); })];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
