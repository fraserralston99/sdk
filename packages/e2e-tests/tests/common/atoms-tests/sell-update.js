"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellUpdate = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
var api_client_1 = require("@rarible/api-client");
var logger_1 = require("../logger");
/**
 * Update sell order and check stocks
 */
function sellUpdate(sdk, wallet, prepareOrderUpdateRequest, orderUpdateRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareOrderUpdateResponse, orderId;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("sellUpdate, prepare_order_update_request=", prepareOrderUpdateRequest);
                    return [4 /*yield*/, sdk.order.sellUpdate(prepareOrderUpdateRequest)];
                case 1:
                    prepareOrderUpdateResponse = _a.sent();
                    logger_1.Logger.log("prepare_order_update_response", prepareOrderUpdateResponse);
                    logger_1.Logger.log("sellUpdate, order_update_request=", orderUpdateRequest);
                    return [4 /*yield*/, prepareOrderUpdateResponse.submit(orderUpdateRequest)];
                case 2:
                    orderId = _a.sent();
                    logger_1.Logger.log("order_id", orderId);
                    // Flow create new order when update
                    if (wallet.blockchain !== api_client_1.BlockchainGroup.FLOW) {
                        expect(orderId).toBe(prepareOrderUpdateRequest.orderId);
                    }
                    return [4 /*yield*/, (0, retry_1.retry)(10, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var order;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: orderId })];
                                    case 1:
                                        order = _b.sent();
                                        expect((_a = order.makePrice) === null || _a === void 0 ? void 0 : _a.toString()).toEqual(orderUpdateRequest.price.toString());
                                        return [2 /*return*/, order];
                                }
                            });
                        }); })];
                case 3: 
                // Check order stock to be equal sell amount
                // const nextStock = toBigNumber(orderRequest.amount.toString())
                // return await awaitOrderStock(sdk, orderId, nextStock)
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.sellUpdate = sellUpdate;
