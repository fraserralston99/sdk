"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetWethFunds = void 0;
var tslib_1 = require("tslib");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var types_1 = require("@rarible/types");
function resetWethFunds(wallet, sdk, contract) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var wethAsset, walletAddress, _a, wethBidderBalance, _b, tx;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wethAsset = { assetClass: "ERC20", contract: contract };
                    _a = types_1.toAddress;
                    return [4 /*yield*/, wallet.ethereum.getFrom()];
                case 1:
                    walletAddress = _a.apply(void 0, [_c.sent()]);
                    _b = bignumber_js_1.default.bind;
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, wethAsset)];
                case 2:
                    wethBidderBalance = new (_b.apply(bignumber_js_1.default, [void 0, _c.sent()]))();
                    if (!wethBidderBalance.gt("0")) return [3 /*break*/, 5];
                    return [4 /*yield*/, sdk.balances.convert(wethAsset, { assetClass: "ETH" }, wethBidderBalance)];
                case 3:
                    tx = _c.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.resetWethFunds = resetWethFunds;
