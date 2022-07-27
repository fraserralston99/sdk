"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitForOrderStatus = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitForOrderStatus(sdk, orderId, status) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var order;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({
                                    id: orderId,
                                })];
                            case 1:
                                order = _a.sent();
                                if (order.status !== status) {
                                    throw new Error("Order status=".concat(order.status, ", expected=").concat(status));
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitForOrderStatus = awaitForOrderStatus;
