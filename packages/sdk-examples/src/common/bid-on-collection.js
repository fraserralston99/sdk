"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidOnCollection = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
//Available only for ethereum
function bidOnCollection(wallet, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, bidAction, bidOrderId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.bid({
                            collectionId: (0, types_1.toCollectionId)("<COLLECTION_ADDRESS>"),
                        })];
                case 1:
                    bidAction = _a.sent();
                    return [4 /*yield*/, bidAction.submit({
                            amount: 1,
                            price: "0.000002",
                            currency: assetType,
                            //+1 hour (optional)
                            expirationDate: new Date(Date.now() + 60 * 60 * 1000),
                        })];
                case 2:
                    bidOrderId = _a.sent();
                    return [2 /*return*/, bidOrderId];
            }
        });
    });
}
exports.bidOnCollection = bidOnCollection;
