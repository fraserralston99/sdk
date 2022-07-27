"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitItem = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitItem(sdk, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 2000, function () { return sdk.apis.item.getItemById({ itemId: itemId }); })];
        });
    });
}
exports.awaitItem = awaitItem;
