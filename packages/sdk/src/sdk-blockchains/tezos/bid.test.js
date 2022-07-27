"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var index_1 = require("../../index");
var domain_1 = require("../../types/nft/mint/domain");
var retry_1 = require("../../common/retry");
var domain_2 = require("../../domain");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var test_wallet_1 = require("./test/test-wallet");
var await_for_order_1 = require("./test/await-for-order");
var await_for_order_status_1 = require("./test/await-for-order-status");
var common_1 = require("./common");
var await_for_ownership_1 = require("./test/await-for-ownership");
var reset_wxtz_funds_1 = require("./test/reset-wxtz-funds");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("bid test", function () {
    var env = "staging";
    var itemOwner = (0, test_wallet_1.createTestWallet)("edskS143x9JtTcFUxE5UDT9Tajkx9hdLha9mQhijSarwsKM6fzBEAuMEttFEjBYL7pT4o5P5yRqFGhUmqEynwviMk5KJ8iMgTw", env);
    var itemOwnerSdk = (0, index_1.createRaribleSdk)(itemOwner, env, { logs: domain_2.LogsLevel.DISABLED });
    var bidderWallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var bidderSdk = (0, index_1.createRaribleSdk)(bidderWallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var nullFundsWallet = (0, test_wallet_1.createTestWallet)("edskS2YAR6wms6ZWckr7wJYW1cFaEgy9mk1FbnjABsDMyh" +
        "7CUpvCS8Hfy12BcjvsQc1eprKKBMqAEc6FBgCnLLu33KvzYgsd9c", env);
    var nullFundsWalletSdk = (0, index_1.createRaribleSdk)(nullFundsWallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var eurTzContract = (0, test_contracts_1.getTestContract)(env, "eurTzContract");
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    var wXTZContract = (0, common_1.convertTezosToContractAddress)("KT1LkKaeLBvTBo6knGeN5RsEunERCaqVcLr9");
    test("bid NFT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, orderId, updateAction, acceptBidResponse, fillBidResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, common_1.convertTezosToCollectionAddress)(nftContract),
                    })];
                case 1:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "1")
                    // make bid by bidder
                ];
                case 5:
                    _a.sent();
                    // make bid by bidder
                    console.log("before bid");
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 6:
                    bidResponse = _a.sent();
                    return [4 /*yield*/, bidResponse.submit({
                            amount: 1,
                            price: "0.000002",
                            currency: {
                                "@type": "TEZOS_FT",
                                contract: eurTzContract,
                                tokenId: (0, types_1.toBigNumber)("0"),
                            },
                        })];
                case 7:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(bidderSdk, orderId)
                        // update bid price
                    ];
                case 8:
                    _a.sent();
                    // update bid price
                    console.log("before bid update");
                    return [4 /*yield*/, bidderSdk.order.bidUpdate({ orderId: orderId })];
                case 9:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.000004" })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bidderSdk.apis.order.getOrderById({
                                            id: orderId,
                                        })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.make.value !== "0.000004") {
                                            throw new Error("Bid price has been not updated");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 11:
                    _a.sent();
                    console.log("before accept bid");
                    return [4 /*yield*/, itemOwnerSdk.order.acceptBid({ orderId: orderId })];
                case 12:
                    acceptBidResponse = _a.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 13:
                    fillBidResult = _a.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 14:
                    _a.sent();
                    console.log("before check order status");
                    return [4 /*yield*/, (0, await_for_order_status_1.awaitForOrderStatus)(bidderSdk, orderId, "FILLED")];
                case 15:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test.skip("bid MT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, orderId, _a, _b, _c, updateAction, acceptBidResponse, fillBidResult;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "10")
                    // make bid by bidder
                ];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 6:
                    bidResponse = _f.sent();
                    _b = (_a = bidResponse).submit;
                    _d = {
                        amount: 3,
                        price: "0.00002",
                        currency: {
                            "@type": "TEZOS_FT",
                            contract: eurTzContract,
                            tokenId: (0, types_1.toBigNumber)("0"),
                        }
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, itemOwner.provider.address()];
                case 7: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 8:
                    orderId = _f.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(bidderSdk, orderId)
                        // update bid price
                    ];
                case 9:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bidUpdate({ orderId: orderId })];
                case 10:
                    updateAction = _f.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.00004" })];
                case 11:
                    _f.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bidderSdk.apis.order.getOrderById({
                                            id: orderId,
                                        })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.make.value !== "0.00012") {
                                            throw new Error("Bid price has been not updated");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // accept bid by item owner
                    ];
                case 12:
                    _f.sent();
                    return [4 /*yield*/, itemOwnerSdk.order.acceptBid({ orderId: orderId })];
                case 13:
                    acceptBidResponse = _f.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 3,
                            infiniteApproval: true,
                        })];
                case 14:
                    fillBidResult = _f.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 15:
                    _f.sent();
                    return [4 /*yield*/, (0, await_for_order_status_1.awaitForOrderStatus)(bidderSdk, orderId, "FILLED")];
                case 16:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test.skip("bid MT test with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, orderId, _a, _b, _c, order, takeAssetType, acceptBidResponse, fillBidResult;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "10")
                    // make bid by bidder
                ];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 6:
                    bidResponse = _f.sent();
                    _b = (_a = bidResponse).submit;
                    _d = {
                        amount: 3,
                        price: "0.00002",
                        currency: (0, types_1.toCurrencyId)("".concat(eurTzContract, ":0"))
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, itemOwner.provider.address()];
                case 7: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 8:
                    orderId = _f.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(bidderSdk, orderId)];
                case 9:
                    order = _f.sent();
                    takeAssetType = order.make.type;
                    expect(takeAssetType["@type"]).toEqual("TEZOS_FT");
                    expect(takeAssetType.contract).toEqual("TEZOS:KT1Rgf9RNW7gLj7JGn98yyVM34S4St9eudMC");
                    expect(takeAssetType.tokenId).toEqual("0");
                    return [4 /*yield*/, itemOwnerSdk.order.acceptBid({ orderId: orderId })];
                case 10:
                    acceptBidResponse = _f.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 3,
                            infiniteApproval: true,
                        })];
                case 11:
                    fillBidResult = _f.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 12:
                    _f.sent();
                    return [4 /*yield*/, (0, await_for_order_status_1.awaitForOrderStatus)(bidderSdk, orderId, "FILLED")];
                case 13:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test.skip("getConvertValue returns insufficient type", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, value, _a, _b, _c;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, common_1.convertTezosToCollectionAddress)(nftContract),
                    })];
                case 1:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "1")];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, nullFundsWalletSdk.order.bid({ itemId: mintResult.itemId })];
                case 6:
                    bidResponse = _f.sent();
                    _b = (_a = bidResponse).getConvertableValue;
                    _d = {
                        assetType: { "@type": "TEZOS_FT", contract: wXTZContract },
                        price: "0.00001",
                        amount: 1
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, nullFundsWallet.provider.address()];
                case 7: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 8:
                    value = _f.sent();
                    if (!value)
                        throw new Error("Convertable value must be non-undefined");
                    expect(value.type).toBe("insufficient");
                    expect(new bignumber_js_1.default(value.value).isEqualTo("0.000011")).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("getConvertValue returns convertable value", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, value, _a, _b, _c;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, common_1.convertTezosToCollectionAddress)(nftContract),
                    })];
                case 1:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "1")];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, (0, reset_wxtz_funds_1.resetWXTZFunds)(bidderWallet, bidderSdk, wXTZContract)];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 7:
                    bidResponse = _f.sent();
                    _b = (_a = bidResponse).getConvertableValue;
                    _d = {
                        assetType: { "@type": "TEZOS_FT", contract: wXTZContract },
                        price: "0.00001",
                        amount: 4
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, nullFundsWallet.provider.address()];
                case 8: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 9:
                    value = _f.sent();
                    if (!value)
                        throw new Error("Convertable value must be non-undefined");
                    expect(value.type).toBe("convertable");
                    expect(new bignumber_js_1.default(value.value).isEqualTo("0.000044")).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("getConvertValue returns undefined when passed non-wXTZ contract", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, bidResponse, value, _a, _b, _c;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, itemOwnerSdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 5,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "5")];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, (0, reset_wxtz_funds_1.resetWXTZFunds)(bidderWallet, bidderSdk, wXTZContract)];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 7:
                    bidResponse = _f.sent();
                    _b = (_a = bidResponse).getConvertableValue;
                    _d = {
                        assetType: { "@type": "TEZOS_FT", contract: eurTzContract },
                        price: "0.00001",
                        amount: 5
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, nullFundsWallet.provider.address()];
                case 8: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 9:
                    value = _f.sent();
                    expect(value).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("convert currency on bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var bidderAddress, mintResponse, mintResult, bidResponse, wXTZAsset, bidOrderId, _a, _b, _c, updateAction, acceptBidResponse, acceptBidTx;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, bidderWallet.provider.address()];
                case 1:
                    bidderAddress = _f.sent();
                    return [4 /*yield*/, itemOwnerSdk.nft.mint({
                            collectionId: (0, types_1.toCollectionId)(mtContract),
                        })];
                case 2:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 4,
                            lazyMint: false,
                        })];
                case 3:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "4")];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, (0, reset_wxtz_funds_1.resetWXTZFunds)(bidderWallet, bidderSdk, wXTZContract)];
                case 7:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 8:
                    bidResponse = _f.sent();
                    wXTZAsset = { "@type": "TEZOS_FT", contract: wXTZContract, tokenId: (0, types_1.toBigNumber)("0") };
                    _b = (_a = bidResponse).submit;
                    _d = {
                        amount: 4,
                        price: "0.00002",
                        currency: wXTZAsset
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, nullFundsWallet.provider.address()];
                case 9: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 10:
                    bidOrderId = _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bidUpdate({ orderId: bidOrderId })];
                case 11:
                    updateAction = _f.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.00004" })];
                case 12:
                    _f.sent();
                    return [4 /*yield*/, itemOwnerSdk.order.acceptBid({ orderId: bidOrderId })];
                case 13:
                    acceptBidResponse = _f.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 4,
                            infiniteApproval: true,
                        })];
                case 14:
                    acceptBidTx = _f.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 15:
                    _f.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(bidderSdk, (0, types_1.toItemId)(mintResult.itemId), bidderAddress)];
                case 16:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("unwrap wXTZ on accept bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var bidderAddress, mintResponse, mintResult, bidResponse, wXTZAsset, bidOrderId, _a, _b, _c, acceptBidResponse, acceptBidTx;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, bidderWallet.provider.address()];
                case 1:
                    bidderAddress = _f.sent();
                    return [4 /*yield*/, itemOwnerSdk.nft.mint({
                            collectionId: (0, common_1.convertTezosToCollectionAddress)(nftContract),
                        })];
                case 2:
                    mintResponse = _f.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 3:
                    mintResult = _f.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(itemOwnerSdk, mintResult.itemId, "1")];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, (0, reset_wxtz_funds_1.resetWXTZFunds)(bidderWallet, bidderSdk, wXTZContract)];
                case 7:
                    _f.sent();
                    return [4 /*yield*/, bidderSdk.order.bid({ itemId: mintResult.itemId })];
                case 8:
                    bidResponse = _f.sent();
                    wXTZAsset = { "@type": "TEZOS_FT", contract: wXTZContract, tokenId: (0, types_1.toBigNumber)("0") };
                    _b = (_a = bidResponse).submit;
                    _d = {
                        amount: 1,
                        price: "0.00002",
                        currency: wXTZAsset
                    };
                    _e = {};
                    _c = common_1.convertTezosToUnionAddress;
                    return [4 /*yield*/, nullFundsWallet.provider.address()];
                case 9: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent()]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 10:
                    bidOrderId = _f.sent();
                    return [4 /*yield*/, itemOwnerSdk.order.acceptBid({ orderId: bidOrderId })];
                case 11:
                    acceptBidResponse = _f.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                            unwrap: true,
                        })];
                case 12:
                    acceptBidTx = _f.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 13:
                    _f.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(bidderSdk, (0, types_1.toItemId)(mintResult.itemId), bidderAddress)];
                case 14:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
