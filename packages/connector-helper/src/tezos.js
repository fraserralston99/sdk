"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTezosWallet = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
function mapTezosWallet(provider) {
    var _this = this;
    return provider.map(function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var createBeaconProvider, provider;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require("@rarible/tezos-sdk/dist/providers/beacon/beacon_provider")); })];
                case 1:
                    createBeaconProvider = (_a.sent()).beacon_provider;
                    return [4 /*yield*/, createBeaconProvider(state.wallet, state.toolkit)];
                case 2:
                    provider = _a.sent();
                    return [2 /*return*/, {
                            wallet: new sdk_wallet_1.TezosWallet(provider),
                            address: state.address,
                            blockchain: api_client_1.Blockchain.TEZOS,
                        }];
            }
        });
    }); });
}
exports.mapTezosWallet = mapTezosWallet;
