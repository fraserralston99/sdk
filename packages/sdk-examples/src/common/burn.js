"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.burn = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function burn(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, burnAction, burnTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.nft.burn({
                            itemId: (0, types_1.toItemId)("<ITEM_ID>"),
                        })];
                case 1:
                    burnAction = _a.sent();
                    return [4 /*yield*/, burnAction.submit({
                            amount: 1,
                            //optional
                            creators: [{
                                    account: (0, types_1.toUnionAddress)("<CREATOR_ADDRESS>"),
                                    value: 10000,
                                }],
                        })
                        //transaction returned if item is on-chain
                    ];
                case 2:
                    burnTx = _a.sent();
                    if (!burnTx) return [3 /*break*/, 4];
                    return [4 /*yield*/, burnTx.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.burn = burn;
