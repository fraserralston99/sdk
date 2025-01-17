"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosBurn = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var action_1 = require("@rarible/action");
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var common_1 = require("./common");
var TezosBurn = /** @class */ (function () {
    function TezosBurn(provider, unionAPI, network) {
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.network = network;
        this.burn = this.burn.bind(this);
    }
    TezosBurn.prototype.getRequiredProvider = function () {
        if (!(0, common_1.isExistedTezosProvider)(this.provider)) {
            throw new Error("Tezos provider is required");
        }
        return this.provider;
    };
    TezosBurn.prototype.burn = function (prepare) {
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
                                    id: "burn",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var amount, result;
                                        var _a;
                                        return tslib_1.__generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    amount = collectionType === "TEZOS_MT" ? new bignumber_js_1.default(((_a = request === null || request === void 0 ? void 0 : request.amount) !== null && _a !== void 0 ? _a : 1).toFixed()) : undefined;
                                                    return [4 /*yield*/, (0, tezos_sdk_1.burn)(this.getRequiredProvider(), {
                                                            asset_class: (0, common_1.getCollectionTypeAssetClass)(collectionType),
                                                            contract: contract,
                                                            token_id: new bignumber_js_1.default(tokenId),
                                                        }, amount)];
                                                case 1:
                                                    result = _b.sent();
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
    return TezosBurn;
}());
exports.TezosBurn = TezosBurn;
