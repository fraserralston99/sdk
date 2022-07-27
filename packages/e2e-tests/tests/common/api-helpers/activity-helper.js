"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllActivitiesRaw = exports.getAllActivities = exports.getActivitiesByUserRaw = exports.getActivitiesByUser = exports.getActivitiesByItemRaw = exports.getActivitiesByItem = exports.getActivitiesByCollectionRaw = exports.getActivitiesByCollection = void 0;
var tslib_1 = require("tslib");
var retry_1 = require("@rarible/sdk/src/common/retry");
var logger_1 = require("../logger");
function getActivitiesByCollection(sdk, collection, activityTypes) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByCollection({
                                        type: activityTypes,
                                        collection: [collection],
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getActivitiesByCollection = getActivitiesByCollection;
function getActivitiesByCollectionRaw(sdk, collection, activityTypes) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByCollectionRaw({
                                        type: activityTypes,
                                        collection: [collection],
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getActivitiesByCollectionRaw = getActivitiesByCollectionRaw;
function getActivitiesByItem(sdk, itemId, activityTypes, shouldPresent) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            logger_1.Logger.log("Get activities, activityTypes=" + activityTypes + " ,shouldPresent=" + shouldPresent);
            return [2 /*return*/, (0, retry_1.retry)(15, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var activities;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByItem({
                                    type: activityTypes,
                                    itemId: itemId,
                                })];
                            case 1:
                                activities = _a.sent();
                                expect(activities).not.toBe(null);
                                if (typeof shouldPresent !== "undefined") {
                                    logger_1.Logger.log(activities.activities);
                                    expect(activities.activities.map(function (a) { return a["@type"]; }).sort()).toEqual(shouldPresent.sort());
                                }
                                return [2 /*return*/, activities];
                        }
                    });
                }); })];
        });
    });
}
exports.getActivitiesByItem = getActivitiesByItem;
function getActivitiesByItemRaw(sdk, itemId, activityTypes) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByItemRaw({
                                        type: activityTypes,
                                        itemId: itemId,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getActivitiesByItemRaw = getActivitiesByItemRaw;
function getActivitiesByUser(sdk, user, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByUser({
                                        user: user,
                                        type: type,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getActivitiesByUser = getActivitiesByUser;
function getActivitiesByUserRaw(sdk, user, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getActivitiesByUserRaw({
                                        user: user,
                                        type: type,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getActivitiesByUserRaw = getActivitiesByUserRaw;
function getAllActivities(sdk, blockchains, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getAllActivities({
                                        blockchains: blockchains,
                                        type: type,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getAllActivities = getAllActivities;
function getAllActivitiesRaw(sdk, blockchains, type) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var activities;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.activity.getAllActivitiesRaw({
                                        blockchains: blockchains,
                                        type: type,
                                    })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
                case 1:
                    activities = _a.sent();
                    expect(activities).not.toBe(null);
                    return [2 /*return*/, activities];
            }
        });
    });
}
exports.getAllActivitiesRaw = getAllActivitiesRaw;
