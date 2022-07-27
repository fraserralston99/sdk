"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana bid", function () {
    var wallet = (0, test_wallets_1.getWallet)(0);
    var buyerWallet = (0, test_wallets_1.getWallet)(1);
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(buyerWallet);
    test("Should bid & accept", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, orderId, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    item = _a.sent();
                    itemId = item.id;
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var bid;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, buyerSdk.order.bid({ itemId: itemId })];
                                    case 1:
                                        bid = _a.sent();
                                        return [2 /*return*/, bid.submit({
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
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var accept;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.order.acceptBid({
                                            orderId: orderId,
                                        })];
                                    case 1:
                                        accept = _a.sent();
                                        return [2 /*return*/, accept.submit({
                                                amount: 1,
                                                itemId: itemId,
                                            })];
                                }
                            });
                        }); })];
                case 3:
                    tx = _a.sent();
                    expect(tx.hash()).toBeTruthy();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should bid & updateBid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, orderId, order;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    item = _a.sent();
                    itemId = item.id;
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var bid;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, buyerSdk.order.bid({ itemId: itemId })];
                                    case 1:
                                        bid = _a.sent();
                                        return [2 /*return*/, bid.submit({
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
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var update;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, buyerSdk.order.bidUpdate({ orderId: orderId })];
                                    case 1:
                                        update = _a.sent();
                                        return [2 /*return*/, update.submit({
                                                price: (0, types_1.toBigNumber)("0.003"),
                                            })];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: orderId })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.make.value !== "0.003") {
                                            throw new Error("Wrong bid value");
                                        }
                                        return [2 /*return*/, order];
                                }
                            });
                        }); })];
                case 4:
                    order = _a.sent();
                    expect(order.make.value.toString()).toEqual("0.003");
                    return [2 /*return*/];
            }
        });
    }); });
});
