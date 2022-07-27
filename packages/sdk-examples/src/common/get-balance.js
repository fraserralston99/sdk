"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function getBalance(wallet, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.balances.getBalance((0, types_1.toUnionAddress)("<YOUR_WALLET_ADDRESS>"), assetType)];
                case 1:
                    balance = _a.sent();
                    return [2 /*return*/, balance];
            }
        });
    });
}
exports.getBalance = getBalance;
