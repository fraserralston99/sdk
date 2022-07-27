"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyItemsContainsItem = exports.verifyItemsByBlockchain = exports.checkItemRestrictionRaw = exports.checkItemRestriction = exports.getItemRoyaltiesByIdRaw = exports.getItemRoyaltiesById = exports.getItemsByOwnerRaw = exports.getItemsByOwner = exports.getItemsByCreatorRaw = exports.getItemsByCreator = exports.getItemsByCollectionRaw = exports.getItemsByCollection = exports.getAllItemsRaw = exports.getAllItems = exports.getItemByIdRaw = exports.awaitForItemSupply = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
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
function getItemByIdRaw(sdk, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var item;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemByIdRaw({
                                        itemId: itemId,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    item = _a.sent();
                    expect(item).not.toBe(null);
                    return [2 /*return*/, item];
            }
        });
    });
}
exports.getItemByIdRaw = getItemByIdRaw;
function getAllItems(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getAllItems({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getAllItems = getAllItems;
function getAllItemsRaw(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getAllItemsRaw({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getAllItemsRaw = getAllItemsRaw;
function getItemsByCollection(sdk, collection, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByCollection({
                                        collection: collection,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByCollection = getItemsByCollection;
function getItemsByCollectionRaw(sdk, collection, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByCollectionRaw({
                                        collection: collection,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByCollectionRaw = getItemsByCollectionRaw;
function getItemsByCreator(sdk, creator, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByCreator({
                                        creator: creator,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByCreator = getItemsByCreator;
function getItemsByCreatorRaw(sdk, creator, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByCreatorRaw({
                                        creator: creator,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByCreatorRaw = getItemsByCreatorRaw;
function getItemsByOwner(sdk, owner, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByOwner({
                                        owner: owner,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByOwner = getItemsByOwner;
function getItemsByOwnerRaw(sdk, owner, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var items;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.item.getItemsByOwnerRaw({
                                        owner: owner,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    items = _a.sent();
                    expect(items).not.toBe(null);
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getItemsByOwnerRaw = getItemsByOwnerRaw;
function getItemRoyaltiesById(sdk, contract, tokenId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, royalties;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.item.getItemRoyaltiesById({
                                            itemId: itemId,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    royalties = _a.sent();
                    expect(royalties).not.toBe(null);
                    return [2 /*return*/, royalties];
            }
        });
    });
}
exports.getItemRoyaltiesById = getItemRoyaltiesById;
function getItemRoyaltiesByIdRaw(sdk, contract, tokenId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, royalties;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.item.getItemRoyaltiesByIdRaw({
                                            itemId: itemId,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    royalties = _a.sent();
                    expect(royalties).not.toBe(null);
                    return [2 /*return*/, royalties];
            }
        });
    });
}
exports.getItemRoyaltiesByIdRaw = getItemRoyaltiesByIdRaw;
function checkItemRestriction(sdk, contract, tokenId, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, restrictionCheckResult;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.item.checkItemRestriction({
                                            itemId: itemId,
                                            restrictionCheckForm: {
                                                "@type": "OWNERSHIP",
                                                user: user,
                                            },
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    restrictionCheckResult = _a.sent();
                    expect(restrictionCheckResult).not.toBe(null);
                    return [2 /*return*/, restrictionCheckResult];
            }
        });
    });
}
exports.checkItemRestriction = checkItemRestriction;
function checkItemRestrictionRaw(sdk, contract, tokenId, user) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, restrictionCheckResult;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.item.checkItemRestrictionRaw({
                                            itemId: itemId,
                                            restrictionCheckForm: {
                                                "@type": "OWNERSHIP",
                                                user: user,
                                            },
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    restrictionCheckResult = _a.sent();
                    expect(restrictionCheckResult).not.toBe(null);
                    return [2 /*return*/, restrictionCheckResult];
            }
        });
    });
}
exports.checkItemRestrictionRaw = checkItemRestrictionRaw;
function verifyItemsByBlockchain(items, blockchain) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            items.items.forEach(function (i) {
                expect(i.blockchain).toEqual(blockchain);
            });
            return [2 /*return*/];
        });
    });
}
exports.verifyItemsByBlockchain = verifyItemsByBlockchain;
function verifyItemsContainsItem(items, itemId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ids;
        return tslib_1.__generator(this, function (_a) {
            ids = items.items.map(function (c) { return c.id; });
            expect(ids).toContain(itemId);
            return [2 /*return*/];
        });
    });
}
exports.verifyItemsContainsItem = verifyItemsContainsItem;
