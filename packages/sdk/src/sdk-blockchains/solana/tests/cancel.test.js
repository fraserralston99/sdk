"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana cancel", function () {
    var wallet = (0, test_wallets_1.getWallet)(0);
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should cancel NFT selling", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, orderId, cancelTx;
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
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return sdk.order.cancel({
                            orderId: orderId,
                        }); })];
                case 3:
                    cancelTx = _a.sent();
                    expect(cancelTx.hash()).toBeTruthy();
                    return [4 /*yield*/, cancelTx.wait()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should cancel multiple NFT order", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, cancelTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = (0, types_1.toItemId)("SOLANA:7axrWQBXRQosdoz99Wo8JM3SnEMbh5wk8tcjJTP38nHt");
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var sell;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.order.sell({ itemId: itemId })];
                                    case 1:
                                        sell = _a.sent();
                                        return [2 /*return*/, sell.submit({
                                                amount: 10,
                                                currency: {
                                                    "@type": "SOLANA_SOL",
                                                },
                                                price: (0, types_1.toBigNumber)("0.001"),
                                            })];
                                }
                            });
                        }); })];
                case 1:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return sdk.order.cancel({
                            orderId: orderId,
                        }); })];
                case 2:
                    cancelTx = _a.sent();
                    expect(cancelTx.hash()).toBeTruthy();
                    return [4 /*yield*/, cancelTx.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
