"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnershipsByItemRaw = exports.getOwnershipsByItem = exports.getOwnershipByIdRaw = exports.awaitForOwnershipValue = exports.getOwnershipById = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
var logger_1 = require("../logger");
function getOwnershipById(sdk, blockchain, contractAddress, tokenId, targetAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownership;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipById({
                                        ownershipId: "".concat(blockchain, ":").concat(contractAddress, ":").concat(tokenId, ":").concat(targetAddress),
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    ownership = _a.sent();
                    expect(ownership).not.toBe(null);
                    return [2 /*return*/, ownership];
            }
        });
    });
}
exports.getOwnershipById = getOwnershipById;
function awaitForOwnershipValue(sdk, itemId, recipientAddress, value) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownershipId;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ownershipId = "".concat(itemId, ":").concat(recipientAddress);
                    logger_1.Logger.log("Await for ownershipId", ownershipId);
                    return [4 /*yield*/, (0, retry_1.retry)(15, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var ownership;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipById({
                                            ownershipId: ownershipId,
                                        })];
                                    case 1:
                                        ownership = _a.sent();
                                        expect(ownership).not.toBe(null);
                                        if (value) {
                                            expect(ownership.value).toBe(value);
                                        }
                                        return [2 /*return*/, ownership];
                                }
                            });
                        }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.awaitForOwnershipValue = awaitForOwnershipValue;
function getOwnershipByIdRaw(sdk, itemId, recipientAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownershipId, ownership;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ownershipId = "".concat(itemId, ":").concat(recipientAddress);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipByIdRaw({
                                            ownershipId: ownershipId,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    ownership = _a.sent();
                    expect(ownership.value).not.toBe(null);
                    logger_1.Logger.log(ownership.value);
                    return [2 /*return*/, ownership];
            }
        });
    });
}
exports.getOwnershipByIdRaw = getOwnershipByIdRaw;
function getOwnershipsByItem(sdk, contract, tokenId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownershipId, ownerships;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ownershipId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipsByItem({
                                            itemId: ownershipId,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    ownerships = _a.sent();
                    expect(ownerships).not.toBe(null);
                    return [2 /*return*/, ownerships];
            }
        });
    });
}
exports.getOwnershipsByItem = getOwnershipsByItem;
function getOwnershipsByItemRaw(sdk, contract, tokenId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownershipId, ownerships;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ownershipId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.ownership.getOwnershipsByItemRaw({
                                            itemId: ownershipId,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    ownerships = _a.sent();
                    expect(ownerships).not.toBe(null);
                    return [2 /*return*/, ownerships];
            }
        });
    });
}
exports.getOwnershipsByItemRaw = getOwnershipsByItemRaw;
