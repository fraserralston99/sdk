"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowBuy = void 0;
var tslib_1 = require("tslib");
var big_number_1 = require("@rarible/types/build/big-number");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var domain_1 = require("../../types/order/fill/domain");
var converters = tslib_1.__importStar(require("./common/converters"));
var converters_1 = require("./common/converters");
var get_flow_base_fee_1 = require("./common/get-flow-base-fee");
var FlowBuy = /** @class */ (function () {
    function FlowBuy(sdk, apis, network) {
        this.sdk = sdk;
        this.apis = apis;
        this.network = network;
        this.buy = this.buy.bind(this);
    }
    FlowBuy.prototype.getPreparedOrder = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if ("order" in request) {
                    return [2 /*return*/, request.order];
                }
                if ("orderId" in request) {
                    // @todo replace this api call for call from flow-sdk when it supported
                    return [2 /*return*/, this.apis.order.getOrderById({ id: request.orderId })];
                }
                throw new Error("Incorrect request");
            });
        });
    };
    FlowBuy.prototype.getFlowNftContract = function (order) {
        if (order.make.type["@type"] === "FLOW_NFT") {
            return order.make.type.contract;
        }
        else if (order.take.type["@type"] === "FLOW_NFT") {
            return order.take.type.contract;
        }
        else {
            throw new Error("This is not FLOW order");
        }
    };
    FlowBuy.prototype.getFlowCurrency = function (order) {
        if (order.take.type["@type"] === "FLOW_FT") {
            return converters.getFungibleTokenName(order.take.type.contract);
        }
        else if (order.make.type["@type"] === "FLOW_FT") {
            return converters.getFungibleTokenName(order.make.type.contract);
        }
        else {
            throw new Error("No Flow fungible token found in order take and make values");
        }
    };
    FlowBuy.prototype.buy = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var order, submit;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPreparedOrder(request)];
                    case 1:
                        order = _a.sent();
                        submit = action_1.Action
                            .create({
                            id: "send-tx",
                            run: function (buyRequest) {
                                var currency = _this.getFlowCurrency(order);
                                var owner = converters.parseFlowAddressFromUnionAddress(order.maker);
                                var collectionId = converters.getFlowCollection(_this.getFlowNftContract(order));
                                var orderId = converters.parseOrderId(order.id);
                                return _this.sdk.order.fill(collectionId, currency, orderId, owner, (0, converters_1.toFlowParts)(buyRequest.originFees));
                            },
                        })
                            .after(function (tx) { return new sdk_transaction_1.BlockchainFlowTransaction(tx, _this.network); });
                        return [2 /*return*/, {
                                multiple: false,
                                maxAmount: (0, big_number_1.toBigNumber)("1"),
                                baseFee: (0, get_flow_base_fee_1.getFlowBaseFee)(this.sdk),
                                supportsPartialFill: false,
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                submit: submit,
                            }];
                }
            });
        });
    };
    return FlowBuy;
}());
exports.FlowBuy = FlowBuy;
