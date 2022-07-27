"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellAndUpdate = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function sellAndUpdate(wallet, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, sellAction, sellOrderId, updateAction;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.sell({
                            itemId: (0, types_1.toItemId)("<YOUR_ITEM_ID>"),
                        })];
                case 1:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000002",
                            currency: assetType,
                            originFees: [{
                                    account: (0, types_1.toUnionAddress)("<COMISSION_ADDRESS>"),
                                    //2,5%
                                    value: 250,
                                }],
                            payouts: [{
                                    account: (0, types_1.toUnionAddress)("<PAYOUT_ADDRESS>"),
                                    //5%
                                    value: 500,
                                }],
                        })];
                case 2:
                    sellOrderId = _a.sent();
                    return [4 /*yield*/, sdk.order.sellUpdate({ orderId: sellOrderId })
                        //You can only decrease price of sell order for security reasons
                        //If you want to force change sell price you should cancel sell order
                    ];
                case 3:
                    updateAction = _a.sent();
                    //You can only decrease price of sell order for security reasons
                    //If you want to force change sell price you should cancel sell order
                    return [4 /*yield*/, updateAction.submit({ price: "0.000001" })];
                case 4:
                    //You can only decrease price of sell order for security reasons
                    //If you want to force change sell price you should cancel sell order
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sellAndUpdate = sellAndUpdate;
