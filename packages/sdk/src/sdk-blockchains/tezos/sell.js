"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosSell = void 0;
var tslib_1 = require("tslib");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var action_1 = require("@rarible/action");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var sell_1 = require("@rarible/tezos-sdk/dist/sales/sell");
var domain_1 = require("../../types/order/fill/domain");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var common_1 = require("./common");
var TezosSell = /** @class */ (function () {
    function TezosSell(provider, unionAPI) {
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.sell = this.sell.bind(this);
        this.update = this.update.bind(this);
    }
    TezosSell.prototype.parseTakeAssetType = function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, provider, contract, ftType;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = type["@type"];
                        switch (_a) {
                            case "XTZ": return [3 /*break*/, 1];
                            case "TEZOS_FT": return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1: return [2 /*return*/, {
                            asset_class: type["@type"],
                        }];
                    case 2:
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        contract = (0, common_1.convertFromContractAddress)(type.contract);
                        return [4 /*yield*/, (0, tezos_sdk_1.get_ft_type)(provider.config, contract)];
                    case 3:
                        ftType = _b.sent();
                        return [2 /*return*/, {
                                asset_class: "FT",
                                contract: contract,
                                token_id: ftType === tezos_sdk_1.AssetTypeV2.FA2 ? new bignumber_js_1.default(type.tokenId || 0) : undefined,
                            }];
                    case 4:
                        {
                            throw new Error("Unsupported take asset type");
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TezosSell.prototype.sell = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var submit;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _a.sent();
                        submit = action_1.Action.create({
                            id: "send-tx",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    return [2 /*return*/, this.sellV2(request)];
                                });
                            }); },
                        });
                        return [2 /*return*/, {
                                originFeeSupport: domain_1.OriginFeeSupport.FULL,
                                payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: (0, common_1.getSupportedCurrencies)(),
                                baseFee: parseInt(this.provider.config.fees.toString()),
                                supportsExpirationDate: false,
                                submit: submit,
                            }];
                }
            });
        });
    };
    TezosSell.prototype.sellV2 = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, _a, contract, tokenId, requestCurrency, expirationDate, asset, tezosRequest, sellOrderId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _b.sent();
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        _a = (0, common_1.getTezosItemData)(request.itemId), contract = _a.contract, tokenId = _a.tokenId;
                        requestCurrency = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                        expirationDate = request.expirationDate instanceof Date
                            ? Math.floor(request.expirationDate.getTime() / 1000)
                            : undefined;
                        return [4 /*yield*/, (0, common_1.getTezosAssetTypeV2)(provider.config, requestCurrency)];
                    case 2:
                        asset = _b.sent();
                        tezosRequest = {
                            s_asset_contract: contract,
                            s_asset_token_id: new bignumber_js_1.default(tokenId),
                            s_sale_type: asset.type,
                            s_sale_asset_contract: asset.asset_contract,
                            s_sale_asset_token_id: asset.asset_token_id,
                            s_sale: {
                                sale_amount: new bignumber_js_1.default(request.price),
                                sale_asset_qty: new bignumber_js_1.default(request.amount),
                                sale_max_fees_base_boint: 10000,
                                sale_end: expirationDate,
                                sale_start: undefined,
                                sale_origin_fees: (0, common_1.convertUnionParts)(request.originFees),
                                sale_payouts: (0, common_1.convertUnionParts)(request.payouts),
                                sale_data: undefined,
                                sale_data_type: undefined,
                            },
                        };
                        return [4 /*yield*/, (0, sell_1.sellV2)(provider, tezosRequest)];
                    case 3:
                        sellOrderId = _b.sent();
                        if (!sellOrderId) {
                            throw new Error("OrderID cannot be requested");
                        }
                        return [2 /*return*/, (0, common_1.convertTezosOrderId)(sellOrderId)];
                }
            });
        });
    };
    TezosSell.prototype.update = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var order, make, take, makeAssetType, updateAction;
            var _this = this;
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
                        if (order.data["@type"] === "TEZOS_RARIBLE_V2") {
                            throw new Error("You can't change v1 version of order. Cancel order and create a new one");
                        }
                        make = order.make, take = order.take;
                        makeAssetType = make.type;
                        if (makeAssetType["@type"] !== "TEZOS_NFT" && makeAssetType["@type"] !== "TEZOS_MT") {
                            throw new Error("Order is not a sell (id=".concat(request.orderId, ")"));
                        }
                        updateAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (updateRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var provider, request, asset, expirationDate, tezosRequest, sellOrderId;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            provider = (0, common_1.getRequiredProvider)(this.provider);
                                            request = {
                                                make_contract: (0, common_1.convertFromContractAddress)(makeAssetType.contract),
                                                make_token_id: new bignumber_js_1.default(makeAssetType.tokenId),
                                                maker: (0, common_1.getTezosAddress)(order.maker),
                                                take_contract: "contract" in take.type ? (0, common_1.convertFromContractAddress)(take.type.contract) : undefined,
                                            };
                                            if (take.type["@type"] === "TEZOS_FT" && take.type.tokenId) {
                                                request.take_token_id = new bignumber_js_1.default(take.type.tokenId.toString());
                                            }
                                            return [4 /*yield*/, (0, common_1.getTezosAssetTypeV2)(provider.config, take.type)];
                                        case 1:
                                            asset = _a.sent();
                                            expirationDate = order.endedAt !== undefined ? Math.floor(new Date(order.endedAt).getTime()) : undefined;
                                            tezosRequest = {
                                                s_asset_contract: (0, common_1.convertFromContractAddress)(makeAssetType.contract),
                                                s_asset_token_id: new bignumber_js_1.default(makeAssetType.tokenId),
                                                s_sale_type: asset.type,
                                                s_sale_asset_contract: request.take_contract,
                                                s_sale_asset_token_id: asset.asset_token_id,
                                                s_sale: {
                                                    sale_amount: new bignumber_js_1.default(updateRequest.price),
                                                    sale_asset_qty: new bignumber_js_1.default(make.value),
                                                    sale_max_fees_base_boint: 10000,
                                                    sale_end: expirationDate,
                                                    sale_start: undefined,
                                                    sale_origin_fees: order.data["@type"] === "TEZOS_RARIBLE_V2" ? (0, common_1.convertUnionParts)(order.data.originFees) : [],
                                                    sale_payouts: order.data["@type"] === "TEZOS_RARIBLE_V2" ? (0, common_1.convertUnionParts)(order.data.payouts) : [],
                                                    sale_data: undefined,
                                                    sale_data_type: undefined,
                                                },
                                            };
                                            return [4 /*yield*/, (0, sell_1.sellV2)(provider, tezosRequest)];
                                        case 2:
                                            sellOrderId = _a.sent();
                                            return [2 /*return*/, (0, common_1.convertTezosOrderId)(sellOrderId)];
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
                                submit: updateAction,
                            }];
                }
            });
        });
    };
    TezosSell.prototype.sellV1 = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, makerPublicKey, _a, tokenId, contract, requestCurrency, collectionType, tezosRequest, sellOrder;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        return [4 /*yield*/, (0, common_1.getMakerPublicKey)(provider)];
                    case 1:
                        makerPublicKey = _c.sent();
                        _a = (0, common_1.getTezosItemData)(request.itemId), tokenId = _a.tokenId, contract = _a.contract;
                        requestCurrency = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                        return [4 /*yield*/, (0, common_1.getCollectionType)(this.provider, contract)];
                    case 2:
                        collectionType = _c.sent();
                        _b = {
                            maker: (0, tezos_sdk_1.pk_to_pkh)(makerPublicKey),
                            maker_edpk: makerPublicKey,
                            make_asset_type: {
                                asset_class: (0, common_1.getCollectionTypeAssetClass)(collectionType),
                                contract: contract,
                                token_id: new bignumber_js_1.default(tokenId),
                            }
                        };
                        return [4 /*yield*/, this.parseTakeAssetType(requestCurrency)];
                    case 3:
                        _b.take_asset_type = _c.sent(),
                            _b.amount = new bignumber_js_1.default(request.amount),
                            _b.price = new bignumber_js_1.default(request.price);
                        return [4 /*yield*/, (0, common_1.getPayouts)(provider, request.payouts)];
                    case 4:
                        tezosRequest = (_b.payouts = _c.sent(),
                            _b.origin_fees = (0, common_1.convertUnionParts)(request.originFees),
                            _b);
                        return [4 /*yield*/, (0, tezos_sdk_1.sell)(provider, tezosRequest)];
                    case 5:
                        sellOrder = _c.sent();
                        return [2 /*return*/, (0, common_1.convertTezosOrderId)(sellOrder.hash)];
                }
            });
        });
    };
    return TezosSell;
}());
exports.TezosSell = TezosSell;
