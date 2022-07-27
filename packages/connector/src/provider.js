"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedConnectionProvider = exports.MappedOptionConnectionProvider = exports.AbstractConnectionProvider = void 0;
var tslib_1 = require("tslib");
var operators_1 = require("rxjs/operators");
var connection_state_1 = require("./connection-state");
var AbstractConnectionProvider = /** @class */ (function () {
    function AbstractConnectionProvider() {
    }
    AbstractConnectionProvider.prototype.map = function (mapper) {
        return new MappedConnectionProvider(this, mapper);
    };
    AbstractConnectionProvider.prototype.mapOption = function (mapper) {
        return new MappedOptionConnectionProvider(this, mapper);
    };
    return AbstractConnectionProvider;
}());
exports.AbstractConnectionProvider = AbstractConnectionProvider;
var MappedOptionConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(MappedOptionConnectionProvider, _super);
    function MappedOptionConnectionProvider(source, mapper) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.mapper = mapper;
        return _this;
    }
    MappedOptionConnectionProvider.prototype.getId = function () {
        return this.source.getId();
    };
    MappedOptionConnectionProvider.prototype.getConnection = function () {
        return this.source.getConnection();
    };
    MappedOptionConnectionProvider.prototype.isAutoConnected = function () {
        return this.source.isAutoConnected();
    };
    MappedOptionConnectionProvider.prototype.getOption = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sourceOption;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.source.getOption()];
                    case 1:
                        sourceOption = _a.sent();
                        return [2 /*return*/, sourceOption ? this.mapper(sourceOption) : undefined];
                }
            });
        });
    };
    MappedOptionConnectionProvider.prototype.isConnected = function () {
        return this.source.isConnected();
    };
    return MappedOptionConnectionProvider;
}(AbstractConnectionProvider));
exports.MappedOptionConnectionProvider = MappedOptionConnectionProvider;
var MappedConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(MappedConnectionProvider, _super);
    function MappedConnectionProvider(source, mapper) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.mapper = mapper;
        return _this;
    }
    MappedConnectionProvider.prototype.getId = function () {
        return this.source.getId();
    };
    MappedConnectionProvider.prototype.getConnection = function () {
        var _this = this;
        return this.source.getConnection().pipe((0, operators_1.switchMap)(function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var connection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(state.status === "connected")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mapper(state.connection)];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, (0, connection_state_1.getStateConnected)({
                                connection: connection,
                                disconnect: state.disconnect,
                            })];
                    case 2: return [2 /*return*/, state];
                }
            });
        }); }));
    };
    MappedConnectionProvider.prototype.isAutoConnected = function () {
        return this.source.isAutoConnected();
    };
    MappedConnectionProvider.prototype.getOption = function () {
        return this.source.getOption();
    };
    MappedConnectionProvider.prototype.isConnected = function () {
        return this.source.isConnected();
    };
    return MappedConnectionProvider;
}(AbstractConnectionProvider));
exports.MappedConnectionProvider = MappedConnectionProvider;
