"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FortmaticConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "fortmatic";
var FortmaticConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(FortmaticConnectionProvider, _super);
    function FortmaticConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) {
            var disconnect = function () { return instance.user.logout(); };
            return (0, connector_1.connectToWeb3)(instance.getProvider(), { disconnect: disconnect });
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    FortmaticConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var Fortmatic;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("fortmatic")); })];
                    case 1:
                        Fortmatic = (_a.sent()).default;
                        return [2 /*return*/, new Fortmatic(this.config.apiKey)];
                }
            });
        });
    };
    FortmaticConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    FortmaticConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    FortmaticConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    FortmaticConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    FortmaticConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sdk;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        sdk = _a.sent();
                        return [4 /*yield*/, (sdk === null || sdk === void 0 ? void 0 : sdk.user.isLoggedIn())];
                    case 2: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    return FortmaticConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.FortmaticConnectionProvider = FortmaticConnectionProvider;
