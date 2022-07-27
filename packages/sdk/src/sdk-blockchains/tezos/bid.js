"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosBid = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var types_1 = require("@rarible/types");
// eslint-disable-next-line camelcase
var main_1 = require("@rarible/tezos-sdk/dist/main");
var domain_1 = require("../../types/order/fill/domain");
var retry_1 = require("../../common/retry");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var not_implemented_1 = require("../../common/not-implemented");
var common_1 = require("./common");
var TezosBid = /** @class */ (function () {
    function TezosBid(provider, apis, balanceService, network) {
        this.provider = provider;
        this.apis = apis;
        this.balanceService = balanceService;
        this.network = network;
        this.bid = this.bid.bind(this);
        this.update = this.update.bind(this);
    }
    TezosBid.prototype.getMakeAssetType = function (type) {
        switch (type["@type"]) {
            case "XTZ": {
                return {
                    asset_class: type["@type"],
                };
            }
            case "TEZOS_FT": {
                return {
                    asset_class: "FT",
                    contract: (0, common_1.convertFromContractAddress)(type.contract),
                    token_id: type.tokenId !== undefined ? new bignumber_js_1.default(type.tokenId) : undefined,
                };
            }
            default: {
                throw new Error("Unsupported take asset type");
            }
        }
    };
    TezosBid.prototype.getConvertMap = function () {
        var convertMap = {};
        if (this.provider.config.wrapper) {
            convertMap[(0, common_1.convertTezosToContractAddress)(this.provider.config.wrapper)] = "XTZ";
        }
        return convertMap;
    };
    TezosBid.prototype.bid = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, itemId, contract, item, itemCollection, submit;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _b.sent();
                        if ("collectionId" in prepare) {
                            throw new Error("Bid collection is not supported");
                        }
                        _a = (0, common_1.getTezosItemData)(prepare.itemId), itemId = _a.itemId, contract = _a.contract;
                        return [4 /*yield*/, (0, retry_1.retry)(90, 1000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    return [2 /*return*/, this.apis.item.getNftItemById({ itemId: itemId })];
                                });
                            }); })];
                    case 2:
                        item = _b.sent();
                        return [4 /*yield*/, this.apis.collection.getNftCollectionById({
                                collection: contract,
                            })];
                    case 3:
                        itemCollection = _b.sent();
                        submit = action_1.Action.create({
                            id: "send-tx",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var provider, makerPublicKey, requestCurrency, order, _a, _b;
                                var _c;
                                return tslib_1.__generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            provider = (0, common_1.getRequiredProvider)(this.provider);
                                            return [4 /*yield*/, (0, common_1.getMakerPublicKey)(provider)];
                                        case 1:
                                            makerPublicKey = _d.sent();
                                            requestCurrency = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                                            _a = tezos_sdk_1.bid;
                                            _b = [provider];
                                            _c = {
                                                maker: (0, main_1.pk_to_pkh)(makerPublicKey),
                                                maker_edpk: makerPublicKey,
                                                make_asset_type: this.getMakeAssetType(requestCurrency),
                                                amount: new bignumber_js_1.default(request.amount),
                                                take_asset_type: {
                                                    asset_class: itemCollection.type,
                                                    contract: item.contract,
                                                    token_id: new bignumber_js_1.default(item.tokenId),
                                                },
                                                price: new bignumber_js_1.default(request.price)
                                            };
                                            return [4 /*yield*/, (0, common_1.getPayouts)(provider, request.payouts)];
                                        case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.payouts = _d.sent(),
                                                    _c.origin_fees = (0, common_1.convertUnionParts)(request.originFees),
                                                    _c)]))];
                                        case 3:
                                            order = _d.sent();
                                            return [2 /*return*/, (0, common_1.convertTezosOrderId)(order.hash)];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/, {
                                multiple: itemCollection.type === "MT",
                                maxAmount: (0, types_1.toBigNumber)(item.supply),
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: (0, common_1.getSupportedCurrencies)(),
                                baseFee: parseInt(this.provider.config.fees.toString()),
                                getConvertableValue: not_implemented_1.notImplemented,
                                supportsExpirationDate: false,
                                submit: submit,
                            }];
                }
            });
        });
    };
    TezosBid.prototype.update = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderId, order, updateAction;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _a.sent();
                        orderId = (0, common_1.getTezosOrderId)(request.orderId);
                        return [4 /*yield*/, this.apis.order.getOrderByHash({ hash: orderId })];
                    case 2:
                        order = _a.sent();
                        if (!order) {
                            throw new Error("Order has not been found");
                        }
                        updateAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (updateRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var provider, orderForm, updatedOrder;
                                var _a, _b;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            provider = (0, common_1.getRequiredProvider)(this.provider);
                                            orderForm = {
                                                type: "RARIBLE_V2",
                                                maker: order.maker,
                                                maker_edpk: order.makerEdpk,
                                                taker_edpk: order.takerEdpk,
                                                make: tslib_1.__assign(tslib_1.__assign({}, (0, common_1.covertToLibAsset)(order.make)), { value: new bignumber_js_1.default(updateRequest.price).multipliedBy(order.take.value) }),
                                                take: (0, common_1.covertToLibAsset)(order.take),
                                                salt: order.salt,
                                                start: order.start,
                                                end: order.end,
                                                signature: order.signature,
                                                data: {
                                                    data_type: "V1",
                                                    payouts: ((_a = order.data.payouts) === null || _a === void 0 ? void 0 : _a.map(function (p) { return ({
                                                        account: p.account,
                                                        value: new bignumber_js_1.default(p.value),
                                                    }); })) || [],
                                                    origin_fees: ((_b = order.data.originFees) === null || _b === void 0 ? void 0 : _b.map(function (p) { return ({
                                                        account: p.account,
                                                        value: new bignumber_js_1.default(p.value),
                                                    }); })) || [],
                                                },
                                            };
                                            return [4 /*yield*/, (0, tezos_sdk_1.upsert_order)(provider, orderForm, true)];
                                        case 1:
                                            updatedOrder = _c.sent();
                                            return [2 /*return*/, (0, common_1.convertTezosOrderId)(updatedOrder.hash)];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/, {
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: (0, common_1.getSupportedCurrencies)(),
                                baseFee: parseInt(this.provider.config.fees.toString()),
                                getConvertableValue: not_implemented_1.notImplemented,
                                submit: updateAction,
                            }];
                }
            });
        });
    };
    return TezosBid;
}());
exports.TezosBid = TezosBid;
