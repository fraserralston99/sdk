"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaOrder = void 0;
var tslib_1 = require("tslib");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var domain_1 = require("../../types/order/fill/domain");
var auction_house_1 = require("./common/auction-house");
var address_converters_1 = require("./common/address-converters");
var order_1 = require("./common/order");
var currencies_1 = require("./common/currencies");
var SolanaOrder = /** @class */ (function () {
    function SolanaOrder(sdk, wallet, apis, config) {
        var _this = this;
        this.sdk = sdk;
        this.wallet = wallet;
        this.apis = apis;
        this.config = config;
        this.cancel = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var order, orderData, amount, res;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, order_1.getPreparedOrder)(request, this.apis)];
                        case 1:
                            order = _a.sent();
                            orderData = (0, order_1.getOrderData)(order);
                            amount = (0, order_1.getTokensAmount)(order);
                            return [4 /*yield*/, this.sdk.order.cancel({
                                    auctionHouse: (0, address_converters_1.extractPublicKey)(orderData.auctionHouse),
                                    signer: this.wallet.provider,
                                    mint: (0, order_1.getMintId)(order),
                                    price: (0, order_1.getPrice)(order),
                                    tokensAmount: amount,
                                })];
                        case 2: return [4 /*yield*/, (_a.sent()).submit("processed")];
                        case 3:
                            res = _a.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainSolanaTransaction(res, this.sdk)];
                    }
                });
            }); },
        });
        this.sell = this.sell.bind(this);
        this.bid = this.bid.bind(this);
        this.sellUpdate = this.sellUpdate.bind(this);
        this.bidUpdate = this.bidUpdate.bind(this);
    }
    SolanaOrder.prototype.sell = function () {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auctionHouse, submit;
            var _c;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        auctionHouse = (0, auction_house_1.getAuctionHouse)({ "@type": "SOLANA_SOL" }, (_a = this.config) === null || _a === void 0 ? void 0 : _a.auctionHouseMapping);
                        submit = action_1.Action.create({
                            id: "send-tx",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var mint;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mint = (0, address_converters_1.extractPublicKey)(request.itemId);
                                            return [4 /*yield*/, this.sdk.order.sell({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    mint: mint,
                                                    price: new bignumber_js_1.default(request.price).multipliedBy(request.amount),
                                                    tokensAmount: request.amount,
                                                })];
                                        case 1: return [4 /*yield*/, (_a.sent()).submit("processed")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, (0, order_1.getOrderId)("SELL", this.wallet.provider.publicKey.toString(), mint.toString(), auctionHouse.toString())];
                                    }
                                });
                            }); },
                        });
                        _c = {
                            originFeeSupport: domain_1.OriginFeeSupport.NONE,
                            payoutsSupport: domain_1.PayoutsSupport.NONE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: (0, currencies_1.getCurrencies)()
                        };
                        return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(auctionHouse, (_b = this.config) === null || _b === void 0 ? void 0 : _b.auctionHouseMapping)];
                    case 1: return [2 /*return*/, (_c.baseFee = _d.sent(),
                            _c.supportsExpirationDate = false,
                            _c.submit = submit,
                            _c)];
                }
            });
        });
    };
    SolanaOrder.prototype.sellUpdate = function (prepareRequest) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var order, amount, auctionHouse, updateAction;
            var _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, (0, order_1.getPreparedOrder)(prepareRequest, this.apis)];
                    case 1:
                        order = _c.sent();
                        amount = (0, order_1.getTokensAmount)(order);
                        auctionHouse = (0, address_converters_1.extractPublicKey)((0, order_1.getOrderData)(order).auctionHouse);
                        updateAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (updateRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var mint;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mint = (0, order_1.getMintId)(order);
                                            return [4 /*yield*/, this.sdk.order.sell({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    mint: mint,
                                                    price: new bignumber_js_1.default(updateRequest.price).multipliedBy(amount),
                                                    tokensAmount: amount,
                                                })];
                                        case 1: return [4 /*yield*/, (_a.sent()).submit("processed")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, (0, order_1.getOrderId)("SELL", this.wallet.provider.publicKey.toString(), mint.toString(), auctionHouse.toString())];
                                    }
                                });
                            }); },
                        });
                        _b = {
                            originFeeSupport: domain_1.OriginFeeSupport.NONE,
                            payoutsSupport: domain_1.PayoutsSupport.NONE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: (0, currencies_1.getCurrencies)()
                        };
                        return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(auctionHouse, (_a = this.config) === null || _a === void 0 ? void 0 : _a.auctionHouseMapping)];
                    case 2: return [2 /*return*/, (_b.baseFee = _c.sent(),
                            _b.submit = updateAction,
                            _b)];
                }
            });
        });
    };
    SolanaOrder.prototype.getConvertableValue = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    SolanaOrder.prototype.bid = function (prepare) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auctionHouse, item, submit;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        if (!("itemId" in prepare)) {
                            throw new Error("No ItemId provided");
                        }
                        auctionHouse = (0, auction_house_1.getAuctionHouse)({ "@type": "SOLANA_SOL" }, (_a = this.config) === null || _a === void 0 ? void 0 : _a.auctionHouseMapping);
                        return [4 /*yield*/, this.apis.item.getItemById({ itemId: prepare.itemId })];
                    case 1:
                        item = _b.sent();
                        submit = action_1.Action.create({
                            id: "send-tx",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var mint;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mint = (0, address_converters_1.extractPublicKey)(prepare.itemId);
                                            return [4 /*yield*/, this.sdk.order.buy({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    mint: mint,
                                                    price: new bignumber_js_1.default(request.price).multipliedBy(request.amount),
                                                    tokensAmount: request.amount,
                                                })];
                                        case 1: return [4 /*yield*/, (_a.sent()).submit("processed")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, (0, order_1.getOrderId)("BUY", this.wallet.provider.publicKey.toString(), mint.toString(), auctionHouse.toString())];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/, {
                                multiple: parseFloat(item.supply) > 1,
                                maxAmount: (0, types_1.toBigNumber)(item.supply),
                                originFeeSupport: domain_1.OriginFeeSupport.NONE,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: (0, currencies_1.getCurrencies)(),
                                baseFee: 0,
                                getConvertableValue: this.getConvertableValue,
                                supportsExpirationDate: false,
                                submit: submit,
                            }];
                }
            });
        });
    };
    SolanaOrder.prototype.bidUpdate = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var order, amount, updateAction;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, (0, order_1.getPreparedOrder)(prepareRequest, this.apis)];
                    case 1:
                        order = _a.sent();
                        amount = (0, order_1.getTokensAmount)(order);
                        updateAction = action_1.Action.create({
                            id: "send-tx",
                            run: function (updateRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var mint, auctionHouse;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            mint = (0, order_1.getMintId)(order);
                                            auctionHouse = (0, address_converters_1.extractPublicKey)((0, order_1.getOrderData)(order).auctionHouse);
                                            return [4 /*yield*/, this.sdk.order.buy({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    mint: mint,
                                                    price: new bignumber_js_1.default(updateRequest.price).multipliedBy(amount),
                                                    tokensAmount: amount,
                                                })];
                                        case 1: return [4 /*yield*/, (_a.sent()).submit("processed")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, (0, order_1.getOrderId)("BUY", this.wallet.provider.publicKey.toString(), mint.toString(), auctionHouse.toString())];
                                    }
                                });
                            }); },
                        });
                        return [2 /*return*/, {
                                originFeeSupport: domain_1.OriginFeeSupport.NONE,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                supportedCurrencies: (0, currencies_1.getCurrencies)(),
                                baseFee: 0,
                                getConvertableValue: this.getConvertableValue,
                                submit: updateAction,
                            }];
                }
            });
        });
    };
    return SolanaOrder;
}());
exports.SolanaOrder = SolanaOrder;
