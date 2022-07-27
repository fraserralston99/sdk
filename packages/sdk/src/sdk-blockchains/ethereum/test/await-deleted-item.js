"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitDeletedItem = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitDeletedItem(sdk, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var item;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.item.getItemById({ itemId: itemId })];
                            case 1:
                                item = _a.sent();
                                expect(item.deleted).toBe(true);
                                return [2 /*return*/, item];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitDeletedItem = awaitDeletedItem;
