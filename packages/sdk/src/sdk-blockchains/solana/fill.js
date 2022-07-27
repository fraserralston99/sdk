"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaFill = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var api_client_1 = require("@rarible/api-client");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var domain_1 = require("../../types/order/fill/domain");
var address_converters_1 = require("./common/address-converters");
var order_1 = require("./common/order");
var auction_house_1 = require("./common/auction-house");
var SolanaFill = /** @class */ (function () {
    function SolanaFill(sdk, wallet, apis, config) {
        this.sdk = sdk;
        this.wallet = wallet;
        this.apis = apis;
        this.config = config;
        this.fill = this.fill.bind(this);
    }
    SolanaFill.isBuyOrder = function (order) {
        return order.make.type["@type"] === "SOLANA_NFT";
    };
    SolanaFill.prototype.fill = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var order;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, (0, order_1.getPreparedOrder)(request, this.apis)];
                    case 1:
                        order = _a.sent();
                        if (order.status !== api_client_1.OrderStatus.ACTIVE) {
                            throw new Error("Order is not active");
                        }
                        return [2 /*return*/, SolanaFill.isBuyOrder(order) ? this.buy(order) : this.acceptBid(order)];
                }
            });
        });
    };
    SolanaFill.prototype.buy = function (order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auctionHouse, mint, price, item, submit;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auctionHouse = (0, address_converters_1.extractPublicKey)((0, order_1.getOrderData)(order).auctionHouse);
                        mint = (0, order_1.getMintId)(order);
                        price = (0, order_1.getPrice)(order);
                        return [4 /*yield*/, this.apis.item.getItemById({ itemId: (0, order_1.getItemId)(mint) })];
                    case 1:
                        item = _a.sent();
                        submit = action_1.Action
                            .create({
                            id: "send-tx",
                            run: function (buyRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var transactions, _a, _b, tokenAccount, accountInfo, _c, _d, _e, _f;
                                return tslib_1.__generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0:
                                            transactions = [];
                                            // make buy order
                                            _b = (_a = transactions).push;
                                            return [4 /*yield*/, this.sdk.order.buy({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    mint: mint,
                                                    price: price,
                                                    tokensAmount: buyRequest.amount,
                                                })];
                                        case 1:
                                            // make buy order
                                            _b.apply(_a, [_g.sent()]);
                                            return [4 /*yield*/, this.sdk.account.getTokenAccountForMint({
                                                    mint: mint,
                                                    owner: this.wallet.provider.publicKey,
                                                })];
                                        case 2:
                                            tokenAccount = _g.sent();
                                            if (!tokenAccount) return [3 /*break*/, 5];
                                            return [4 /*yield*/, this.sdk.account.getAccountInfo({ tokenAccount: tokenAccount, mint: mint })];
                                        case 3:
                                            accountInfo = _g.sent();
                                            if (!(accountInfo.delegate && accountInfo.amount.toString() === "0")) return [3 /*break*/, 5];
                                            _d = (_c = transactions).push;
                                            return [4 /*yield*/, this.sdk.account.revokeDelegate({
                                                    signer: this.wallet.provider,
                                                    tokenAccount: tokenAccount,
                                                })];
                                        case 4:
                                            _d.apply(_c, [_g.sent()]);
                                            _g.label = 5;
                                        case 5:
                                            // execute sell
                                            _f = (_e = transactions).push;
                                            return [4 /*yield*/, this.sdk.order.executeSell({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    buyerWallet: this.wallet.provider.publicKey,
                                                    sellerWallet: (0, address_converters_1.extractPublicKey)(order.maker),
                                                    mint: mint,
                                                    price: price,
                                                    tokensAmount: buyRequest.amount,
                                                })];
                                        case 6:
                                            // execute sell
                                            _f.apply(_e, [_g.sent()]);
                                            return [2 /*return*/, this.sdk.unionInstructionsAndSend(this.wallet.provider, transactions, "processed")];
                                    }
                                });
                            }); },
                        })
                            .after(function (tx) { return new sdk_transaction_1.BlockchainSolanaTransaction(tx, _this.sdk); });
                        return [2 /*return*/, {
                                multiple: parseFloat(item.supply.toString()) > 1,
                                maxAmount: order.makeStock,
                                baseFee: 0,
                                supportsPartialFill: false,
                                originFeeSupport: domain_1.OriginFeeSupport.NONE,
                                payoutsSupport: domain_1.PayoutsSupport.NONE,
                                maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                                submit: submit,
                            }];
                }
            });
        });
    };
    SolanaFill.prototype.acceptBid = function (order) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auctionHouse, mint, price, item, submit;
            var _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        auctionHouse = (0, address_converters_1.extractPublicKey)((0, order_1.getOrderData)(order).auctionHouse);
                        mint = (0, order_1.getMintId)(order);
                        price = (0, order_1.getPrice)(order);
                        return [4 /*yield*/, this.apis.item.getItemById({ itemId: (0, order_1.getItemId)(mint) })];
                    case 1:
                        item = _c.sent();
                        submit = action_1.Action
                            .create({
                            id: "send-tx",
                            run: function (buyRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var sellPrepare, executePrepare;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.sdk.order.sell({
                                                auctionHouse: auctionHouse,
                                                signer: this.wallet.provider,
                                                mint: mint,
                                                price: price,
                                                tokensAmount: buyRequest.amount,
                                            })];
                                        case 1:
                                            sellPrepare = _a.sent();
                                            return [4 /*yield*/, this.sdk.order.executeSell({
                                                    auctionHouse: auctionHouse,
                                                    signer: this.wallet.provider,
                                                    buyerWallet: (0, address_converters_1.extractPublicKey)(order.maker),
                                                    sellerWallet: this.wallet.provider.publicKey,
                                                    mint: mint,
                                                    price: price,
                                                    tokensAmount: buyRequest.amount,
                                                })];
                                        case 2:
                                            executePrepare = _a.sent();
                                            return [2 /*return*/, this.sdk.unionInstructionsAndSend(this.wallet.provider, [sellPrepare, executePrepare], "processed")];
                                    }
                                });
                            }); },
                        })
                            .after(function (tx) { return new sdk_transaction_1.BlockchainSolanaTransaction(tx, _this.sdk); });
                        _b = {
                            multiple: parseFloat(item.supply.toString()) > 1,
                            maxAmount: order.makeStock
                        };
                        return [4 /*yield*/, (0, auction_house_1.getAuctionHouseFee)(auctionHouse, (_a = this.config) === null || _a === void 0 ? void 0 : _a.auctionHouseMapping)];
                    case 2: return [2 /*return*/, (_b.baseFee = _c.sent(),
                            _b.supportsPartialFill = false,
                            _b.originFeeSupport = domain_1.OriginFeeSupport.NONE,
                            _b.payoutsSupport = domain_1.PayoutsSupport.NONE,
                            _b.maxFeesBasePointSupport = domain_1.MaxFeesBasePointSupport.IGNORED,
                            _b.submit = submit,
                            _b)];
                }
            });
        });
    };
    return SolanaFill;
}());
exports.SolanaFill = SolanaFill;
