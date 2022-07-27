"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptBid = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function acceptBid(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, acceptBidResponse, acceptBidResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.acceptBid({
                            orderId: (0, types_1.toOrderId)("<BIDDER_ORDER_ID>"),
                        })];
                case 1:
                    acceptBidResponse = _a.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 1,
                            //optional
                            originFees: [{
                                    account: (0, types_1.toUnionAddress)("<COMISSION_ADDRESS>"),
                                    //2,5%
                                    value: 250,
                                }],
                            //optional
                            payouts: [{
                                    account: (0, types_1.toUnionAddress)("<PAYOUT_ADDRESS>"),
                                    //5%
                                    value: 500,
                                }],
                            //optional
                            infiniteApproval: true,
                            //Set true if you want to convert received WETH/wTEZ tokens to ETH/TEZ
                            unwrap: false,
                        })];
                case 2:
                    acceptBidResult = _a.sent();
                    return [4 /*yield*/, acceptBidResult.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.acceptBid = acceptBid;
