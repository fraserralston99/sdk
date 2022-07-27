"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var index_1 = require("../../index");
var domain_1 = require("../../types/nft/mint/domain");
var domain_2 = require("../../domain");
var retry_1 = require("../../common/retry");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var await_for_order_1 = require("./test/await-for-order");
var test_wallet_1 = require("./test/test-wallet");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("sell test", function () {
    var env = "staging";
    var sellerWallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sellerSdk = (0, index_1.createRaribleSdk)(sellerWallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    test("sell NFT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sellerAddress, mintResponse, mintResult, sellAction, orderId, updateAction, createdOrderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerWallet.provider.address()];
                case 1:
                    sellerAddress = _a.sent();
                    return [4 /*yield*/, sellerSdk.nft.mint({
                            collectionId: (0, types_1.toCollectionId)(nftContract),
                        })];
                case 2:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 3:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sellerSdk, mintResult.itemId, "1")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sellerSdk.order.sell({
                            itemId: mintResult.itemId,
                        })];
                case 7:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.02",
                            currency: {
                                "@type": "XTZ",
                            },
                            payouts: [{
                                    account: (0, types_1.toUnionAddress)("TEZOS:".concat(sellerAddress)),
                                    value: 10000,
                                }],
                        })];
                case 8:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, orderId)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, sellerSdk.order.sellUpdate({
                            orderId: orderId,
                        })];
                case 10:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.01" })];
                case 11:
                    createdOrderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var updatedOrder;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sellerSdk.apis.order.getOrderById({
                                            id: createdOrderId,
                                        })];
                                    case 1:
                                        updatedOrder = _a.sent();
                                        expect(new bignumber_js_1.default(updatedOrder.take.value).toString()).toBe(new bignumber_js_1.default("0.01").toString());
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test("sell MT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, sellAction, orderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sellerSdk, mintResult.itemId, "10")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sellerSdk.order.sell({
                            itemId: mintResult.itemId,
                        })];
                case 6:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 5,
                            price: "0.02",
                            currency: {
                                "@type": "XTZ",
                            },
                        })];
                case 7:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_for_order_1.awaitForOrder)(sellerSdk, orderId)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 2900000);
});
