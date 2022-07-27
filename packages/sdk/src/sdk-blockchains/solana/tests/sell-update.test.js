"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana sell order update", function () {
    var wallet = (0, test_wallets_1.getWallet)(0);
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should set item to sell & change price", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, orderId, order;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    item = _a.sent();
                    itemId = item.id;
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var sell;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.order.sell({ itemId: itemId })];
                                    case 1:
                                        sell = _a.sent();
                                        return [2 /*return*/, sell.submit({
                                                amount: 1,
                                                currency: {
                                                    "@type": "SOLANA_SOL",
                                                },
                                                price: (0, types_1.toBigNumber)("0.001"),
                                            })];
                                }
                            });
                        }); })];
                case 2:
                    orderId = _a.sent();
                    console.log("orderid", orderId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, sdk.apis.order.getOrderById({ id: orderId })];
                        }); }); })];
                case 3:
                    order = _a.sent();
                    expect(order.makePrice).toEqual("0.001");
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var sell;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.order.sellUpdate({ orderId: orderId })];
                                    case 1:
                                        sell = _a.sent();
                                        return [2 /*return*/, sell.submit({
                                                price: (0, types_1.toBigNumber)("200"),
                                            })];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: orderId })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.makePrice !== "200") {
                                            throw new Error("Price didn't update");
                                        }
                                        return [2 /*return*/, order];
                                }
                            });
                        }); })];
                case 5:
                    order = _a.sent();
                    expect(order.makePrice).toEqual("200");
                    return [2 /*return*/];
            }
        });
    }); });
});
