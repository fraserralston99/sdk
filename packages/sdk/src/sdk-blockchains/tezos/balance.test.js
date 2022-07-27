"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var test_wallet_1 = require("./test/test-wallet");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("get balance", function () {
    var env = "staging";
    var sellerWallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sellerSdk = (0, index_1.createRaribleSdk)(sellerWallet, env, { logs: domain_1.LogsLevel.DISABLED });
    //eur
    var fa2 = (0, test_contracts_1.getTestContract)(env, "eurTzContract");
    //uusd
    var fa12 = (0, test_contracts_1.getTestContract)(env, "fa12Contract");
    test.skip("get balance XTZ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1gqL7i1s578qj3NzgKmu6C5j3RdSBewGBo"), { "@type": "XTZ" })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1043.538791");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance XTZ without wallet", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sellerSdk, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerSdk = (0, index_1.createRaribleSdk)(undefined, "staging", { logs: domain_1.LogsLevel.DISABLED });
                    return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1hnh8ET6dtP2PBQ2yj2T3ZEfMii6kEWR6N"), { "@type": "XTZ" })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1.0093");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance XTZ without wallet with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sellerSdk, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerSdk = (0, index_1.createRaribleSdk)(undefined, "staging", { logs: domain_1.LogsLevel.DISABLED });
                    return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1hnh8ET6dtP2PBQ2yj2T3ZEfMii6kEWR6N"), (0, types_1.toCurrencyId)("TEZOS:tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU"))];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1.0093");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance FT", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1hnh8ET6dtP2PBQ2yj2T3ZEfMii6kEWR6N"), {
                        "@type": "TEZOS_FT",
                        contract: (0, types_1.toContractAddress)(fa12),
                    })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0.03");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance FT with currencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1hnh8ET6dtP2PBQ2yj2T3ZEfMii6kEWR6N"), (0, types_1.toCurrencyId)(fa2))];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0.03");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance FT without wallet", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sellerSdk, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sellerSdk = (0, index_1.createRaribleSdk)(undefined, "staging", { logs: domain_1.LogsLevel.DISABLED });
                    return [4 /*yield*/, sellerSdk.balances.getBalance((0, types_1.toUnionAddress)("TEZOS:tz1hnh8ET6dtP2PBQ2yj2T3ZEfMii6kEWR6N"), {
                            "@type": "TEZOS_FT",
                            contract: (0, types_1.toContractAddress)("TEZOS:KT1LJSq4mhyLtPKrncLXerwAF2Xvk7eU3KJX"),
                        })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0.03");
                    return [2 /*return*/];
            }
        });
    }); });
});
