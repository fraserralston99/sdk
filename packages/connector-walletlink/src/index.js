"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletLinkConnectionProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "walletlink";
var WalletLinkConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(WalletLinkConnectionProvider, _super);
    function WalletLinkConnectionProvider(config, walletLinkOptions) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.walletLinkOptions = walletLinkOptions;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = (0, rxjs_1.defer)(function () { return _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, instance.walletLink.disconnect()];
            }); }); };
            return (0, connector_1.connectToWeb3)(instance.walletLinkWeb3Provider, { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID }))); });
        return _this;
    }
    WalletLinkConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var WalletLink, walletLink, walletLinkWeb3Provider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("walletlink")); })];
                    case 1:
                        WalletLink = (_a.sent()).default;
                        walletLink = new WalletLink(this.walletLinkOptions);
                        walletLinkWeb3Provider = walletLink.makeWeb3Provider(this.config.url, this.config.networkId);
                        return [4 /*yield*/, walletLinkWeb3Provider.enable()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { walletLink: walletLink, walletLinkWeb3Provider: walletLinkWeb3Provider }];
                }
            });
        });
    };
    WalletLinkConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    WalletLinkConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    WalletLinkConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    WalletLinkConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    WalletLinkConnectionProvider.prototype.isConnected = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1: return [2 /*return*/, !!((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.walletLinkWeb3Provider.isConnected())];
                }
            });
        });
    };
    return WalletLinkConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.WalletLinkConnectionProvider = WalletLinkConnectionProvider;
