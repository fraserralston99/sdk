"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var domain_2 = require("../../types/nft/mint/domain");
var await_item_1 = require("../ethereum/test/await-item");
var apis_1 = require("../../common/apis");
var config_1 = require("../../config");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var test_wallet_1 = require("./test/test-wallet");
var await_for_ownership_1 = require("./test/await-for-ownership");
var await_for_order_1 = require("./test/await-for-order");
var test_contracts_1 = require("./test/test-contracts");
var common_1 = require("./common");
var sell_1 = require("./sell");
describe.skip("test tezos mint and sell", function () {
    var env = "testnet";
    var sellerWallet = (0, test_wallet_1.createTestWallet)("edskS143x9JtTcFUxE5UDT9Tajkx9hdLha9mQhijSarwsKM6fzBEAuMEttFEjBYL7pT4o5P5yRqFGhUmqEynwviMk5KJ8iMgTw", env);
    var sellerSdk = (0, index_1.createRaribleSdk)(sellerWallet, env, { logs: domain_1.LogsLevel.DISABLED });
    var buyerWallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var buyerSdk = (0, index_1.createRaribleSdk)(buyerWallet, env, { logs: domain_1.LogsLevel.DISABLED });
    var nextBuyerWallet = (0, test_wallet_1.createTestWallet)("edskS4QxJFDSkHaf6Ax3ByfrZj5cKvLUR813uqwE94baan31c1cPPTMvoAvUKbEv2xM9mvtwoLANNTBSdyZf3CCyN2re7qZyi3", env);
    var nextBuyerSdk = (0, index_1.createRaribleSdk)(nextBuyerWallet, env, { logs: domain_1.LogsLevel.DISABLED });
    var eurTzContract = (0, test_contracts_1.getTestContract)(env, "eurTzContract");
    var fa12Contract = (0, test_contracts_1.getTestContract)(env, "fa12Contract");
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    var sdkConfig = (0, config_1.getSdkConfig)(env);
    var sellerTezosProvider = (0, common_1.getMaybeTezosProvider)(sellerWallet.provider, sdkConfig.tezosNetwork, sdkConfig);
    var unionApis = (0, apis_1.createApisSdk)(env, undefined);
    var sellerSellService = new sell_1.TezosSell(sellerTezosProvider, unionApis);
    test("sale NFT with XTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: { "@type": "XTZ" },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_1.awaitItem)(sellerSdk, mintResult.itemId)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, mintResult.orderId)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 7:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 8:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 9:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 10: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 11:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale with mintAndSell NFT with XTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: { "@type": "XTZ" },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_1.awaitItem)(sellerSdk, mintResult.itemId)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, mintResult.orderId)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 7:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 8:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 9:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 10: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 11:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale NFT with XTZ and with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, order, takeAssetType, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: (0, types_1.toCurrencyId)("TEZOS:tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU"),
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, mintResult.orderId)];
                case 3:
                    order = _c.sent();
                    takeAssetType = order.take.type;
                    expect(takeAssetType["@type"]).toEqual("XTZ");
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 4:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 5:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 6:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 7: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 8:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale NFT with eurTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: "0.0001",
                            currency: {
                                "@type": "TEZOS_FT",
                                contract: eurTzContract,
                            },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 3:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 4:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 5:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 6: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 7:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale MT with XTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: { "@type": "XTZ" },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 5:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 10,
                            infiniteApproval: true,
                        })];
                case 6:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 7:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 8: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 9:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("10");
                    return [2 /*return*/];
            }
        });
    }); });
    test("item creator should receive royalty from resale MT with XTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemCreatorAddress, mintAndSellAction, mintResult, _a, _b, _c, _d, xtzAssetType, fillResponse, fillResult, sellAction, sellOrderId, itemCreatorBalance, buyerBalance, _e, _f, _g, _h, nextBuyerFillResponse, nextBuyerFillResult, buyerFinishBalance, _j, _k, _l, _m, buyerBalanceDiff, sellerInitBalanceEnd, creatorRoyalty;
        var _o, _p;
        return tslib_1.__generator(this, function (_q) {
            switch (_q.label) {
                case 0: return [4 /*yield*/, sellerWallet.provider.address()];
                case 1:
                    itemCreatorAddress = _q.sent();
                    return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                            collectionId: (0, types_1.toCollectionId)(mtContract),
                        })];
                case 2:
                    mintAndSellAction = _q.sent();
                    _b = (_a = mintAndSellAction).submit;
                    _o = {
                        price: new bignumber_js_1.default("1"),
                        currency: { "@type": "XTZ" },
                        uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                        supply: 1,
                        lazyMint: false
                    };
                    _p = {};
                    _c = types_1.toUnionAddress;
                    _d = "TEZOS:".concat;
                    return [4 /*yield*/, sellerWallet.provider.address()];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_o.royalties = [(_p.account = _c.apply(void 0, [_d.apply("TEZOS:", [_q.sent()])]),
                                _p.value = 1000,
                                _p)],
                            _o)])];
                case 4:
                    mintResult = _q.sent();
                    xtzAssetType = { "@type": "XTZ" };
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 5:
                    fillResponse = _q.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 6:
                    fillResult = _q.sent();
                    return [4 /*yield*/, fillResult.wait()
                        // sell from item creator to the buyer is finished
                    ];
                case 7:
                    _q.sent();
                    return [4 /*yield*/, buyerSdk.order.sell({
                            itemId: mintResult.itemId,
                        })];
                case 8:
                    sellAction = _q.sent();
                    return [4 /*yield*/, sellAction.submit({
                            price: new bignumber_js_1.default("1"),
                            currency: { "@type": "XTZ" },
                            amount: 1,
                        })];
                case 9:
                    sellOrderId = _q.sent();
                    return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:".concat(itemCreatorAddress)), xtzAssetType)];
                case 10:
                    itemCreatorBalance = _q.sent();
                    _f = (_e = buyerSdk.balances).getBalance;
                    _g = types_1.toUnionAddress;
                    _h = "TEZOS:".concat;
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 11: return [4 /*yield*/, _f.apply(_e, [_g.apply(void 0, [_h.apply("TEZOS:", [_q.sent()])]),
                        xtzAssetType])];
                case 12:
                    buyerBalance = _q.sent();
                    return [4 /*yield*/, nextBuyerSdk.order.buy({ orderId: sellOrderId })];
                case 13:
                    nextBuyerFillResponse = _q.sent();
                    return [4 /*yield*/, nextBuyerFillResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 14:
                    nextBuyerFillResult = _q.sent();
                    return [4 /*yield*/, nextBuyerFillResult.wait()
                        // sell from buyer to the next buyer is finished
                    ];
                case 15:
                    _q.sent();
                    _k = (_j = buyerSdk.balances).getBalance;
                    _l = types_1.toUnionAddress;
                    _m = "TEZOS:".concat;
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 16: return [4 /*yield*/, _k.apply(_j, [_l.apply(void 0, [_m.apply("TEZOS:", [_q.sent()])]),
                        xtzAssetType])];
                case 17:
                    buyerFinishBalance = _q.sent();
                    buyerBalanceDiff = new bignumber_js_1.default(buyerFinishBalance).minus(new bignumber_js_1.default(buyerBalance));
                    expect(buyerBalanceDiff.eq("0.9")).toBeTruthy();
                    return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:".concat(itemCreatorAddress)), xtzAssetType)];
                case 18:
                    sellerInitBalanceEnd = _q.sent();
                    creatorRoyalty = new bignumber_js_1.default(sellerInitBalanceEnd).minus(new bignumber_js_1.default(itemCreatorBalance));
                    expect(creatorRoyalty.eq(new bignumber_js_1.default("0.1"))).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale MT with FA12", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, mintResult, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.1"),
                            currency: {
                                "@type": "TEZOS_FT",
                                contract: fa12Contract,
                            },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sellerSdk, mintResult.itemId)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, mintResult.orderId)];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: mintResult.orderId })];
                case 5:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 4,
                            infiniteApproval: true,
                        })];
                case 6:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 7:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 8: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 9:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("4");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale MT with FA2", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction, expirationDate, mintResult, updateAction, updatedOrderId, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintAndSellAction = _c.sent();
                    expirationDate = new Date(Date.now() + 100 * 1000);
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.002"),
                            currency: {
                                "@type": "TEZOS_FT",
                                contract: eurTzContract,
                                tokenId: (0, types_1.toBigNumber)("0"),
                            },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                            expirationDate: expirationDate,
                        })];
                case 2:
                    mintResult = _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, mintResult.orderId)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, sellerSdk.order.sellUpdate({
                            orderId: mintResult.orderId,
                        })];
                case 4:
                    updateAction = _c.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.001" })];
                case 5:
                    updatedOrderId = _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: updatedOrderId })];
                case 6:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 5,
                            infiniteApproval: true,
                        })];
                case 7:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 8:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 9: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 10:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("5");
                    return [2 /*return*/];
            }
        });
    }); });
    test("sale MT <-> FA2 with v1 order", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, orderId, fillResponse, fillResult, ownership, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _c.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _c.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sellerSdk, mintResult.itemId, "10")];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, sellerSellService.sellV1({
                            itemId: mintResult.itemId,
                            amount: 5,
                            price: "0.002",
                            currency: {
                                "@type": "TEZOS_FT",
                                contract: eurTzContract,
                                tokenId: (0, types_1.toBigNumber)("0"),
                            },
                        })];
                case 6:
                    orderId = _c.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, orderId)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({ orderId: orderId })];
                case 8:
                    fillResponse = _c.sent();
                    return [4 /*yield*/, fillResponse.submit({
                            amount: 5,
                            infiniteApproval: true,
                        })];
                case 9:
                    fillResult = _c.sent();
                    return [4 /*yield*/, fillResult.wait()];
                case 10:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [buyerSdk,
                        (0, types_1.toItemId)(mintResult.itemId)];
                    return [4 /*yield*/, buyerWallet.provider.address()];
                case 11: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 12:
                    ownership = _c.sent();
                    expect(ownership.value).toBe("5");
                    return [2 /*return*/];
            }
        });
    }); });
});
