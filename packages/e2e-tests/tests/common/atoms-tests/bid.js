"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bid = void 0;
var tslib_1 = require("tslib");
var bn_1 = require("@rarible/utils/build/bn");
var helpers_1 = require("../helpers");
var logger_1 = require("../logger");
/**
 * Make new bid order
 */
function bid(sdk, wallet, prepareOrderRequest, orderRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var bidPrepare, orderId, makeStock;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("bid, prepare_order_update_request=", prepareOrderRequest);
                    return [4 /*yield*/, sdk.order.bid(prepareOrderRequest)];
                case 1:
                    bidPrepare = _a.sent();
                    logger_1.Logger.log("bid, order_request=", orderRequest);
                    return [4 /*yield*/, bidPrepare.submit(orderRequest)];
                case 2:
                    orderId = _a.sent();
                    logger_1.Logger.log("order_id=", orderId);
                    makeStock = (0, bn_1.toBn)(orderRequest.price).multipliedBy(orderRequest.amount).toString();
                    return [4 /*yield*/, (0, helpers_1.awaitOrderStock)(sdk, orderId, makeStock)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.bid = bid;
