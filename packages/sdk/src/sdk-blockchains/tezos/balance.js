"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosBalance = void 0;
var tslib_1 = require("tslib");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var common_1 = require("./common");
var TezosBalance = /** @class */ (function () {
    function TezosBalance(provider, network) {
        this.provider = provider;
        this.network = network;
        this.getBalance = this.getBalance.bind(this);
    }
    TezosBalance.prototype.getBalance = function (address, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetType, tezosAssetType, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(currency);
                        return [4 /*yield*/, (0, common_1.getTezosAssetTypeV2)(this.provider.config, assetType)];
                    case 1:
                        tezosAssetType = _b.sent();
                        if (assetType["@type"] !== "XTZ" && assetType["@type"] !== "TEZOS_FT") {
                            throw new Error("Unsupported asset type");
                        }
                        if (!this.provider.config.node_url) {
                            throw new Error("Node url for tezos has not been specified");
                        }
                        _a = bignumber_js_1.default.bind;
                        return [4 /*yield*/, (0, tezos_sdk_1.get_balance)(this.provider.config, (0, common_1.getTezosAddress)(address), tezosAssetType.type, tezosAssetType.asset_contract, tezosAssetType.asset_token_id)];
                    case 2: return [2 /*return*/, new (_a.apply(bignumber_js_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    return TezosBalance;
}());
exports.TezosBalance = TezosBalance;
