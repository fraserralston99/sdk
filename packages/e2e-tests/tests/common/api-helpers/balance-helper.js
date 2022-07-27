"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBalance = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
var logger_1 = require("../logger");
function verifyBalance(sdk, address, assetType, amount) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Verify balance, union address=", address);
                    logger_1.Logger.log("Asset type=", assetType);
                    logger_1.Logger.log("Expected amount=", amount);
                    return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var actual;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance(address, assetType)];
                                    case 1:
                                        actual = _a.sent();
                                        expect(actual).toBe(amount);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.verifyBalance = verifyBalance;
