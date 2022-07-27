"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhantomConnectionProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var rxjs_2 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var connector_2 = require("@rarible/connector");
var utils_1 = require("./utils");
tslib_1.__exportStar(require("./domain"), exports);
var PROVIDER_ID = "phantom";
var PhantomConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(PhantomConnectionProvider, _super);
    function PhantomConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) { return _this.toConnectState(instance); }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    PhantomConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, anyWindow, provider;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, utils_1.waitUntil)(function () { return "solana" in window; }, 100, 1000)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        if (!("solana" in window)) return [3 /*break*/, 5];
                        anyWindow = window;
                        provider = anyWindow.solana;
                        if (!provider.isPhantom) return [3 /*break*/, 5];
                        return [4 /*yield*/, provider.connect(this.config)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, provider];
                    case 5: throw new Error("No solana provider found");
                }
            });
        });
    };
    PhantomConnectionProvider.prototype.getConnectedStatus = function (provider) {
        return new rxjs_1.Observable(function (subscriber) {
            subscriber.next("connected");
            function connectHandler() {
                subscriber.next("connected");
            }
            function disconnectHandler() {
                subscriber.next("disconnected");
            }
            provider.on("connect", connectHandler);
            provider.on("disconnect", disconnectHandler);
            subscriber.add(function () {
                provider.removeListener("connect", connectHandler);
                provider.removeListener("disconnect", disconnectHandler);
            });
        });
    };
    PhantomConnectionProvider.prototype.getAddress = function (provider) {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            var _a;
            subscriber.next((_a = provider.publicKey) === null || _a === void 0 ? void 0 : _a.toString());
            provider.on("accountChanged", function (publicKey /*PublicKey*/) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!publicKey) return [3 /*break*/, 1];
                            subscriber.next(publicKey.toString());
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, provider.connect()];
                        case 2:
                            _b.sent();
                            subscriber.next((_a = provider.publicKey) === null || _a === void 0 ? void 0 : _a.toString());
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    PhantomConnectionProvider.prototype.toConnectState = function (provider) {
        return (0, rxjs_2.combineLatest)([
            this.getAddress(provider),
            this.getConnectedStatus(provider),
        ]).pipe((0, operators_1.distinctUntilChanged)(function (c1, c2) {
            return c1[0] === c2[0] && c1[1] === c2[1];
        }), (0, operators_1.map)(function (_a) {
            var _b = tslib_1.__read(_a, 2), address = _b[0], status = _b[1];
            if (status === "connected" && address && provider.publicKey) {
                var wallet = {
                    address: address,
                    publicKey: provider.publicKey,
                    signTransaction: provider.signTransaction,
                    signAllTransactions: provider.signAllTransactions,
                    signMessage: provider.signMessage,
                };
                return (0, connector_2.getStateConnected)({ connection: wallet });
            }
            else {
                return (0, connector_2.getStateDisconnected)();
            }
        }));
    };
    PhantomConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    PhantomConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    PhantomConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    PhantomConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    PhantomConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        instance = _a.sent();
                        return [2 /*return*/, !!(instance === null || instance === void 0 ? void 0 : instance.isConnected)];
                }
            });
        });
    };
    return PhantomConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.PhantomConnectionProvider = PhantomConnectionProvider;
