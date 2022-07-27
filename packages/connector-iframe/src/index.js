"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "iframe";
var IframeConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(IframeConnectionProvider, _super);
    function IframeConnectionProvider() {
        var _this = _super.call(this) || this;
        _this.instance = (0, connector_1.cache)(function () { return connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (instance) { return (0, connector_1.connectToWeb3)(instance); }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    IframeConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    IframeConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    IframeConnectionProvider.prototype.getOption = function () {
        return Promise.resolve(PROVIDER_ID);
    };
    IframeConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    IframeConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, true];
            });
        });
    };
    return IframeConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.IframeConnectionProvider = IframeConnectionProvider;
function connect() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var IFrameEthereumProvider;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@ledgerhq/iframe-provider")); })];
                case 1:
                    IFrameEthereumProvider = (_a.sent()).IFrameEthereumProvider;
                    return [2 /*return*/, new IFrameEthereumProvider()];
            }
        });
    });
}
