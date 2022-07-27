"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortisConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "portis";
var PortisConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(PortisConnectionProvider, _super);
    function PortisConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return instance.logout().then(connector_1.noop); };
            return (0, connector_1.connectToWeb3)(instance.provider, { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    PortisConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Portis;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@portis/web3")); })];
                    case 1:
                        Portis = (_a.sent()).default;
                        return [2 /*return*/, new Portis(this.config.appId, this.config.network)];
                }
            });
        });
    };
    PortisConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    PortisConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    PortisConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    PortisConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    PortisConnectionProvider.prototype.isConnected = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sdk, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        sdk = _c.sent();
                        _b = true;
                        return [4 /*yield*/, (sdk === null || sdk === void 0 ? void 0 : sdk.isLoggedIn())];
                    case 2: return [2 /*return*/, _b === ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.result)];
                }
            });
        });
    };
    return PortisConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.PortisConnectionProvider = PortisConnectionProvider;
