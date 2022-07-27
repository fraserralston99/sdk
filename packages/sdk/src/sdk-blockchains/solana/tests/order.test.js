"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana order", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    var defaultBaseFee = 0; //250
    var tokenForSell;
    var tokenForBid;
    beforeAll(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    tokenForSell = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 2:
                    tokenForBid = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("create order with precision price", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mint, sell, price, orderId, order;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    mint = _a.sent();
                    return [4 /*yield*/, sdk.order.sell({ itemId: mint.id })];
                case 2:
                    sell = _a.sent();
                    price = "10000000000.000000001";
                    return [4 /*yield*/, sell.submit({
                            amount: 1,
                            price: price,
                            currency: { "@type": "SOLANA_SOL" },
                        })];
                case 3:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return sdk.apis.order.getOrderById({ id: orderId }); })];
                case 4:
                    order = _a.sent();
                    expect(order.take.value).toEqual(price);
                    return [2 /*return*/];
            }
        });
    }); });
    test("baseFee for sell", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sell;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.order.sell({ itemId: tokenForSell.id })];
                case 1:
                    sell = _a.sent();
                    expect(sell.baseFee).toEqual(defaultBaseFee);
                    return [2 /*return*/];
            }
        });
    }); });
    test("baseFee for sellUpdate", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sell, order, update;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.order.sell({ itemId: tokenForSell.id })];
                case 1:
                    sell = _a.sent();
                    return [4 /*yield*/, sell.submit({
                            amount: 1,
                            price: 0.0001,
                            currency: { "@type": "SOLANA_SOL" },
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.order.sellUpdate({ orderId: order })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 3:
                    update = _a.sent();
                    expect(update.baseFee).toEqual(defaultBaseFee);
                    return [2 /*return*/];
            }
        });
    }); });
    test("baseFee for bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sell;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.order.bid({ itemId: tokenForBid.id })];
                case 1:
                    sell = _a.sent();
                    expect(sell.baseFee).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
    test("baseFee for bidUpdate", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var bid, order, update;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.order.bid({ itemId: tokenForBid.id })];
                case 1:
                    bid = _a.sent();
                    return [4 /*yield*/, bid.submit({
                            amount: 1,
                            price: 0.0001,
                            currency: {
                                "@type": "SOLANA_SOL",
                            },
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.order.bidUpdate({ orderId: order })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })];
                case 3:
                    update = _a.sent();
                    expect(update.baseFee).toEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
