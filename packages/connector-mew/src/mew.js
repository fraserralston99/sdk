"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEWConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "mew";
var MEWConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(MEWConnectionProvider, _super);
    function MEWConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return instance.disconnect(); };
            return (0, connector_1.connectToWeb3)(instance.makeWeb3Provider(), { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    MEWConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var MEWConnect, provider;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@myetherwallet/mewconnect-web-client")); })];
                    case 1:
                        MEWConnect = (_a.sent()).default;
                        provider = new MEWConnect.Provider({
                            chainId: this.config.networkId,
                            rpcUrl: this.config.rpcUrl,
                            noUrlCheck: true,
                            windowClosedError: true,
                        });
                        return [4 /*yield*/, provider.enable()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, provider];
                }
            });
        });
    };
    MEWConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    MEWConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    MEWConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    MEWConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    MEWConnectionProvider.prototype.isConnected = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        instance = _b.sent();
                        return [2 /*return*/, !!((_a = instance === null || instance === void 0 ? void 0 : instance.Provider) === null || _a === void 0 ? void 0 : _a.isConnected)];
                }
            });
        });
    };
    return MEWConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.MEWConnectionProvider = MEWConnectionProvider;
