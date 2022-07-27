"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitForCollection = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("../../../common/retry");
function awaitForCollection(sdk, collection) {
    var _this = this;
    return (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, sdk.apis.collection.getCollectionById({
                    collection: collection,
                })];
        });
    }); });
}
exports.awaitForCollection = awaitForCollection;
