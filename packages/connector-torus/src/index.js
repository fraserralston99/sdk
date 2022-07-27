"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorusConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "torus";
var TorusConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(TorusConnectionProvider, _super);
    function TorusConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return instance.cleanUp(); };
            return (0, connector_1.connectToWeb3)(instance.provider, { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    TorusConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Torus, torus;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@toruslabs/torus-embed")); })];
                    case 1:
                        Torus = (_a.sent()).default;
                        torus = new Torus();
                        return [4 /*yield*/, torus.init(this.config)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, torus.login()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, torus];
                }
            });
        });
    };
    TorusConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    TorusConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    TorusConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    TorusConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    TorusConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sdk;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        sdk = _a.sent();
                        return [2 /*return*/, !!((sdk === null || sdk === void 0 ? void 0 : sdk.isInitialized) && (sdk === null || sdk === void 0 ? void 0 : sdk.isLoggedIn))];
                }
            });
        });
    };
    return TorusConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.TorusConnectionProvider = TorusConnectionProvider;
