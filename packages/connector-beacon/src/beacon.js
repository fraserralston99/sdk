"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconConnectionProvider = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var connector_1 = require("@rarible/connector");
var PROVIDER_ID = "beacon";
var BeaconConnectionProvider = /** @class */ (function (_super) {
    tslib_1.__extends(BeaconConnectionProvider, _super);
    function BeaconConnectionProvider(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.instance = (0, connector_1.cache)(function () { return _this._connect(); });
        _this.connection = _this.instance.pipe((0, operators_1.mergeMap)(function (_a) {
            var beaconWallet = _a.beaconWallet, tezosToolkit = _a.tezosToolkit;
            return _this.toConnectState(beaconWallet, tezosToolkit);
        }), (0, operators_1.startWith)((0, connector_1.getStateConnecting)({ providerId: PROVIDER_ID })));
        return _this;
    }
    BeaconConnectionProvider.prototype.toConnectState = function (beaconWallet, tezosToolkit) {
        var _this = this;
        var disconnect = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, beaconWallet.disconnect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, beaconWallet.client.removeAllPeers()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, beaconWallet.client.removeAllAccounts()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, beaconWallet.client.destroy()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return (0, rxjs_1.defer)(function () { return _this.getAddress(beaconWallet); }).pipe((0, operators_1.map)(function (address) { return (0, connector_1.getStateConnected)({
            connection: {
                address: address,
                toolkit: tezosToolkit,
                wallet: beaconWallet,
            },
            disconnect: disconnect,
        }); }));
    };
    BeaconConnectionProvider.prototype.getAddress = function (beaconWallet) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var address, activeAccount;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, beaconWallet.client.getActiveAccount()];
                    case 1:
                        activeAccount = _a.sent();
                        if (!activeAccount) return [3 /*break*/, 2];
                        address = Promise.resolve(activeAccount.address);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, beaconWallet.requestPermissions({
                            network: {
                                type: this.config.network,
                                rpcUrl: this.config.accessNode,
                            },
                        })];
                    case 3:
                        _a.sent();
                        address = beaconWallet.getPKH();
                        _a.label = 4;
                    case 4: return [2 /*return*/, address];
                }
            });
        });
    };
    BeaconConnectionProvider.prototype.getId = function () {
        return PROVIDER_ID;
    };
    BeaconConnectionProvider.prototype.getConnection = function () {
        return this.connection;
    };
    BeaconConnectionProvider.prototype._connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var TezosToolkit, BeaconWallet, wallet, tk;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@taquito/taquito")); })];
                    case 1:
                        TezosToolkit = (_a.sent()).TezosToolkit;
                        return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@taquito/beacon-wallet")); })];
                    case 2:
                        BeaconWallet = (_a.sent()).BeaconWallet;
                        wallet = new BeaconWallet({
                            name: this.config.appName,
                            preferredNetwork: this.config.network,
                        });
                        tk = new TezosToolkit(this.config.accessNode);
                        tk.setWalletProvider(wallet);
                        return [2 /*return*/, {
                                beaconWallet: wallet,
                                tezosToolkit: tk,
                            }];
                }
            });
        });
    };
    BeaconConnectionProvider.prototype.getOption = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, PROVIDER_ID];
            });
        });
    };
    BeaconConnectionProvider.prototype.isAutoConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, false];
            });
        });
    };
    BeaconConnectionProvider.prototype.isConnected = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var instance, account;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.pipe((0, operators_1.first)()).toPromise()];
                    case 1:
                        instance = _a.sent();
                        return [4 /*yield*/, (instance === null || instance === void 0 ? void 0 : instance.beaconWallet.client.getActiveAccount())];
                    case 2:
                        account = _a.sent();
                        return [2 /*return*/, !!account];
                }
            });
        });
    };
    return BeaconConnectionProvider;
}(connector_1.AbstractConnectionProvider));
exports.BeaconConnectionProvider = BeaconConnectionProvider;
