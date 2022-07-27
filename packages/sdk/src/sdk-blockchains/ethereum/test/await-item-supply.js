"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitItemSupply = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitItemSupply(sdk, itemId, value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var item;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.item.getItemById({ itemId: itemId })];
                            case 1:
                                item = _a.sent();
                                if (value.toString() !== item.supply.toString()) {
                                    throw new Error("Item value is not equal to the current");
                                }
                                return [2 /*return*/, item];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitItemSupply = awaitItemSupply;
