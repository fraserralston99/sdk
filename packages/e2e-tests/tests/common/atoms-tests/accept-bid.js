"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptBid = void 0;
var tslib_1 = require("tslib");
var logger_1 = require("../logger");
/**
 * Fill an bid order
 */
function acceptBid(sdk, wallet, prepareFillOrderRequest, fillRequest) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var acceptBidPrepare, tx, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    logger_1.Logger.log("accept_bid, prepare_fill_order_request=", prepareFillOrderRequest);
                    return [4 /*yield*/, sdk.order.acceptBid(prepareFillOrderRequest)];
                case 1:
                    acceptBidPrepare = _b.sent();
                    logger_1.Logger.log("accept_bid, fill_request=", fillRequest);
                    return [4 /*yield*/, acceptBidPrepare.submit(fillRequest)];
                case 2:
                    tx = _b.sent();
                    return [4 /*yield*/, tx.wait()
                        // todo: add more checks for ownership
                    ];
                case 3:
                    _b.sent();
                    // todo: add more checks for ownership
                    return [2 /*return*/, tx];
                case 4:
                    e_1 = _b.sent();
                    throw new Error("Exception during accept bid: ".concat((_a = e_1.message) !== null && _a !== void 0 ? _a : e_1.toString()));
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.acceptBid = acceptBid;
