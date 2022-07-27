"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptBidOnCollection = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
//Available only for ethereum
function acceptBidOnCollection(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, acceptBidAction, acceptBidTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.acceptBid({
                            orderId: (0, types_1.toOrderId)("<COLLECTION_ORDER_ID>"),
                        })
                        //If you have one or more items from collection you should accept one item at the time
                    ];
                case 1:
                    acceptBidAction = _a.sent();
                    return [4 /*yield*/, acceptBidAction.submit({
                            amount: 1,
                            itemId: (0, types_1.toItemId)("<ACCEPTED_ITEM_ID>"),
                            //optional
                            infiniteApproval: true,
                            //Set true if you want to convert received WETH/wTEZ tokens to ETH/TEZ
                            unwrap: false,
                        })];
                case 2:
                    acceptBidTx = _a.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.acceptBidOnCollection = acceptBidOnCollection;
