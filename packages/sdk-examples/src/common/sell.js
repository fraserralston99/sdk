"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintOnChain = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function mintOnChain(wallet, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, sellResponse, sellOrderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.sell({
                            itemId: (0, types_1.toItemId)("<YOUR_ITEM_ID>"),
                        })];
                case 1:
                    sellResponse = _a.sent();
                    return [4 /*yield*/, sellResponse.submit({
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
                            //+1 hour
                            expirationDate: new Date(Date.now() + 60 * 60 * 1000),
                        })];
                case 2:
                    sellOrderId = _a.sent();
                    return [2 /*return*/, sellOrderId];
            }
        });
    });
}
exports.mintOnChain = mintOnChain;
