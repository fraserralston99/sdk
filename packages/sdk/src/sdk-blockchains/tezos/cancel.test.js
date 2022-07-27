"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// eslint-disable-next-line camelcase
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../types/nft/mint/domain");
var retry_1 = require("../../common/retry");
var domain_2 = require("../../domain");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var test_wallet_1 = require("./test/test-wallet");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("cancel test", function () {
    var env = "testnet";
    var wallet = (0, test_wallet_1.createTestWallet)("edsk3UUamwmemNBJgDvS8jXCgKsvjL2NoTwYRFpGSRPut4Hmfs6dG8", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    test("cancel order", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, sellAction, orderId, cancelTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
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
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, "1")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.sell({
                            itemId: mintResult.itemId,
                        })];
                case 6:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000001",
                            currency: {
                                "@type": "XTZ",
                            },
                        })];
                case 7:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(20, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({
                                            id: orderId,
                                        })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.status !== "ACTIVE") {
                                            throw new Error("Order status is not active");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                        // await delay(5000)
                    ];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sdk.order.cancel({
                            orderId: orderId,
                        })];
                case 9:
                    cancelTx = _a.sent();
                    return [4 /*yield*/, cancelTx.wait()];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(40, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var canceledOrder;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({
                                            id: orderId,
                                        })];
                                    case 1:
                                        canceledOrder = _a.sent();
                                        if (canceledOrder.status !== "CANCELLED") {
                                            throw new Error("Order has not been cancelled");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
});
