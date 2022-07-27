"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = void 0;
var tslib_1 = require("tslib");
var helpers_1 = require("../helpers");
var wallet_1 = require("../wallet");
var logger_1 = require("../logger");
/**
 * Buying an nft
 */
function buy(sdk, wallet, itemId, prepareFillOrderRequest, fillRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var buyPrepare, tx, address;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("buy, prepare_fill_order_request=", prepareFillOrderRequest);
                    return [4 /*yield*/, sdk.order.buy(prepareFillOrderRequest)];
                case 1:
                    buyPrepare = _a.sent();
                    logger_1.Logger.log("buy, fill_request=", fillRequest);
                    return [4 /*yield*/, buyPrepare.submit(fillRequest)];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 3:
                    _a.sent();
                    logger_1.Logger.log("submit_buy_response_tx", tx);
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallet)];
                case 4:
                    address = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.awaitForOwnership)(sdk, itemId, address.address)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, tx];
            }
        });
    });
}
exports.buy = buy;
