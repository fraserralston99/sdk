"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferItem = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
function transferItem(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, transferAction, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.nft.transfer({
                            itemId: (0, types_1.toItemId)("<YOUR_ITEM_ID>"),
                        })];
                case 1:
                    transferAction = _a.sent();
                    return [4 /*yield*/, transferAction.submit({
                            to: (0, types_1.toUnionAddress)("<ITEM_RECIPIENT>"),
                            amount: 1,
                        })];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.transferItem = transferItem;
