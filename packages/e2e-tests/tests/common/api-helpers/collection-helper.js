"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCollectionsOwner = exports.verifyCollectionsContainsCollection = exports.verifyCollectionsByBlockchain = exports.getCollectionsByOwnerRaw = exports.getCollectionsByOwner = exports.getAllCollectionsRaw = exports.getAllCollections = exports.getCollectionByIdRaw = exports.getCollectionById = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
function getCollectionById(sdk, collectionId) {
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
exports.getCollectionById = getCollectionById;
function getCollectionByIdRaw(sdk, collectionId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collection;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getCollectionByIdRaw({
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
exports.getCollectionByIdRaw = getCollectionByIdRaw;
function getAllCollections(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collections;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getAllCollections({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    collections = _a.sent();
                    expect(collections).not.toBe(null);
                    return [2 /*return*/, collections];
            }
        });
    });
}
exports.getAllCollections = getAllCollections;
function getAllCollectionsRaw(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collections;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getAllCollectionsRaw({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    collections = _a.sent();
                    expect(collections).not.toBe(null);
                    return [2 /*return*/, collections];
            }
        });
    });
}
exports.getAllCollectionsRaw = getAllCollectionsRaw;
function getCollectionsByOwner(sdk, owner, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collections;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getCollectionsByOwner({
                                        owner: owner,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    collections = _a.sent();
                    expect(collections).not.toBe(null);
                    return [2 /*return*/, collections];
            }
        });
    });
}
exports.getCollectionsByOwner = getCollectionsByOwner;
function getCollectionsByOwnerRaw(sdk, owner, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var collections;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(15, 3000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.collection.getCollectionsByOwnerRaw({
                                        owner: owner,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    collections = _a.sent();
                    expect(collections).not.toBe(null);
                    return [2 /*return*/, collections];
            }
        });
    });
}
exports.getCollectionsByOwnerRaw = getCollectionsByOwnerRaw;
function verifyCollectionsByBlockchain(collections, blockchain) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            collections.collections.forEach(function (c) {
                expect(c.blockchain).toEqual(blockchain);
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyCollectionsByBlockchain = verifyCollectionsByBlockchain;
function verifyCollectionsContainsCollection(collections, collectionId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            expect(collections.collections.map(function (c) { return c.id.toLowerCase(); })).toContain(collectionId.toLowerCase());
            return [2 /*return*/];
        });
    });
}
exports.verifyCollectionsContainsCollection = verifyCollectionsContainsCollection;
function verifyCollectionsOwner(collections, owner) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            collections.collections.forEach(function (c) {
                expect(c.owner).toEqual(owner);
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyCollectionsOwner = verifyCollectionsOwner;
