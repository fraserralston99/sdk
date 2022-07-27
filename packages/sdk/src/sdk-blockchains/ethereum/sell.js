"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumSell = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var domain_1 = require("../../types/order/fill/domain");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var common = tslib_1.__importStar(require("./common"));
var common_1 = require("./common");
var EthereumSell = /** @class */ (function () {
    function EthereumSell(sdk, network, config) {
        this.sdk = sdk;
        this.network = network;
        this.config = config;
        this.blockchain = (0, common_1.getEVMBlockchain)(network);
        this.sell = this.sell.bind(this);
        this.update = this.update.bind(this);
    }
    EthereumSell.prototype.sell = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.useDataV3) {
                    return [2 /*return*/, this.sellDataV3()];
                }
                else {
                    return [2 /*return*/, this.sellDataV2()];
                }
                return [2 /*return*/];
            });
        });
    };
    EthereumSell.prototype.sellDataV2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sellAction;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sellAction = this.sdk.order.sell
                            .before(function (sellFormRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var itemId, item, expirationDate, currencyAssetType;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        itemId = (0, common_1.getEthereumItemId)(sellFormRequest.itemId).itemId;
                                        return [4 /*yield*/, this.sdk.apis.nftItem.getNftItemById({ itemId: itemId })];
                                    case 1:
                                        item = _a.sent();
                                        expirationDate = sellFormRequest.expirationDate instanceof Date
                                            ? Math.floor(sellFormRequest.expirationDate.getTime() / 1000)
                                            : undefined;
                                        currencyAssetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(sellFormRequest.currency);
                                        return [2 /*return*/, {
                                                type: "DATA_V2",
                                                makeAssetType: {
                                                    tokenId: item.tokenId,
                                                    contract: item.contract,
                                                },
                                                amount: sellFormRequest.amount,
                                                takeAssetType: common.getEthTakeAssetType(currencyAssetType),
                                                priceDecimal: sellFormRequest.price,
                                                payouts: common.toEthereumParts(sellFormRequest.payouts),
                                                originFees: common.toEthereumParts(sellFormRequest.originFees),
                                                end: expirationDate,
                                            }];
                                }
                            });
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        _a = {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: common.getSupportedCurrencies()
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee()];
                    case 1: return [2 /*return*/, (_a.baseFee = _b.sent(),
                            _a.supportsExpirationDate = true,
                            _a.submit = sellAction,
                            _a)];
                }
            });
        });
    };
    EthereumSell.prototype.sellDataV3 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sellAction;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sellAction = this.sdk.order.sell
                            .before(function (sellFormRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var itemId, item, expirationDate, currencyAssetType, payouts, originFees;
                            var _a, _b, _c;
                            return tslib_1.__generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        (0, common_1.validateOrderDataV3Request)(sellFormRequest, { shouldProvideMaxFeesBasePoint: true });
                                        itemId = (0, common_1.getEthereumItemId)(sellFormRequest.itemId).itemId;
                                        return [4 /*yield*/, this.sdk.apis.nftItem.getNftItemById({ itemId: itemId })];
                                    case 1:
                                        item = _d.sent();
                                        expirationDate = sellFormRequest.expirationDate instanceof Date
                                            ? Math.floor(sellFormRequest.expirationDate.getTime() / 1000)
                                            : undefined;
                                        currencyAssetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(sellFormRequest.currency);
                                        payouts = common.toEthereumParts(sellFormRequest.payouts);
                                        originFees = common.toEthereumParts(sellFormRequest.originFees);
                                        return [2 /*return*/, {
                                                type: "DATA_V3_SELL",
                                                makeAssetType: {
                                                    tokenId: item.tokenId,
                                                    contract: item.contract,
                                                },
                                                payout: payouts[0],
                                                originFeeFirst: originFees[0],
                                                originFeeSecond: originFees[1],
                                                maxFeesBasePoint: (_a = sellFormRequest.maxFeesBasePoint) !== null && _a !== void 0 ? _a : 0,
                                                marketplaceMarker: ((_b = this.config) === null || _b === void 0 ? void 0 : _b.marketplaceMarker) ? (0, types_1.toWord)((_c = this.config) === null || _c === void 0 ? void 0 : _c.marketplaceMarker) : undefined,
                                                amount: sellFormRequest.amount,
                                                takeAssetType: common.getEthTakeAssetType(currencyAssetType),
                                                priceDecimal: sellFormRequest.price,
                                                end: expirationDate,
                                            }];
                                }
                            });
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        _a = {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.SINGLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.REQUIRED,
                            supportedCurrencies: common.getSupportedCurrencies()
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee()];
                    case 1: return [2 /*return*/, (_a.baseFee = _b.sent(),
                            _a.supportsExpirationDate = true,
                            _a.submit = sellAction,
                            _a)];
                }
            });
        });
    };
    EthereumSell.prototype.update = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, blockchain, hash, order, sellUpdateAction;
            var _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!prepareRequest.orderId) {
                            throw new Error("OrderId has not been specified");
                        }
                        _a = tslib_1.__read(prepareRequest.orderId.split(":"), 2), blockchain = _a[0], hash = _a[1];
                        if (!(0, common_1.isEVMBlockchain)(blockchain)) {
                            throw new Error("Not an ethereum order");
                        }
                        return [4 /*yield*/, this.sdk.apis.order.getOrderByHash({ hash: hash })];
                    case 1:
                        order = _c.sent();
                        if (order.type !== "RARIBLE_V2" && order.type !== "RARIBLE_V1") {
                            throw new Error("Unable to update sell ".concat(JSON.stringify(order)));
                        }
                        sellUpdateAction = this.sdk.order.sellUpdate
                            .before(function (request) { return ({
                            orderHash: (0, types_1.toWord)(hash),
                            priceDecimal: request.price,
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        _b = {
                            originFeeSupport: (0, common_1.getOriginFeeSupport)(order.type),
                            payoutsSupport: (0, common_1.getPayoutsSupport)(order.type),
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: common.getSupportedCurrencies()
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee(order.type)];
                    case 2: return [2 /*return*/, (_b.baseFee = _c.sent(),
                            _b.submit = sellUpdateAction,
                            _b)];
                }
            });
        });
    };
    return EthereumSell;
}());
exports.EthereumSell = EthereumSell;
