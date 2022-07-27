"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitBalance = void 0;
var tslib_1 = require("tslib");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var api_client_1 = require("@rarible/api-client");
var common_1 = require("../common");
var retry_1 = require("../../../common/retry");
function awaitBalance(sdk, assetType, wallet, value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var address, _a, balance, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = common_1.convertEthereumToUnionAddress;
                                    return [4 /*yield*/, wallet.ethereum.getFrom()];
                                case 1:
                                    address = _a.apply(void 0, [_c.sent(), api_client_1.Blockchain.ETHEREUM]);
                                    _b = bignumber_js_1.default.bind;
                                    return [4 /*yield*/, sdk.balances.getBalance(address, assetType)];
                                case 2:
                                    balance = new (_b.apply(bignumber_js_1.default, [void 0, _c.sent()]))();
                                    expect(balance.toString()).toBe(value.toString());
                                    return [2 /*return*/, balance];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.awaitBalance = awaitBalance;
