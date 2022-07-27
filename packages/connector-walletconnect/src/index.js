"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnectConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "walletconnect";
var WalletConnectConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(WalletConnectConnectionProvider, _super);
    function WalletConnectConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return instance.disconnect(); };
            return (0, connector_1.connectToWeb3)(instance, { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    WalletConnectConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var WalletConnectProvider, provider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@walletconnect/web3-provider")); })];
                    case 1:
                        WalletConnectProvider = (_a.sent()).default;
                        provider = new WalletConnectProvider(this.config);
                        return [4 /*yield*/, provider.enable()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, provider];
                }
            });
        });
    };
    WalletConnectConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    WalletConnectConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    WalletConnectConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    WalletConnectConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    WalletConnectConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sdk;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        sdk = _a.sent();
                        return [2 /*return*/, !!(sdk === null || sdk === void 0 ? void 0 : sdk.connected)];
                }
            });
        });
    };
    return WalletConnectConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.WalletConnectConnectionProvider = WalletConnectConnectionProvider;
