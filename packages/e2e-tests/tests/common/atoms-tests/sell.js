"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sell = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var helpers_1 = require("../helpers");
var logger_1 = require("../logger");
/**
 * Make new sell order and check stocks
 */
function sell(sdk, wallet, prepareOrderRequest, orderRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sellPrepare, orderId, nextStock;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("sell, prepare_order_request=", prepareOrderRequest);
                    return [4 /*yield*/, sdk.order.sell(prepareOrderRequest)
                        //expect(parseInt(sellPrepare.maxAmount)).toBeGreaterThanOrEqual(orderRequest.amount)
                    ];
                case 1:
                    sellPrepare = _a.sent();
                    //expect(parseInt(sellPrepare.maxAmount)).toBeGreaterThanOrEqual(orderRequest.amount)
                    logger_1.Logger.log("sell, order_request=", orderRequest);
                    return [4 /*yield*/, sellPrepare.submit(orderRequest)];
                case 2:
                    orderId = _a.sent();
                    logger_1.Logger.log("order_id=", orderId);
                    nextStock = (0, types_1.toBigNumber)(orderRequest.amount.toString());
                    return [4 /*yield*/, (0, helpers_1.awaitOrderStock)(sdk, orderId, nextStock)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.sell = sell;
