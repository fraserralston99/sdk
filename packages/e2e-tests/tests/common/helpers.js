"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.awaitForOwnership = exports.awaitForItemSupply = exports.awaitOrderCancel = exports.awaitOrderStock = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
function awaitOrderStock(sdk, id, awaitingValue) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(20, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var order;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: id })];
                            case 1:
                                order = _a.sent();
                                expect(order.makeStock.toString()).toEqual(awaitingValue.toString());
                                return [2 /*return*/, order];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitOrderStock = awaitOrderStock;
function awaitOrderCancel(sdk, id) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var order;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: id })];
                            case 1:
                                order = _a.sent();
                                if (order.cancelled === false) {
                                    throw new Error("Stock is not canceled");
                                }
                                expect(order.cancelled).toEqual(true);
                                return [2 /*return*/, order];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitOrderCancel = awaitOrderCancel;
function awaitForItemSupply(sdk, itemId, supply) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var item, itemSupply, requireSupply;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.item.getItemById({
                                    itemId: itemId,
                                })];
                            case 1:
                                item = _a.sent();
                                itemSupply = item.supply.toString();
                                requireSupply = supply.toString();
                                if (itemSupply !== requireSupply) {
                                    throw new Error("Expected supply ".concat(requireSupply, ", but current supply ").concat(itemSupply));
                                }
                                return [2 /*return*/, itemSupply];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitForItemSupply = awaitForItemSupply;
function awaitForOwnership(sdk, itemId, receipent) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var ownership;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipById({
                                    ownershipId: "".concat(itemId, ":").concat(receipent),
                                })];
                            case 1:
                                ownership = _a.sent();
                                expect(ownership.owner.slice(ownership.owner.indexOf(":") + 1)).toEqual(receipent);
                                return [2 /*return*/, ownership];
                        }
                    });
                }); })];
        });
    });
}
exports.awaitForOwnership = awaitForOwnership;
/**
 * Get Collection by Id
 */
function getCollection(sdk, collectionId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collection;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                                        collection: collectionId,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    collection = _a.sent();
                    expect(collection).not.toBe(null);
                    return [2 /*return*/, collection];
            }
        });
    });
}
exports.getCollection = getCollection;
