"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellOrdersByMakerRaw = exports.getSellOrdersByMaker = exports.getSellOrdersByItemRaw = exports.getSellOrdersByItem = exports.getSellOrdersRaw = exports.getSellOrders = exports.getOrdersByIdsRaw = exports.getOrdersByIds = exports.getOrdersAllRaw = exports.getOrdersAll = exports.getOrderBidsByItemRaw = exports.getOrderBidsByItem = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
function getOrderBidsByItem(sdk, contract, tokenId, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderBidsByItem({
                                            itemId: itemId,
                                            size: size,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrderBidsByItem = getOrderBidsByItem;
function getOrderBidsByItemRaw(sdk, contract, tokenId, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getOrderBidsByItemRaw({
                                            itemId: itemId,
                                            size: size,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrderBidsByItemRaw = getOrderBidsByItemRaw;
function getOrdersAll(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getOrdersAll({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrdersAll = getOrdersAll;
function getOrdersAllRaw(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getOrdersAllRaw({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrdersAllRaw = getOrdersAllRaw;
function getOrdersByIds(sdk, orderId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getOrdersByIds({
                                        orderIds: {
                                            ids: [orderId],
                                        },
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrdersByIds = getOrdersByIds;
function getOrdersByIdsRaw(sdk, orderId) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getOrdersByIdsRaw({
                                        orderIds: {
                                            ids: [orderId],
                                        },
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getOrdersByIdsRaw = getOrdersByIdsRaw;
function getSellOrders(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getSellOrders({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrders = getSellOrders;
function getSellOrdersRaw(sdk, blockchains, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getSellOrdersRaw({
                                        blockchains: blockchains,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrdersRaw = getSellOrdersRaw;
function getSellOrdersByItem(sdk, contract, tokenId, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getSellOrdersByItem({
                                            itemId: itemId,
                                            size: size,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrdersByItem = getSellOrdersByItem;
function getSellOrdersByItemRaw(sdk, contract, tokenId, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var itemId, orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = "".concat(contract, ":").concat(tokenId);
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.apis.order.getSellOrdersByItemRaw({
                                            itemId: itemId,
                                            size: size,
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrdersByItemRaw = getSellOrdersByItemRaw;
function getSellOrdersByMaker(sdk, maker, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getSellOrdersByMaker({
                                        maker: maker,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrdersByMaker = getSellOrdersByMaker;
function getSellOrdersByMakerRaw(sdk, maker, size) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var orders;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getSellOrdersByMakerRaw({
                                        maker: maker,
                                        size: size,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    orders = _a.sent();
                    expect(orders).not.toBe(null);
                    return [2 /*return*/, orders];
            }
        });
    });
}
exports.getSellOrdersByMakerRaw = getSellOrdersByMakerRaw;
