"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var await_for_collection_1 = require("./test/await-for-collection");
var test_wallet_1 = require("./test/test-wallet");
describe.skip("deploy tezos tests", function () {
    var env = "development";
    var wallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_1.LogsLevel.DISABLED });
    test("deploy public nft", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.createCollection({
                        blockchain: api_client_1.Blockchain.TEZOS,
                        asset: {
                            assetType: "NFT",
                            arguments: {
                                name: "My NFT collection",
                                symbol: "MYNFT",
                                contractURI: "https://ipfs.io/ipfs/QmTKxwnqqxTxH4HE3UVM9yoJFZgbsZ8CuqqRFZCSWBF53m",
                                isUserToken: false,
                            },
                        },
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    console.log("result", result);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("deploy private nft", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.createCollection({
                        blockchain: api_client_1.Blockchain.TEZOS,
                        asset: {
                            assetType: "NFT",
                            arguments: {
                                name: "My NFT collection",
                                symbol: "MYNFT",
                                contractURI: "https://ipfs.io/ipfs/QmTKxwnqqxTxH4HE3UVM9yoJFZgbsZ8CuqqRFZCSWBF53m",
                                isUserToken: true,
                            },
                        },
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_collection_1.awaitForCollection)(sdk, result.address)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("deploy public mt", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.createCollection({
                        blockchain: api_client_1.Blockchain.TEZOS,
                        asset: {
                            assetType: "MT",
                            arguments: {
                                name: "My NFT collection",
                                symbol: "MYNFT",
                                contractURI: "https://ipfs.io/ipfs/QmTKxwnqqxTxH4HE3UVM9yoJFZgbsZ8CuqqRFZCSWBF53m",
                                isUserToken: false,
                            },
                        },
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_collection_1.awaitForCollection)(sdk, result.address)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("deploy private mt", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.createCollection({
                        blockchain: api_client_1.Blockchain.TEZOS,
                        asset: {
                            assetType: "MT",
                            arguments: {
                                name: "My NFT collection",
                                symbol: "MYNFT",
                                contractURI: "https://ipfs.io/ipfs/QmTKxwnqqxTxH4HE3UVM9yoJFZgbsZ8CuqqRFZCSWBF53m",
                                isUserToken: true,
                            },
                        },
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_collection_1.awaitForCollection)(sdk, result.address)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
