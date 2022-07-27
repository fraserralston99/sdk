"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function cancelOrder(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, cancelTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.cancel({
                            orderId: (0, types_1.toOrderId)("<YOUR_ORDER_ID>"),
                        })];
                case 1:
                    cancelTx = _a.sent();
                    return [4 /*yield*/, cancelTx.wait()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.cancelOrder = cancelOrder;
