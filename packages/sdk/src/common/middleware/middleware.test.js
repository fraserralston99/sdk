"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var middleware_1 = require("./middleware");
function getMiddleware(name, checks) {
    var _this = this;
    return function (callable, args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            checks.push(name + "_1");
            checks.push(name + "_args_[" + args.toString() + "]"); // use original arguments
            return [2 /*return*/, [callable, function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c;
                        return tslib_1.__generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = checks).push;
                                    _c = name + "_";
                                    return [4 /*yield*/, response];
                                case 1:
                                    _b.apply(_a, [_c + (_d.sent())]); // use original function result
                                    checks.push(name + "_4");
                                    return [2 /*return*/, response];
                            }
                        });
                    }); }]];
        });
    }); };
}
describe("SDK Middleware", function () {
    var middlewarer;
    var handler = jest.fn(function (a, b) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, a];
            case 1: return [2 /*return*/, (_a.sent()) + b];
        }
    }); }); });
    var checks;
    beforeEach(function () {
        middlewarer = new middleware_1.Middlewarer();
        handler = jest.fn(function (a, b) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, a];
                case 1: return [2 /*return*/, (_a.sent()) + b];
            }
        }); }); });
        checks = [];
    });
    test("Should use middleware", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(getMiddleware("mid", checks));
                    return [4 /*yield*/, middlewarer.call(handler, "2", "3")];
                case 1:
                    _a.sent();
                    expect(handler).toBeCalled();
                    expect(checks).toEqual(["mid_1", "mid_args_[2,3]", "mid_23", "mid_4"]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should wrap method", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wrappedHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(getMiddleware("mid", checks));
                    wrappedHandler = middlewarer.wrap(handler);
                    return [4 /*yield*/, wrappedHandler("2", "3")];
                case 1:
                    _a.sent();
                    expect(handler).toBeCalledTimes(1);
                    return [4 /*yield*/, wrappedHandler("20", "30")];
                case 2:
                    _a.sent();
                    expect(handler).toBeCalledTimes(2);
                    expect(checks).toEqual([
                        "mid_1", "mid_args_[2,3]", "mid_23", "mid_4",
                        "mid_1", "mid_args_[20,30]", "mid_2030", "mid_4", // second call
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should wrap object methods", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var obj, mock1, mock2, mock3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(getMiddleware("mid", checks));
                    obj = {
                        method1: jest.fn(function (a) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, "m1"];
                                case 1: return [2 /*return*/, (_a.sent()) + a];
                            }
                        }); }); }),
                        method2: jest.fn(function (a) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, "m2"];
                                case 1: return [2 /*return*/, (_a.sent()) + a];
                            }
                        }); }); }),
                        method3: jest.fn(function (a) { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, "m3"];
                                case 1: return [2 /*return*/, (_a.sent()) + a];
                            }
                        }); }); }),
                    };
                    mock1 = obj.method1;
                    mock2 = obj.method2;
                    mock3 = obj.method3;
                    middlewarer.wrapObjectMethods(obj, { namespace: "obj" });
                    return [4 /*yield*/, obj.method1("1")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, obj.method2("2")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, obj.method3("3")];
                case 3:
                    _a.sent();
                    expect(mock1).toBeCalled();
                    expect(mock2).toBeCalled();
                    expect(mock3).toBeCalled();
                    expect(checks).toEqual([
                        "mid_1", "mid_args_[1]", "mid_m11", "mid_4",
                        "mid_1", "mid_args_[2]", "mid_m22", "mid_4",
                        "mid_1", "mid_args_[3]", "mid_m33", "mid_4",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Middleware should wrap original method", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var handler, wrappedHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(function (callable, args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, [function () {
                                        checks.push("before call");
                                        var r = callable.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
                                        checks.push("after call");
                                        return r;
                                    }, function (response) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                        var _a, _b, _c;
                                        return tslib_1.__generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _b = (_a = checks).push;
                                                    _c = "response ";
                                                    return [4 /*yield*/, response];
                                                case 1:
                                                    _b.apply(_a, [_c + (_d.sent())]);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }]];
                        });
                    }); });
                    handler = jest.fn(function (a) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    checks.push("call");
                                    return [4 /*yield*/, a];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    wrappedHandler = middlewarer.wrap(handler);
                    return [4 /*yield*/, wrappedHandler("test")];
                case 1:
                    _a.sent();
                    expect(handler).toBeCalledTimes(1);
                    expect(checks).toEqual(["before call", "call", "after call", "response test"]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Middleware should change original arguments", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var handler, wrappedHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(function (callable, args) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            args[0] = "new1";
                            args[1] = "new2";
                            return [2 /*return*/, [callable, function (response) { return response; }]];
                        });
                    }); });
                    handler = jest.fn(function (a, b) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            checks.push(a);
                            checks.push(b);
                            return [2 /*return*/];
                        });
                    }); });
                    wrappedHandler = middlewarer.wrap(handler);
                    return [4 /*yield*/, wrappedHandler("old1", "old2")];
                case 1:
                    _a.sent();
                    expect(handler).toBeCalledTimes(1);
                    expect(checks).toEqual(["new1", "new2"]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Middleware should handle original method throw", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var handler, wrappedHandler;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    middlewarer.use(function (callable) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, [callable, function (response) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                        var e_1;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, 2, , 3]);
                                                    return [4 /*yield*/, response];
                                                case 1:
                                                    _a.sent();
                                                    return [3 /*break*/, 3];
                                                case 2:
                                                    e_1 = _a.sent();
                                                    checks.push(e_1);
                                                    return [3 /*break*/, 3];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); }]];
                        });
                    }); });
                    handler = jest.fn(function (a, b) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            throw a + b; // eslint-disable-line no-throw-literal
                        });
                    }); });
                    wrappedHandler = middlewarer.wrap(handler);
                    return [4 /*yield*/, wrappedHandler("1", "2")];
                case 1:
                    _a.sent();
                    expect(handler).toBeCalledTimes(1);
                    expect(checks).toEqual(["12"]);
                    return [2 /*return*/];
            }
        });
    }); });
});
