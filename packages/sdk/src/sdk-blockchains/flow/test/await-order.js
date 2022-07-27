"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitFlowOrder = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitFlowOrder(sdk, orderId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        return [2 /*return*/, sdk.apis.order.getOrderByOrderId({ orderId: orderId })];
                    });
                }); })];
        });
    });
}
exports.awaitFlowOrder = awaitFlowOrder;
