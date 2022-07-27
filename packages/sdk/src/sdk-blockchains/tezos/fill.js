"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosFill = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var types_1 = require("@rarible/types");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var api_client_1 = require("@rarible/api-client");
var buy_1 = require("@rarible/tezos-sdk/dist/sales/buy");
var domain_1 = require("../../types/order/fill/domain");
var common_1 = require("./common");
var TezosFill = /** @class */ (function () {
    function TezosFill(provider, unionAPI, network) {
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.network = network;
        this.fill = this.fill.bind(this);
    }
    TezosFill.prototype.getPreparedOrder = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, domain;
            return tslib_1.__generator(this, function (_b) {
                if ("order" in request) {
                    return [2 /*return*/, request.order];
                }
                else if ("orderId" in request) {
                    _a = tslib_1.__read(request.orderId.split(":"), 1), domain = _a[0];
                    if (domain !== api_client_1.Blockchain.TEZOS) {
                        throw new Error("Not an tezos order");
                    }
                    return [2 /*return*/, this.unionAPI.order.getOrderById({
                            id: request.orderId,
                        })];
                }
                else {
                    throw new Error("Request error");
                }
                return [2 /*return*/];
            });
        });
    };
    TezosFill.prototype.getMaxAmount = function (order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, _a, contract, tokenId, ownershipId, _b, _c, response;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        if (!(order.take.type["@type"] === "TEZOS_MT" || order.take.type["@type"] === "TEZOS_NFT")) return [3 /*break*/, 3];
                        _a = order.take.type, contract = _a.contract, tokenId = _a.tokenId;
                        _c = (_b = "".concat(contract, ":").concat(tokenId.toString(), ":")).concat;
                        return [4 /*yield*/, (0, tezos_sdk_1.get_address)(provider)];
                    case 1:
                        ownershipId = _c.apply(_b, [_d.sent()]);
                        return [4 /*yield*/, this.unionAPI.ownership.getOwnershipById({
                                ownershipId: ownershipId,
                            })];
                    case 2:
                        response = _d.sent();
                        return [2 /*return*/, (0, types_1.toBigNumber)(response.value)];
                    case 3: return [2 /*return*/, (0, types_1.toBigNumber)(order.makeStock)];
                }
            });
        });
    };
    TezosFill.prototype.isMultiple = function (order) {
        return order.take.type["@type"] === "TEZOS_MT" || order.make.type["@type"] === "TEZOS_MT";
    };
    TezosFill.prototype.buyV2 = function (order, data, fillRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, amount, currency, buyRequest, isOrderExists, op;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _a.sent();
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        amount = (order.makePrice !== undefined) ? new bignumber_js_1.default(order.makePrice) : new bignumber_js_1.default(0);
                        return [4 /*yield*/, (0, common_1.getTezosAssetTypeV2)(this.provider.config, order.take.type)];
                    case 2:
                        currency = _a.sent();
                        if (!data.make_contract || !data.make_token_id) {
                            throw new Error("Make data for buyV2 should exist");
                        }
                        buyRequest = {
                            asset_contract: data.make_contract,
                            asset_token_id: new bignumber_js_1.default(data.make_token_id),
                            asset_seller: (0, common_1.getTezosAddress)(order.maker),
                            sale_type: currency.type,
                            sale_asset_contract: currency.asset_contract,
                            sale_asset_token_id: currency.asset_token_id,
                            sale_amount: amount,
                            sale_qty: new bignumber_js_1.default(fillRequest.amount),
                            sale_payouts: (0, common_1.convertUnionParts)(fillRequest.payouts),
                            sale_origin_fees: (0, common_1.convertUnionParts)(fillRequest.originFees),
                            use_all: false,
                        };
                        return [4 /*yield*/, (0, buy_1.isExistsSaleOrder)(provider, buyRequest)];
                    case 3:
                        isOrderExists = _a.sent();
                        if (!isOrderExists) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, buy_1.buyV2)(provider, buyRequest)];
                    case 4:
                        op = _a.sent();
                        return [2 /*return*/, new sdk_transaction_1.BlockchainTezosTransaction(op, this.network)];
                    case 5: throw new Error("Error order does not exist");
                }
            });
        });
    };
    TezosFill.prototype.fill = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var preparedOrder, submit;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getPreparedOrder(request)];
                    case 1:
                        preparedOrder = _b.sent();
                        submit = action_1.Action.create({
                            id: "send-tx",
                            run: function (fillRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var make, take, request_1;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                                        case 1:
                                            _a.sent();
                                            make = preparedOrder.make, take = preparedOrder.take;
                                            if (make.type["@type"] === "TEZOS_NFT" || make.type["@type"] === "TEZOS_MT") {
                                                request_1 = {
                                                    make_contract: (0, common_1.convertFromContractAddress)(make.type.contract),
                                                    make_token_id: new bignumber_js_1.default(make.type.tokenId),
                                                    maker: (0, common_1.getTezosAddress)(preparedOrder.maker),
                                                    take_contract: "contract" in take.type ? (0, common_1.convertFromContractAddress)(take.type.contract) : undefined,
                                                };
                                                if (take.type["@type"] === "TEZOS_FT" && take.type.tokenId) {
                                                    request_1.take_token_id = new bignumber_js_1.default(take.type.tokenId.toString());
                                                }
                                                if (preparedOrder.data["@type"] === "TEZOS_RARIBLE_V3") {
                                                    return [2 /*return*/, this.buyV2(preparedOrder, request_1, fillRequest)];
                                                }
                                            }
                                            return [2 /*return*/, this.fillV1Order(fillRequest, preparedOrder)];
                                    }
                                });
                            }); },
                        });
                        _a = {
                            multiple: this.isMultiple(preparedOrder)
                        };
                        return [4 /*yield*/, this.getMaxAmount(preparedOrder)];
                    case 2: return [2 /*return*/, (_a.maxAmount = _b.sent(),
                            _a.baseFee = parseInt(this.provider.config.fees.toString()),
                            _a.originFeeSupport = domain_1.OriginFeeSupport.FULL,
                            _a.payoutsSupport = domain_1.PayoutsSupport.MULTIPLE,
                            _a.maxFeesBasePointSupport = domain_1.MaxFeesBasePointSupport.IGNORED,
                            _a.supportsPartialFill = true,
                            _a.submit = submit,
                            _a)];
                }
            });
        });
    };
    TezosFill.prototype.fillV1Order = function (fillRequest, order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, request, legacyOrders, preparedOrder, fillResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _a.sent();
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        request = {
                            amount: new bignumber_js_1.default(fillRequest.amount),
                            payouts: (0, common_1.convertUnionParts)(fillRequest.payouts),
                            origin_fees: (0, common_1.convertUnionParts)(fillRequest.originFees),
                            infinite: fillRequest.infiniteApproval,
                            use_all: true,
                        };
                        return [4 /*yield*/, (0, tezos_sdk_1.get_legacy_orders)(provider.config, { data: true }, { order_id: (0, common_1.getTezosOrderId)(order.id) })];
                    case 2:
                        legacyOrders = _a.sent();
                        if (!legacyOrders.length) {
                            throw new Error("Tezos v1 orders has not been found");
                        }
                        if (!legacyOrders[0] || !legacyOrders[0].data) {
                            throw new Error("Tezos v1 order data is empty");
                        }
                        preparedOrder = (0, tezos_sdk_1.order_of_json)(legacyOrders[0].data);
                        return [4 /*yield*/, (0, tezos_sdk_1.fill_order)(provider, preparedOrder, request, fillRequest.unwrap)];
                    case 3:
                        fillResponse = _a.sent();
                        return [2 /*return*/, new sdk_transaction_1.BlockchainTezosTransaction(fillResponse, this.network)];
                }
            });
        });
    };
    return TezosFill;
}());
exports.TezosFill = TezosFill;
