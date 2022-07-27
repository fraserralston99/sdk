"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana bidding balance", function () {
    var wallet = (0, test_wallets_1.getWallet)(0);
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should check bidding balance", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.getBiddingBalance({
                        currency: {
                            "@type": "SOLANA_SOL",
                        },
                        walletAddress: (0, types_1.toUnionAddress)("SOLANA:" + wallet.publicKey.toString()),
                    })];
                case 1:
                    balance = _a.sent();
                    expect(parseFloat(balance.toString())).toBeGreaterThanOrEqual(0.00089088);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should deposit bidding balance", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.depositBiddingBalance({
                        currency: {
                            "@type": "SOLANA_SOL",
                        },
                        amount: 0.01,
                    })];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _a.sent();
                    expect(tx.hash()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should withdraw bidding balance", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.withdrawBiddingBalance({
                        currency: {
                            "@type": "SOLANA_SOL",
                        },
                        amount: 0.01,
                    })];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _a.sent();
                    expect(tx.hash()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
