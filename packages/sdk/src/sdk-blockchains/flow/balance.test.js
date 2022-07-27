"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var types_1 = require("@rarible/types");
var apis_1 = require("../../common/apis");
var converters_1 = require("./common/converters");
var index_1 = require("./index");
describe("Test flow balance function", function () {
    beforeAll(function () {
        fcl.config().put("accessNode.api", "https://flow-access-mainnet.portto.io");
    });
    var address = (0, converters_1.convertFlowUnionAddress)("0x324c4173e0175672");
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, index_1.createFlowSdk)(wallet, (0, apis_1.createApisSdk)("prod"), "mainnet");
    test.skip("Should get FT balance for account", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance1, balance2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.getBalance(address, {
                        "@type": "FLOW_FT",
                        contract: (0, types_1.toContractAddress)("FLOW:A.0x1654653399040a61.FlowToken"),
                    })];
                case 1:
                    balance1 = _a.sent();
                    expect(balance1.toString()).toEqual("0.001");
                    return [4 /*yield*/, sdk.balances.getBalance(address, {
                            "@type": "FLOW_FT",
                            contract: (0, types_1.toContractAddress)("FLOW:A.0x3c5959b568896393.FUSD"),
                        })];
                case 2:
                    balance2 = _a.sent();
                    expect(balance2.toString()).toEqual("0");
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("Should get FT balance for account with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance1, balance2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.getBalance(address, (0, types_1.toCurrencyId)("FLOW:A.0x1654653399040a61.FlowToken"))];
                case 1:
                    balance1 = _a.sent();
                    expect(balance1.toString()).toEqual("0.001");
                    return [4 /*yield*/, sdk.balances.getBalance(address, (0, types_1.toCurrencyId)("FLOW:A.0x3c5959b568896393.FUSD"))];
                case 2:
                    balance2 = _a.sent();
                    expect(balance2.toString()).toEqual("0");
                    return [2 /*return*/];
            }
        });
    }); });
});
