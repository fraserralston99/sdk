"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidUpdate = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var logger_1 = require("../logger");
/**
 * Make update of bid order
 */
function bidUpdate(sdk, wallet, prepareOrderUpdateRequest, orderUpdateRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var prepareBidUpdateResponse, orderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("bidUpdate, prepare_order_update_request=", prepareOrderUpdateRequest);
                    return [4 /*yield*/, sdk.order.bidUpdate(prepareOrderUpdateRequest)];
                case 1:
                    prepareBidUpdateResponse = _a.sent();
                    logger_1.Logger.log("bidUpdate, order_update_request=", orderUpdateRequest);
                    return [4 /*yield*/, prepareBidUpdateResponse.submit(orderUpdateRequest)
                        // Flow create new order when update
                    ];
                case 2:
                    orderId = _a.sent();
                    // Flow create new order when update
                    if (wallet.blockchain !== api_client_1.BlockchainGroup.FLOW) {
                        expect(orderId).toBe(prepareOrderUpdateRequest.orderId);
                    }
                    return [4 /*yield*/, sdk.apis.order.getOrderById({ id: orderId })];
                case 3: 
                // Check order
                //return await awaitOrderStock(sdk, orderId, orderRequest.price.toString())
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.bidUpdate = bidUpdate;
