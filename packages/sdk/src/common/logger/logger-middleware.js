"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalLoggerMiddleware = exports.getErrorMessageString = void 0;
var tslib_1 = require("tslib");
var build_1 = require("@rarible/logger/build");
var api_client_1 = require("@rarible/api-client");
var axios_1 = tslib_1.__importDefault(require("axios"));
var domain_1 = require("../../domain");
var loggerConfig = {
    service: "union-sdk",
    elkUrl: "https://logging.rarible.com/",
};
function getWalletInfo(wallet) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var info, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    info = {
                        "wallet.blockchain": wallet.blockchain,
                    };
                    _b = wallet.blockchain;
                    switch (_b) {
                        case api_client_1.BlockchainGroup.ETHEREUM: return [3 /*break*/, 1];
                        case api_client_1.BlockchainGroup.FLOW: return [3 /*break*/, 3];
                        case api_client_1.BlockchainGroup.TEZOS: return [3 /*break*/, 5];
                        case api_client_1.BlockchainGroup.SOLANA: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 1: return [4 /*yield*/, Promise.all([wallet.ethereum.getChainId(), wallet.ethereum.getFrom()])
                        .then(function (_a) {
                        var _b = tslib_1.__read(_a, 2), chainId = _b[0], address = _b[1];
                        info["wallet.address"] = address;
                        info["wallet.chainId"] = chainId;
                    })
                        .catch(function (err) {
                        info["wallet.address"] = "unknown (".concat(err && err.toString(), ")");
                    })];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, wallet.fcl.currentUser().snapshot()
                        .then(function (userData) {
                        info["wallet.address"] = userData.addr;
                        info["wallet.flow.chainId"] = userData.cid;
                    })
                        .catch(function (err) {
                        info["wallet.address"] = "unknown (".concat(err && err.toString(), ")");
                    })];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 5:
                    info["wallet.tezos.kind"] = wallet.provider.kind;
                    return [4 /*yield*/, Promise.all([wallet.provider.chain_id(), wallet.provider.address()])
                            .then(function (_a) {
                            var _b = tslib_1.__read(_a, 2), chainId = _b[0], address = _b[1];
                            info["wallet.address"] = address;
                            info["wallet.tezos.chainId"] = chainId;
                        })
                            .catch(function (err) {
                            info["wallet.address"] = "unknown (".concat(err && err.toString(), ")");
                        })];
                case 6:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 7:
                    info["wallet.address"] = (_a = wallet.provider.publicKey) === null || _a === void 0 ? void 0 : _a.toString();
                    return [3 /*break*/, 9];
                case 8:
                    info["wallet.address"] = "unknown";
                    _c.label = 9;
                case 9: return [2 /*return*/, info];
            }
        });
    });
}
function getErrorMessageString(err) {
    if (!err) {
        return "not defined";
    }
    else if (typeof err === "string") {
        return err;
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (err.message) {
        return typeof err.message === "string" ? err.message : JSON.stringify(err.message);
    }
    else if (err.status !== undefined && err.statusText !== undefined) {
        return JSON.stringify({
            url: err.url,
            status: err.status,
            statusText: err.statusText,
        });
    }
    else {
        return JSON.stringify(err);
    }
}
exports.getErrorMessageString = getErrorMessageString;
function getInternalLoggerMiddleware(logsLevel, sdkContext) {
    var _this = this;
    var getContext = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [{ service: loggerConfig.service, environment: sdkContext.env }];
                    if (!sdkContext.wallet) return [3 /*break*/, 2];
                    return [4 /*yield*/, getWalletInfo(sdkContext.wallet)];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b = {};
                    _c.label = 3;
                case 3: return [2 /*return*/, tslib_1.__assign.apply(void 0, _a.concat([(_b)]))];
            }
        });
    }); };
    var remoteLogger = new build_1.RemoteLogger(function (msg) { return axios_1.default.post(loggerConfig.elkUrl, msg); }, {
        initialContext: getContext(),
        dropBatchInterval: 1000,
        maxByteSize: 3 * 10240,
    });
    return function (callable, args) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var time;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            time = Date.now();
            return [2 /*return*/, [callable, function (responsePromise) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var res, err_1;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, responsePromise];
                                case 1:
                                    res = _a.sent();
                                    if (logsLevel >= domain_1.LogsLevel.TRACE) {
                                        remoteLogger.raw({
                                            level: "TRACE",
                                            method: callable.name,
                                            message: "trace of " + callable.name,
                                            duration: (Date.now() - time) / 1000,
                                            args: JSON.stringify(args),
                                            resp: JSON.stringify(res),
                                        });
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    if (logsLevel >= domain_1.LogsLevel.ERROR) {
                                        remoteLogger.raw({
                                            level: "ERROR",
                                            method: callable.name,
                                            message: getErrorMessageString(err_1),
                                            duration: (Date.now() - time) / 1000,
                                            args: JSON.stringify(args),
                                        });
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/, responsePromise];
                            }
                        });
                    }); }]];
        });
    }); };
}
exports.getInternalLoggerMiddleware = getInternalLoggerMiddleware;
