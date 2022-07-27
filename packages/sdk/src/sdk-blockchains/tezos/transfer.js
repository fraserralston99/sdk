"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosTransfer = void 0;
var tslib_1 = require("tslib");
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var bn_1 = require("@rarible/utils/build/bn");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var common_1 = require("./common");
var TezosTransfer = /** @class */ (function () {
    function TezosTransfer(provider, unionAPI, network) {
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.network = network;
        this.transfer = this.transfer.bind(this);
    }
    TezosTransfer.prototype.getRequiredProvider = function () {
        if (!(0, common_1.isExistedTezosProvider)(this.provider)) {
            throw new Error("Tezos provider is required");
        }
        return this.provider;
    };
    TezosTransfer.prototype.transfer = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, contract, tokenId, item, collectionType;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _b.sent();
                        _a = (0, common_1.getTezosItemData)(prepare.itemId), contract = _a.contract, tokenId = _a.tokenId;
                        return [4 /*yield*/, this.unionAPI.item.getItemById({ itemId: prepare.itemId })];
                    case 2:
                        item = _b.sent();
                        return [4 /*yield*/, (0, common_1.getCollectionType)(this.provider, contract)];
                    case 3:
                        collectionType = _b.sent();
                        return [2 /*return*/, {
                                multiple: collectionType === "TEZOS_MT",
                                maxAmount: (0, types_1.toBigNumber)(item.supply),
                                submit: action_1.Action.create({
                                    id: "transfer",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var amount, result;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    amount = collectionType === "TEZOS_NFT" ? undefined : (0, bn_1.toBn)((request.amount || 1).toFixed());
                                                    return [4 /*yield*/, (0, tezos_sdk_1.transfer)(this.getRequiredProvider(), {
                                                            asset_class: (0, common_1.getCollectionTypeAssetClass)(collectionType),
                                                            contract: contract,
                                                            token_id: new bignumber_js_1.default(tokenId),
                                                        }, (0, common_1.getTezosAddress)(request.to), amount)];
                                                case 1:
                                                    result = _a.sent();
                                                    return [2 /*return*/, new sdk_transaction_1.BlockchainTezosTransaction(result, this.network)];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    return TezosTransfer;
}());
exports.TezosTransfer = TezosTransfer;
