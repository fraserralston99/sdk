"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana sell", function () {
    var wallet = (0, test_wallets_1.getWallet)(0);
    var buyerWallet = (0, test_wallets_1.getWallet)(1);
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(buyerWallet);
    test("Should sell NFT item", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, orderId, tx;
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
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var buy;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, buyerSdk.order.buy({
                                            orderId: orderId,
                                        })];
                                    case 1:
                                        buy = _a.sent();
                                        return [2 /*return*/, buy.submit({
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
});
