"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connector = exports.DefaultConnectionStateProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connection_state_1 = require("./connection-state");
var DefaultConnectionStateProvider = /** @class */ (function () {
    function DefaultConnectionStateProvider(key) {
        this.key = key;
    }
    DefaultConnectionStateProvider.prototype.getValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value;
            return tslib_1.__generator(this, function (_a) {
                value = localStorage.getItem(this.key);
                return [2 /*return*/, value !== null ? value : undefined];
            });
        });
    };
    DefaultConnectionStateProvider.prototype.setValue = function (value) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (value === undefined) {
                    localStorage.removeItem(this.key);
                }
                else {
                    localStorage.setItem(this.key, value);
                }
                return [2 /*return*/];
            });
        });
    };
    return DefaultConnectionStateProvider;
}());
exports.DefaultConnectionStateProvider = DefaultConnectionStateProvider;
var Connector = /** @class */ (function () {
    function Connector(providers, stateProvider) {
        var _this = this;
        this.providers = providers;
        this.stateProvider = stateProvider;
        this.provider = new rxjs_1.BehaviorSubject(undefined);
        Connector.initPageUnloadProtection();
        this.add = this.add.bind(this);
        this.connect = this.connect.bind(this);
        this.connection = (0, rxjs_1.concat)((0, rxjs_1.of)(connection_state_1.STATE_INITIALIZING), (0, rxjs_1.defer)(function () { return _this.checkAutoConnect(); }), this.provider.pipe((0, operators_1.distinctUntilChanged)(), (0, operators_1.switchMap)(function (provider) {
            if (provider) {
                return (0, rxjs_1.concat)(provider.getConnection(), rxjs_1.NEVER).pipe((0, operators_1.catchError)(function (error) { return (0, rxjs_1.concat)((0, rxjs_1.of)((0, connection_state_1.getStateDisconnected)({ error: error })), rxjs_1.NEVER); }));
            }
            else {
                return (0, rxjs_1.concat)((0, rxjs_1.of)((0, connection_state_1.getStateDisconnected)()), rxjs_1.NEVER);
            }
        }))).pipe((0, operators_1.distinctUntilChanged)(function (c1, c2) {
            if (Connector.pageUnloading)
                return true;
            if (c1 === c2)
                return true;
            if (c1.status === "connected" && c2.status === "connected") {
                return c1.connection === c2.connection;
            }
            else if (c1.status === "connecting" && c2.status === "connecting") {
                return c1.providerId === c2.providerId;
            }
            return c1.status === c2.status;
        }), (0, operators_1.shareReplay)(1), (0, operators_1.map)(function (conn) {
            if (conn.status === "connected") {
                return tslib_1.__assign(tslib_1.__assign({}, conn), { disconnect: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var e_1;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(conn.disconnect !== undefined)) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, conn.disconnect()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.warn("caught on disconnect", e_1);
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.provider.next(undefined);
                                    return [2 /*return*/];
                            }
                        });
                    }); } });
            }
            else {
                return conn;
            }
        }), (0, operators_1.tap)(function (conn) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var current;
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(conn.status === "disconnected" && !Connector.pageUnloading)) return [3 /*break*/, 2];
                        this.provider.next(undefined);
                        return [4 /*yield*/, ((_a = this.stateProvider) === null || _a === void 0 ? void 0 : _a.getValue())];
                    case 1:
                        current = _c.sent();
                        if (current !== undefined) {
                            (_b = this.stateProvider) === null || _b === void 0 ? void 0 : _b.setValue(undefined);
                        }
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }));
    }
    /**
     * Add flag when page unload to avoid disconnect events from connectors
     */
    Connector.initPageUnloadProtection = function () {
        if (Connector.pageUnloading === undefined && typeof window !== "undefined") {
            window.addEventListener("beforeunload", function () {
                Connector.pageUnloading = true;
            });
            Connector.pageUnloading = false;
        }
    };
    /**
     * Push {@link provider} to connectors list
     * @param provider connection provider
     */
    Connector.prototype.add = function (provider) {
        return new Connector(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(this.providers), false), [provider], false), this.stateProvider);
    };
    /**
     * Create connector instance and push {@link provider} to connectors list
     * @param provider connection provider
     * @param stateProvider provider used to save/load last connected provider
     */
    Connector.create = function (provider, stateProvider) {
        if (Array.isArray(provider)) {
            return new Connector(provider, stateProvider);
        }
        return new Connector([provider], stateProvider);
    };
    Connector.prototype.checkAutoConnect = function () {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, promises_1, promises_1_1, _d, provider, autoConnected, value, e_2_1, selected, _e, _f, provider, e_3_1, err_1;
            var e_2, _g, e_3, _h;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 18, , 19]);
                        promises = this.providers.map(function (it) { return ({ provider: it, autoConnected: it.isAutoConnected() }); });
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 6, 7, 8]);
                        promises_1 = tslib_1.__values(promises), promises_1_1 = promises_1.next();
                        _j.label = 2;
                    case 2:
                        if (!!promises_1_1.done) return [3 /*break*/, 5];
                        _d = promises_1_1.value, provider = _d.provider, autoConnected = _d.autoConnected;
                        return [4 /*yield*/, autoConnected];
                    case 3:
                        value = _j.sent();
                        if (value) {
                            this.provider.next(provider);
                            (_a = this.stateProvider) === null || _a === void 0 ? void 0 : _a.setValue(provider.getId());
                            return [2 /*return*/, (0, connection_state_1.getStateConnecting)({ providerId: provider.getId() })];
                        }
                        _j.label = 4;
                    case 4:
                        promises_1_1 = promises_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (promises_1_1 && !promises_1_1.done && (_g = promises_1.return)) _g.call(promises_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 8: return [4 /*yield*/, ((_b = this.stateProvider) === null || _b === void 0 ? void 0 : _b.getValue())];
                    case 9:
                        selected = _j.sent();
                        if (!(selected !== undefined)) return [3 /*break*/, 17];
                        _j.label = 10;
                    case 10:
                        _j.trys.push([10, 15, 16, 17]);
                        _e = tslib_1.__values(this.providers), _f = _e.next();
                        _j.label = 11;
                    case 11:
                        if (!!_f.done) return [3 /*break*/, 14];
                        provider = _f.value;
                        if (!(selected === provider.getId())) return [3 /*break*/, 13];
                        return [4 /*yield*/, provider.isConnected()];
                    case 12:
                        if (_j.sent()) {
                            this.provider.next(provider);
                            return [2 /*return*/, (0, connection_state_1.getStateConnecting)({ providerId: provider.getId() })];
                        }
                        else {
                            (_c = this.stateProvider) === null || _c === void 0 ? void 0 : _c.setValue(undefined);
                            return [2 /*return*/, (0, connection_state_1.getStateDisconnected)()];
                        }
                        _j.label = 13;
                    case 13:
                        _f = _e.next();
                        return [3 /*break*/, 11];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_3_1 = _j.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_f && !_f.done && (_h = _e.return)) _h.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        err_1 = _j.sent();
                        return [2 /*return*/, (0, connection_state_1.getStateDisconnected)({ error: err_1.toString() })];
                    case 19: return [2 /*return*/, (0, connection_state_1.getStateDisconnected)()];
                }
            });
        });
    };
    Connector.prototype.getOptions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, _a, _b, pair, provider, option, opt, e_4_1;
            var e_4, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        result = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = tslib_1.__values(this.providers.map(function (it) { return ({ provider: it, option: it.getOption() }); })), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        pair = _b.value;
                        provider = pair.provider, option = pair.option;
                        return [4 /*yield*/, option];
                    case 3:
                        opt = _d.sent();
                        if (opt) {
                            result.push({ provider: provider, option: opt });
                        }
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    Connector.prototype.connect = function (option) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var connected, connectionState;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connected = this.provider.value;
                        return [4 /*yield*/, this.connection.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        connectionState = _b.sent();
                        if (connected !== undefined && (connectionState === null || connectionState === void 0 ? void 0 : connectionState.status) === "connected") {
                            throw new Error("Provider ".concat(JSON.stringify(connected), " already connected"));
                        }
                        this.provider.next(option.provider);
                        (_a = this.stateProvider) === null || _a === void 0 ? void 0 : _a.setValue(option.provider.getId());
                        return [2 /*return*/];
                }
            });
        });
    };
    return Connector;
}());
exports.Connector = Connector;
