"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = void 0;
var tslib_1 = require("tslib");
var helpers_1 = require("../helpers");
var logger_1 = require("../logger");
/**
 * Cancel an order
 */
function cancel(sdk, wallet, cancelRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // try {
                    logger_1.Logger.log("cancel order/bid, cancel_request=", cancelRequest);
                    return [4 /*yield*/, sdk.order.cancel(cancelRequest)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, helpers_1.awaitOrderCancel)(sdk, cancelRequest.orderId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, tx
                        // } catch (e: any) {
                        // 	throw new Error(`Exception during order canceling: ${e.toString()}`)
                        // }
                    ];
            }
        });
    });
}
exports.cancel = cancel;
