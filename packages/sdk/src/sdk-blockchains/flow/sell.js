"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowSell = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var flow_sdk_1 = require("@rarible/flow-sdk");
var action_1 = require("@rarible/action");
var bn_1 = require("@rarible/utils/build/bn");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/order/fill/domain");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var converters_1 = require("./common/converters");
var get_flow_base_fee_1 = require("./common/get-flow-base-fee");
var FlowSell = /** @class */ (function () {
    function FlowSell(sdk, apis) {
        this.sdk = sdk;
        this.apis = apis;
        this.sell = this.sell.bind(this);
        this.update = this.update.bind(this);
    }
    FlowSell.prototype.getPreparedOrder = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.apis.order.getOrderById({ id: request })];
            });
        });
    };
    FlowSell.prototype.sell = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sellAction;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                sellAction = action_1.Action.create({
                    id: "send-tx",
                    run: function (sellRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var requestCurrency, currency, _a, itemId, contract;
                        return tslib_1.__generator(this, function (_b) {
                            requestCurrency = (0, get_currency_asset_type_1.getCurrencyAssetType)(sellRequest.currency);
                            if (requestCurrency["@type"] === "FLOW_FT") {
                                currency = (0, converters_1.getFungibleTokenName)(requestCurrency.contract);
                                _a = (0, converters_1.parseFlowItemIdFromUnionItemId)(sellRequest.itemId), itemId = _a.itemId, contract = _a.contract;
                                return [2 /*return*/, this.sdk.order.sell({
                                        collection: contract,
                                        currency: currency,
                                        itemId: (0, flow_sdk_1.toFlowItemId)("".concat(contract, ":").concat(itemId)),
                                        sellItemPrice: (0, bn_1.toBn)(sellRequest.price).decimalPlaces(8).toString(),
                                        originFees: (0, converters_1.toFlowParts)(sellRequest.originFees),
                                    })];
                            }
                            throw new Error("Unsupported currency type: ".concat(requestCurrency["@type"]));
                        });
                    }); },
                }).after(function (tx) { return (0, converters_1.convertFlowOrderId)(tx.orderId); });
                return [2 /*return*/, {
                        supportedCurrencies: FlowSell.supportedCurrencies,
                        baseFee: (0, get_flow_base_fee_1.getFlowBaseFee)(this.sdk),
                        originFeeSupport: domain_1.OriginFeeSupport.FULL,
                        payoutsSupport: domain_1.PayoutsSupport.NONE,
                        maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                        supportsExpirationDate: false,
                        submit: sellAction,
                    }];
            });
        });
    };
    FlowSell.prototype.update = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, blockchain, orderId, order, sellAction;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tslib_1.__read(request.orderId.split(":"), 2), blockchain = _a[0], orderId = _a[1];
                        if (blockchain !== api_client_1.Blockchain.FLOW) {
                            throw new Error("Not an flow order");
                        }
                        return [4 /*yield*/, this.getPreparedOrder(request.orderId)];
                    case 1:
                        order = _b.sent();
                        sellAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (sellRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var currency;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(order.take.type["@type"] === "FLOW_FT")) return [3 /*break*/, 3];
                                            currency = (0, converters_1.getFungibleTokenName)(order.take.type.contract);
                                            if (!(order.make.type["@type"] === "FLOW_NFT")) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.sdk.order.updateOrder({
                                                    collection: (0, converters_1.getFlowCollection)(order.make.type.contract),
                                                    currency: currency,
                                                    order: parseInt(orderId),
                                                    sellItemPrice: (0, types_1.toBigNumber)((0, bn_1.toBn)(sellRequest.price).decimalPlaces(8).toString()),
                                                })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: throw new Error("Unsupported make asset: ".concat(order.make.type["@type"]));
                                        case 3: throw new Error("Unsupported take asset: ".concat(order.take.type["@type"]));
                                    }
                                });
                            }); },
                        }).after(function (tx) { return (0, converters_1.convertFlowOrderId)(tx.orderId); });
                        return [2 /*return*/, {
                                supportedCurrencies: FlowSell.supportedCurrencies,
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                baseFee: (0, get_flow_base_fee_1.getFlowBaseFee)(this.sdk),
                                submit: sellAction,
                            }];
                }
            });
        });
    };
    FlowSell.supportedCurrencies = [{
            blockchain: api_client_1.Blockchain.FLOW,
            type: "NATIVE",
        }];
    return FlowSell;
}());
exports.FlowSell = FlowSell;
