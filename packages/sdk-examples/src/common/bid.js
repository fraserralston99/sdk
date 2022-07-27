"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bid = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function bid(wallet, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, bidAction, bidOrderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.bid({
                            itemId: (0, types_1.toItemId)("<ITEM_ID>"),
                        })];
                case 1:
                    bidAction = _a.sent();
                    return [4 /*yield*/, bidAction.submit({
                            amount: 1,
                            price: "0.000002",
                            currency: assetType,
                        })];
                case 2:
                    bidOrderId = _a.sent();
                    return [2 /*return*/, bidOrderId];
            }
        });
    });
}
exports.bid = bid;