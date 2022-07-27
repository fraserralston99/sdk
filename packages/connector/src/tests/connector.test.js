"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var provider_1 = require("../provider");
var connector_1 = require("../connector");
var connection_state_1 = require("../connection-state");
describe("Connector", function () {
    test("should return options", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var connector, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connector = connector_1.Connector.create(test1).add(test2);
                    _a = expect;
                    return [4 /*yield*/, connector.getOptions()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toStrictEqual([
                        { provider: test1, option: "test1-op1" },
                        { provider: test2, option: "test2-op1" },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test("Connector can be created with some connectors", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var cp1, cp2, connector, options;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cp1 = test1;
                    cp2 = new provider_1.MappedConnectionProvider(test2, function (n) { return "".concat(n); });
                    connector = new connector_1.Connector([cp1, cp2]);
                    return [4 /*yield*/, connector.getOptions()];
                case 1:
                    options = _a.sent();
                    expect(options).toHaveLength(2);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("should not allow to connect if other connected", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var conn1, p1, conn2, p2, connector, _a, opt1, opt2;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    conn1 = new rxjs_1.BehaviorSubject("connected");
                    p1 = createTestProvider(conn1);
                    conn2 = new rxjs_1.BehaviorSubject(undefined);
                    p2 = createTestProvider(conn2);
                    connector = connector_1.Connector.create(p1).add(p2);
                    return [4 /*yield*/, connector.getOptions()];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), opt1 = _a[0], opt2 = _a[1];
                    return [4 /*yield*/, connector.connect(opt1)];
                case 2:
                    _b.sent();
                    expect(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connector.connect(opt2)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }).toThrow();
                    conn1.next(undefined);
                    expect(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connector.connect(opt2)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }).not.toThrow();
                    expect(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connector.connect(opt2)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }).not.toThrow();
                    return [2 /*return*/];
            }
        });
    }); });
    test("provider can be auto-connected", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var test1AutoConnected, connector, connected;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test1AutoConnected = tslib_1.__assign(tslib_1.__assign({}, test1), { isAutoConnected: function () { return Promise.resolve(true); } });
                    connector = connector_1.Connector.create(test1AutoConnected).add(test2);
                    return [4 /*yield*/, connector.connection.pipe((0, operators_1.filter)(function (it) { return it !== undefined; }), (0, operators_1.first)()).toPromise()];
                case 1:
                    connected = _a.sent();
                    expect(connected).toStrictEqual({ status: "initializing" });
                    return [4 /*yield*/, connector.connect({
                            provider: test1AutoConnected,
                            option: "test1-op1",
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connector.connection.pipe((0, operators_1.first)()).toPromise()];
                case 3:
                    connected = _a.sent();
                    expect(connected).toMatchObject({ status: "connected", connection: "connected" });
                    return [2 /*return*/];
            }
        });
    }); });
});
var test1 = {
    getOption: function () { return Promise.resolve("test1-op1"); },
    getConnection: function () { return (0, rxjs_1.of)({ status: "connected", connection: "connected" }); },
    isAutoConnected: function () { return Promise.resolve(false); },
    getId: function () { return "test1-op1"; },
    isConnected: function () { return Promise.resolve(false); },
};
var test2 = {
    getOption: function () { return Promise.resolve("test2-op1"); },
    getConnection: function () { return (0, rxjs_1.of)({ status: "connected", connection: 1 }); },
    isAutoConnected: function () { return Promise.resolve(false); },
    getId: function () { return "test2-op1"; },
    isConnected: function () { return Promise.resolve(false); },
};
function createTestProvider(connection) {
    return {
        getOption: function () { return Promise.resolve("option"); },
        getConnection: function () { return connection.pipe((0, operators_1.map)(function (it) { return it ? (0, connection_state_1.getStateConnected)({ connection: it }) : (0, connection_state_1.getStateDisconnected)(); })); },
        isAutoConnected: function () { return Promise.resolve(false); },
        getId: function () { return "option"; },
        isConnected: function () { return Promise.resolve(false); },
    };
}
