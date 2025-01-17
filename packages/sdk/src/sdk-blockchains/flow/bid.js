"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowBid = void 0;
var tslib_1 = require("tslib");
var flow_sdk_1 = require("@rarible/flow-sdk");
var action_1 = require("@rarible/action");
var item_1 = require("@rarible/flow-sdk/build/common/item");
var big_number_1 = require("@rarible/types/build/big-number");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/order/fill/domain");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var converters_1 = require("./common/converters");
var get_flow_base_fee_1 = require("./common/get-flow-base-fee");
var FlowBid = /** @class */ (function () {
    function FlowBid(sdk) {
        this.sdk = sdk;
        this.bid = this.bid.bind(this);
        this.update = this.update.bind(this);
    }
    FlowBid.prototype.getConvertableValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    FlowBid.prototype.bid = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, domain, contract, tokenId, itemId, bidAction;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                if ("collectionId" in prepare) {
                    throw new Error("Bid collection is not supported");
                }
                if (!prepare.itemId) {
                    throw new Error("ItemId has not been specified");
                }
                _a = tslib_1.__read(prepare.itemId.split(":"), 3), domain = _a[0], contract = _a[1], tokenId = _a[2];
                if (domain !== api_client_1.Blockchain.FLOW) {
                    throw new Error("Not an flow item: ".concat(prepare.itemId));
                }
                itemId = (0, item_1.toFlowItemId)("".concat(contract, ":").concat(tokenId));
                bidAction = action_1.Action.create({
                    id: "send-tx",
                    run: function (bidRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var requestCurrency, currency;
                        return tslib_1.__generator(this, function (_a) {
                            requestCurrency = (0, get_currency_asset_type_1.getCurrencyAssetType)(bidRequest.currency);
                            if (requestCurrency["@type"] === "FLOW_FT") {
                                currency = (0, converters_1.getFungibleTokenName)(requestCurrency.contract);
                                return [2 /*return*/, this.sdk.order.bid((0, flow_sdk_1.toFlowContractAddress)(contract), currency, itemId, (0, big_number_1.toBigNumber)(bidRequest.price.toString()), (0, converters_1.toFlowParts)(bidRequest.originFees))];
                            }
                            throw new Error("Unsupported currency type: ".concat(requestCurrency["@type"]));
                        });
                    }); },
                }).after(function (tx) { return (0, converters_1.convertFlowOrderId)(tx.orderId); });
                return [2 /*return*/, {
                        originFeeSupport: domain_1.OriginFeeSupport.FULL,
                        payoutsSupport: domain_1.PayoutsSupport.NONE,
                        maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                        supportedCurrencies: FlowBid.supportedCurrencies,
                        multiple: false,
                        maxAmount: (0, big_number_1.toBigNumber)("1"),
                        baseFee: (0, get_flow_base_fee_1.getFlowBaseFee)(this.sdk),
                        getConvertableValue: this.getConvertableValue,
                        supportsExpirationDate: false,
                        submit: bidAction,
                    }];
            });
        });
    };
    FlowBid.prototype.update = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, blockchain, orderId, order, bidUpdateAction;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!prepareRequest.orderId) {
                            throw new Error("OrderId has not been specified");
                        }
                        _a = tslib_1.__read(prepareRequest.orderId.split(":"), 2), blockchain = _a[0], orderId = _a[1];
                        if (blockchain !== api_client_1.Blockchain.FLOW) {
                            throw new Error("Not an flow order");
                        }
                        return [4 /*yield*/, this.sdk.apis.order.getOrderByOrderId({ orderId: orderId })];
                    case 1:
                        order = _b.sent();
                        bidUpdateAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (bidRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var currency;
                                return tslib_1.__generator(this, function (_a) {
                                    if (order.make["@type"] === "fungible") {
                                        currency = (0, converters_1.getFungibleTokenName)((0, converters_1.convertFlowContractAddress)(order.make.contract));
                                        return [2 /*return*/, this.sdk.order.bidUpdate((0, flow_sdk_1.toFlowContractAddress)(order.take.contract), currency, order, (0, big_number_1.toBigNumber)(bidRequest.price.toString()))];
                                    }
                                    throw new Error("Unsupported currency type: ".concat(order.make["@type"]));
                                });
                            }); },
                        }).after(function (tx) { return (0, converters_1.convertFlowOrderId)(tx.orderId); });
                        return [2 /*return*/, {
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: FlowBid.supportedCurrencies,
                                baseFee: (0, get_flow_base_fee_1.getFlowBaseFee)(this.sdk),
                                getConvertableValue: this.getConvertableValue,
                                submit: bidUpdateAction,
                            }];
                }
            });
        });
    };
    FlowBid.supportedCurrencies = [{
            blockchain: api_client_1.Blockchain.FLOW,
            type: "NATIVE",
        }];
    return FlowBid;
}());
exports.FlowBid = FlowBid;
