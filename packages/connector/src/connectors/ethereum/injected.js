"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedWeb3ConnectionProvider = exports.DappType = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var provider_1 = require("../../provider");
var utils_1 = require("../../common/utils");
var connection_state_1 = require("../../connection-state");
var get_address_1 = require("./common/get-address");
var get_chain_id_1 = require("./common/get-chain-id");
var DappType;
(function (DappType) {
    DappType["Metamask"] = "Metamask";
    DappType["Trust"] = "Trust";
    DappType["GoWallet"] = "GoWallet";
    DappType["AlphaWallet"] = "AlphaWallet";
    DappType["Status"] = "Status";
    DappType["Coinbase"] = "Coinbase";
    DappType["Cipher"] = "Cipher";
    DappType["Mist"] = "Mist";
    DappType["Parity"] = "Parity";
    DappType["ImToken"] = "ImToken";
    DappType["Dapper"] = "Dapper";
    DappType["Mock"] = "Mock";
    DappType["Generic"] = "Web3";
    DappType["LedgerConnect"] = "LedgerConnect";
})(DappType = exports.DappType || (exports.DappType = {}));
var PROVIDER_ID = "injected";
var InjectedWeb3ConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(InjectedWeb3ConnectionProvider, _super);
    function InjectedWeb3ConnectionProvider() {
        var _this = _super.call(this) || this;
        _this.connection = (0, rxjs_1.defer)(function () { return connect(); }).pipe((0, operators_1.mergeMap)(function () { return (0, utils_1.promiseToObservable)(getWalletAsync()); }), (0, operators_1.map)(function (wallet) {
            if (wallet) {
                var disconnect = function () {
                    if ("close" in wallet.provider) {
                        return wallet.provider.close();
                    }
                    if ("disconnect" in wallet.provider) {
                        return wallet.provider.disconnect();
                    }
                    return Promise.resolve();
                };
                return (0, connection_state_1.getStateConnected)({ connection: wallet, disconnect: disconnect });
            }
            else {
                return (0, connection_state_1.getStateDisconnected)();
            }
        }), (0, operators_1.startWith)((0, connection_state_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    InjectedWeb3ConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    InjectedWeb3ConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    InjectedWeb3ConnectionProvider.prototype.getOption = function () {
        var provider = getInjectedProvider();
        return Promise.resolve(getDappType(provider));
    };
    InjectedWeb3ConnectionProvider.prototype.isAutoConnected = function () {
        var provider = getInjectedProvider();
        var dapp = getDappType(provider);
        return Promise.resolve(isDappSupportAutoConnect(dapp));
    };
    InjectedWeb3ConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider;
            return tslib_1.__generator(this, function (_a) {
                provider = getInjectedProvider();
                if (provider !== undefined) {
                    return [2 /*return*/, (0, get_address_1.ethAccounts)(provider)
                            .then(function (_a) {
                            var _b = tslib_1.__read(_a, 1), account = _b[0];
                            return account !== undefined;
                        })];
                }
                else {
                    return [2 /*return*/, Promise.resolve(false)];
                }
                return [2 /*return*/];
            });
        });
    };
    return InjectedWeb3ConnectionProvider;
}(provider_1.AbstractConnectionProvider));
exports.InjectedWeb3ConnectionProvider = InjectedWeb3ConnectionProvider;
function connect() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider, accounts;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = getInjectedProvider();
                    if (!provider) {
                        throw new Error("Injected provider not available");
                    }
                    return [4 /*yield*/, (0, get_address_1.ethAccounts)(provider)];
                case 1:
                    accounts = _a.sent();
                    if (!(!accounts || accounts.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, enableProvider(provider)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getWalletAsync() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider;
        return tslib_1.__generator(this, function (_a) {
            provider = getInjectedProvider();
            return [2 /*return*/, (0, rxjs_1.combineLatest)([(0, get_address_1.getAddress)(provider), (0, get_chain_id_1.getChainId)(provider)]).pipe((0, operators_1.map)(function (_a) {
                    var _b = tslib_1.__read(_a, 2), address = _b[0], chainId = _b[1];
                    if (address) {
                        return {
                            chainId: chainId,
                            address: address,
                            provider: provider,
                        };
                    }
                    else {
                        return undefined;
                    }
                }))];
        });
    });
}
function enableProvider(provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof provider.request === "function")) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    return [4 /*yield*/, provider.request({
                            method: "eth_requestAccounts",
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    e_1 = _a.sent();
                    if (!(typeof provider.enable === "function")) return [3 /*break*/, 5];
                    return [4 /*yield*/, provider.enable()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 9];
                case 7:
                    if (!(typeof provider.enable === "function")) return [3 /*break*/, 9];
                    return [4 /*yield*/, provider.enable()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, provider];
            }
        });
    });
}
function getInjectedProvider() {
    var _a;
    var provider = undefined;
    var global = typeof window !== "undefined" ? window : undefined;
    if (!global) {
        return provider;
    }
    else if (global.ethereum) {
        provider = global.ethereum;
        provider.autoRefreshOnNetworkChange = false;
    }
    else if ((_a = global.web3) === null || _a === void 0 ? void 0 : _a.currentProvider) {
        provider = global.web3.currentProvider;
    }
    return provider;
}
function getDappType(provider) {
    if (provider !== undefined) {
        if (provider) {
            if (provider.isImToken)
                return DappType.ImToken;
            if (provider.isDapper)
                return DappType.Dapper;
            if (provider.isMetaMask)
                return DappType.Metamask;
            if (provider.isTrust)
                return DappType.Trust;
            if (provider.isGoWallet)
                return DappType.GoWallet;
            if (provider.isAlphaWallet)
                return DappType.AlphaWallet;
            if (provider.isStatus)
                return DappType.Status;
            if (provider.isToshi)
                return DappType.Coinbase;
            if (provider.isLedgerConnect)
                return DappType.LedgerConnect;
            if (typeof window.__CIPHER__ !== "undefined")
                return DappType.Cipher;
            if (provider.constructor.name === "EthereumProvider")
                return DappType.Mist;
            if (provider.constructor.name === "Web3FrameProvider")
                return DappType.Parity;
            if (provider.constructor.name === "Web3ProviderEngine")
                return DappType.Mock;
            return DappType.Generic;
        }
    }
    return undefined;
}
function isDappSupportAutoConnect(dapp) {
    if (!dapp) {
        return false;
    }
    var unsupportedDappTypes = new Set([DappType.Dapper]);
    var disabledAutoLogin = new Set([DappType.Generic, DappType.Metamask]);
    return !(unsupportedDappTypes.has(dapp) || disabledAutoLogin.has(dapp));
}
