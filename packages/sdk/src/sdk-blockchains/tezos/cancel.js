"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosCancel = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line camelcase
var main_1 = require("@rarible/tezos-sdk/dist/main");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var cancel_1 = require("@rarible/tezos-sdk/dist/sales/cancel");
var common_1 = require("./common");
var TezosCancel = /** @class */ (function () {
    function TezosCancel(provider, unionAPI, network) {
        var _this = this;
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.network = network;
        this.cancel = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var order, v1OrderForm, tx;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.unionAPI.order.getOrderById({ id: request.orderId })];
                        case 2:
                            order = _a.sent();
                            if (!order) {
                                throw new Error("Order has not been found");
                            }
                            if ((0, common_1.isNftAssetType)(order.make.type) || (0, common_1.isMTAssetType)(order.make.type)) {
                                if (order.data["@type"] === "TEZOS_RARIBLE_V3") {
                                    return [2 /*return*/, this.cancelV2SellOrder(order)];
                                }
                            }
                            v1OrderForm = (0, common_1.convertOrderToOrderForm)(order);
                            return [4 /*yield*/, (0, main_1.cancel)((0, common_1.getRequiredProvider)(this.provider), v1OrderForm, false)];
                        case 3:
                            tx = _a.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainTezosTransaction(tx, this.network)];
                    }
                });
            }); },
        });
    }
    TezosCancel.prototype.cancelV2SellOrder = function (order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, currency, cancelRequest, canceledOrder;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _a.sent();
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        return [4 /*yield*/, (0, common_1.getTezosAssetTypeV2)(this.provider.config, order.take.type)];
                    case 2:
                        currency = _a.sent();
                        cancelRequest = {
                            asset_contract: (0, common_1.convertFromContractAddress)(order.make.type.contract),
                            asset_token_id: new bignumber_js_1.default(order.make.type.tokenId),
                            sale_asset_contract: currency.asset_contract,
                            sale_asset_token_id: currency.asset_token_id,
                            sale_type: currency.type,
                        };
                        return [4 /*yield*/, (0, cancel_1.cancelV2)(provider, cancelRequest)];
                    case 3:
                        canceledOrder = _a.sent();
                        if (!canceledOrder) {
                            throw new Error("Cancel transaction has not been returned");
                        }
                        return [2 /*return*/, new sdk_transaction_1.BlockchainTezosTransaction(canceledOrder, this.network)];
                }
            });
        });
    };
    return TezosCancel;
}());
exports.TezosCancel = TezosCancel;
