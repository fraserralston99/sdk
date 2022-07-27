"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var index_1 = require("../../../index");
var domain_1 = require("../../../domain");
var test_wallet_1 = require("../test/test-wallet");
describe("canTransfer", function () {
    var env = "staging";
    var wallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_1.LogsLevel.DISABLED });
    test.skip("returns false and reason for whitelisted collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var me, otherMe, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    me = (0, types_1.toUnionAddress)("TEZOS:tz1Vek4VpsDWDHrbi26gWT7GGcw7BvhE9DjQ");
                    otherMe = (0, types_1.toUnionAddress)("TEZOS:tz1V11fB4EX5VzPKMNQ1CsBKMSFS6fL3Br9W");
                    return [4 /*yield*/, sdk.restriction.canTransfer((0, types_1.toItemId)("TEZOS:KT1S3goQNhyuZgznN952Vwfqeo96YV3U4pwf:100005"), me, otherMe)];
                case 1:
                    result = _a.sent();
                    expect(result).toStrictEqual({
                        success: false,
                        reason: "You can't trade this Digit at the moment, please visit [quartz.ubisoft.com](https://quartz.ubisoft.com) for more information.",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("returns true for whitelisted addresses", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var from, to, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    from = (0, types_1.toUnionAddress)("TEZOS:tz1NRh1vTn3b38m7Gg2qP81dqb5Kr2BAjwJV");
                    to = (0, types_1.toUnionAddress)("TEZOS:tz1Vek4VpsDWDHrbi26gWT7GGcw7BvhE9DjQ");
                    return [4 /*yield*/, sdk.restriction.canTransfer((0, types_1.toItemId)("TEZOS:KT1S3goQNhyuZgznN952Vwfqeo96YV3U4pwf:100002"), from, to)];
                case 1:
                    result = _a.sent();
                    expect(result).toStrictEqual({
                        success: true,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("returns true for other collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var token, me, otherMe, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = (0, types_1.toContractAddress)("TEZOS:KT1GXE3DGqyxTsrh6mHkfPtd9TFoGnK8vDv9");
                    me = (0, types_1.toUnionAddress)("TEZOS:tz1Vek4VpsDWDHrbi26gWT7GGcw7BvhE9DjQ");
                    otherMe = (0, types_1.toUnionAddress)("TEZOS:tz1V11fB4EX5VzPKMNQ1CsBKMSFS6fL3Br9W");
                    return [4 /*yield*/, sdk.restriction.canTransfer((0, types_1.toItemId)("".concat(token, ":1")), me, otherMe)];
                case 1:
                    result = _a.sent();
                    expect(result).toStrictEqual({
                        success: true,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
