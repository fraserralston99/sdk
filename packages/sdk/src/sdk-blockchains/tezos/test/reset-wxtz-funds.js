"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetWXTZFunds = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var common_1 = require("../common");
var config_1 = require("../../../config");
function resetWXTZFunds(wallet, sdk, contract) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var bidderUnionAddress, _a, _b, wXTZInitBalance, _c, sdkConfig, provider, tx;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = types_1.toUnionAddress;
                    _b = "TEZOS:".concat;
                    return [4 /*yield*/, wallet.provider.address()];
                case 1:
                    bidderUnionAddress = _a.apply(void 0, [_b.apply("TEZOS:", [_d.sent()])]);
                    _c = bignumber_js_1.default.bind;
                    return [4 /*yield*/, sdk.balances.getBalance(bidderUnionAddress, { "@type": "TEZOS_FT", contract: contract })];
                case 2:
                    wXTZInitBalance = new (_c.apply(bignumber_js_1.default, [void 0, _d.sent()]))();
                    if (!wXTZInitBalance.gt("0")) return [3 /*break*/, 5];
                    sdkConfig = (0, config_1.getSdkConfig)("testnet");
                    provider = (0, common_1.getMaybeTezosProvider)(wallet.provider, "testnet", sdkConfig);
                    return [4 /*yield*/, (0, tezos_sdk_1.unwrap)((0, common_1.getRequiredProvider)(provider), wXTZInitBalance)];
                case 3:
                    tx = _d.sent();
                    return [4 /*yield*/, tx.confirmation()];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.resetWXTZFunds = resetWXTZFunds;
