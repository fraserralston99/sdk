"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buy = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
//Available only for ethereum
function buy(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, buyAction, buyTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.buy({
                            orderId: (0, types_1.toOrderId)("<SELL_ORDER_ID>"),
                        })
                        //If you have one or more items from collection you should accept one item at the time
                    ];
                case 1:
                    buyAction = _a.sent();
                    return [4 /*yield*/, buyAction.submit({
                            amount: 1,
                            //optional
                            infiniteApproval: true,
                        })];
                case 2:
                    buyTx = _a.sent();
                    return [4 /*yield*/, buyTx.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.buy = buy;
