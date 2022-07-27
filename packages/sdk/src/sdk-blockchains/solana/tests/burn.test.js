"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var mint_1 = require("../common/test/mint");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana burn", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should burn NFT", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var item, itemId, balance, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, mint_1.mintToken)(sdk)];
                case 1:
                    item = _a.sent();
                    itemId = item.id;
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var balance;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance((0, types_1.toUnionAddress)("SOLANA:" + wallet.publicKey), { "@type": "SOLANA_NFT", itemId: itemId })];
                                    case 1:
                                        balance = _a.sent();
                                        if (parseFloat(balance.toString()) < 1) {
                                            throw new Error("Wrong balance value. Expected ".concat(1, ". Actual: ").concat(balance.toString()));
                                        }
                                        return [2 /*return*/, balance];
                                }
                            });
                        }); })];
                case 2:
                    balance = _a.sent();
                    expect(parseFloat(balance.toString())).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var burn;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.nft.burn({ itemId: itemId })];
                                    case 1:
                                        burn = _a.sent();
                                        return [2 /*return*/, burn.submit({ amount: parseFloat(balance.toString()) })];
                                }
                            });
                        }); })];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, (tx === null || tx === void 0 ? void 0 : tx.wait())];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var balance;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance((0, types_1.toUnionAddress)("SOLANA:" + wallet.publicKey), (0, types_1.toCurrencyId)(itemId))];
                                    case 1:
                                        balance = _a.sent();
                                        if (parseFloat(balance.toString()) !== 0) {
                                            throw new Error("Wrong balance value. Expected ".concat(0, ". Actual: ").concat(balance.toString()));
                                        }
                                        return [2 /*return*/, balance];
                                }
                            });
                        }); })];
                case 5:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0");
                    return [2 /*return*/];
            }
        });
    }); });
});
