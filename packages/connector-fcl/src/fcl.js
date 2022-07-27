"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FclConnectionProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "fcl";
var FclConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(FclConnectionProvider, _super);
    function FclConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) { return _this.toConnectState(instance); }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    FclConnectionProvider.prototype.toConnectState = function (fcl) {
        var disconnect = function () { return fcl.unauthenticate(); };
        return (0, rxjs_1.defer)(function () { return fcl.currentUser().authenticate(); }).pipe((0, operators_1.map)(function (auth) {
            var address = auth.addr;
            if (!address) {
                return (0, connector_1.getStateDisconnected)();
            }
            return (0, connector_1.getStateConnected)({
                connection: { fcl: fcl, address: address },
                disconnect: disconnect,
            });
        }));
    };
    FclConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    FclConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    FclConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fcl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@onflow/fcl")); })];
                    case 1:
                        fcl = _a.sent();
                        fcl
                            .config()
                            .put("accessNode.api", this.config.accessNode)
                            .put("discovery.wallet", this.config.walletDiscovery)
                            .put("env", this.config.network)
                            .put("app.detail.title", this.config.applicationTitle)
                            .put("app.detail.icon", this.config.applicationIcon);
                        return [2 /*return*/, fcl];
                }
            });
        });
    };
    FclConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    FclConnectionProvider.prototype.isAutoConnected = function () {
        return Promise.resolve(false);
    };
    FclConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        instance = _a.sent();
                        return [2 /*return*/, !!(instance === null || instance === void 0 ? void 0 : instance.currentUser())];
                }
            });
        });
    };
    return FclConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.FclConnectionProvider = FclConnectionProvider;
