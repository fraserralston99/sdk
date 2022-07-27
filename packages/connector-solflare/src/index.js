"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolflareConnectionProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var sdk_1 = tslib_1.__importDefault(require("@solflare-wallet/sdk"));
tslib_1.__exportStar(require("./domain"), exports);
var PROVIDER_ID = "solflare";
var SolflareConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(SolflareConnectionProvider, _super);
    function SolflareConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.init();
        return _this;
    }
    SolflareConnectionProvider.prototype.init = function () {
        var _this = this;
        this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        this.connection = this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnected = function () {
                return instance.disconnect();
            };
            return _this.toConnectState(instance, disconnected);
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
    };
    SolflareConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wallet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wallet = new sdk_1.default(this.config);
                        return [4 /*yield*/, wallet.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, wallet];
                }
            });
        });
    };
    SolflareConnectionProvider.prototype.getConnectedStatus = function (provider) {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            subscriber.next("connected");
            var connectHandler = function () {
                subscriber.next("connected");
            };
            var disconnectHandler = function () {
                _this.init();
                subscriber.next("disconnected");
            };
            provider.on("connect", connectHandler);
            provider.on("disconnect", disconnectHandler);
            subscriber.add(function () {
                provider.removeListener("connect", connectHandler);
                provider.removeListener("disconnect", disconnectHandler);
            });
        });
    };
    SolflareConnectionProvider.prototype.getAddress = function (provider) {
        return new rxjs_1.Observable(function (subscriber) {
            var _a;
            subscriber.next((_a = provider.publicKey) === null || _a === void 0 ? void 0 : _a.toString());
            /*provider.on("accountChanged", async (publicKey: PublicKey) => {
                if (publicKey) {
                    subscriber.next(publicKey.toString())
                } else {
                    await provider.connect()
                    subscriber.next(provider.publicKey?.toString())
                }
            })*/
        });
    };
    SolflareConnectionProvider.prototype.toConnectState = function (provider, disconnect) {
        return (0, rxjs_1.combineLatest)([
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
                    signTransaction: provider.signTransaction.bind(provider),
                    signAllTransactions: provider.signAllTransactions.bind(provider),
                    signMessage: provider.signMessage.bind(provider),
                };
                return (0, connector_1.getStateConnected)({
                    connection: wallet,
                    disconnect: disconnect,
                });
            }
            else {
                return (0, connector_1.getStateDisconnected)();
            }
        }));
    };
    SolflareConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    SolflareConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    SolflareConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    SolflareConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    SolflareConnectionProvider.prototype.isConnected = function () {
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
    return SolflareConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.SolflareConnectionProvider = SolflareConnectionProvider;
