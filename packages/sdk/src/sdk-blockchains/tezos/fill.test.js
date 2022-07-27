"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var await_for_ownership_1 = require("./test/await-for-ownership");
var test_wallet_1 = require("./test/test-wallet");
var common_1 = require("./common");
describe.skip("fill test", function () {
    var env = "testnet";
    var wallet = (0, test_wallet_1.createTestWallet)("edskS4QxJFDSkHaf6Ax3ByfrZj5cKvLUR813uqwE94baan31c1cPPTMvoAvUKbEv2xM9mvtwoLANNTBSdyZf3CCyN2re7qZyi3", env);
    var buyerSdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_1.LogsLevel.DISABLED });
    test("buy NFT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var buyerAddress, fillAction, tx, ownership;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wallet.provider.address()];
                case 1:
                    buyerAddress = _a.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({
                            orderId: (0, common_1.convertTezosOrderId)("6345c41b-b8a2-5697-8e29-1438cc5ddf6b"),
                        })];
                case 2:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 3:
                    tx = _a.sent();
                    console.log("tx", tx);
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(buyerSdk, (0, types_1.toItemId)("TEZOS:KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS:46284"), buyerAddress)];
                case 5:
                    ownership = _a.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test.skip("buy MT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var buyerAddress, fillAction, tx, ownership;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wallet.provider.address()];
                case 1:
                    buyerAddress = _a.sent();
                    return [4 /*yield*/, buyerSdk.order.buy({
                            orderId: (0, common_1.convertTezosOrderId)("f1a87424bc67e47a9a3f850b9f5a5ba13af5259f6d139d7b3710b4862a3aaac9"),
                        })];
                case 2:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(buyerSdk, (0, common_1.convertTezosItemId)("KT1Ctz9vuC6uxsBPD4GbdbPaJvZogWhE9SLu:50"), buyerAddress)];
                case 5:
                    ownership = _a.sent();
                    expect(ownership.value).toBe("1");
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
});
