"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaBalance = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var address_converters_1 = require("./common/address-converters");
var order_1 = require("./common/order");
var auction_house_1 = require("./common/auction-house");
var SolanaBalance = /** @class */ (function () {
    function SolanaBalance(sdk, wallet, apis, config) {
        var _this = this;
        this.sdk = sdk;
        this.wallet = wallet;
        this.apis = apis;
        this.config = config;
        this.depositBiddingBalance = action_1.Action
            .create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var auctionHouse, prepare;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.wallet) {
                                throw new Error("Solana wallet not provided");
                            }
                            return [4 /*yield*/, this.getAuctionHouse(request)];
                        case 1:
                            auctionHouse = _a.sent();
                            return [4 /*yield*/, this.sdk.auctionHouse.depositEscrow({
                                    auctionHouse: auctionHouse,
                                    signer: this.wallet.provider,
                                    amount: request.amount,
                                })];
                        case 2:
                            prepare = _a.sent();
                            return [4 /*yield*/, prepare.submit("processed")];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        })
            .after(function (tx) { return new sdk_transaction_1.BlockchainSolanaTransaction(tx, _this.sdk); });
        this.withdrawBiddingBalance = action_1.Action
            .create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var auctionHouse, prepare;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.wallet) {
                                throw new Error("Solana wallet not provided");
                            }
                            return [4 /*yield*/, this.getAuctionHouse(request)];
                        case 1:
                            auctionHouse = _a.sent();
                            return [4 /*yield*/, this.sdk.auctionHouse.withdrawEscrow({
                                    auctionHouse: auctionHouse,
                                    signer: this.wallet.provider,
                                    amount: request.amount,
                                })];
                        case 2:
                            prepare = _a.sent();
                            return [4 /*yield*/, prepare.submit("processed")];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        })
            .after(function (tx) { return new sdk_transaction_1.BlockchainSolanaTransaction(tx, _this.sdk); });
        this.getBalance = this.getBalance.bind(this);
        this.getBiddingBalance = this.getBiddingBalance.bind(this);
        this.depositBiddingBalance = this.depositBiddingBalance.bind(this);
        this.withdrawBiddingBalance = this.withdrawBiddingBalance.bind(this);
    }
    SolanaBalance.prototype.getBalance = function (address, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetType;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(currency);
                        if (!(assetType["@type"] === "SOLANA_SOL")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sdk.balances.getBalance((0, address_converters_1.extractPublicKey)(address), { commitment: "max" })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(assetType["@type"] === "SOLANA_NFT")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sdk.balances.getTokenBalance((0, address_converters_1.extractPublicKey)(address), (0, address_converters_1.extractPublicKey)(assetType.itemId))];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error("Unsupported asset type");
                }
            });
        });
    };
    SolanaBalance.prototype.getAuctionHouse = function (currencyOrOrder) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetType, order;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!("currency" in currencyOrOrder)) return [3 /*break*/, 1];
                        assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(currencyOrOrder.currency);
                        if (assetType["@type"] !== "SOLANA_SOL" && assetType["@type"] !== "SOLANA_NFT") {
                            throw new Error("Unsupported currency asset type (" + assetType["@type"] + ")");
                        }
                        return [2 /*return*/, (0, auction_house_1.getAuctionHouse)(assetType, (_a = this.config) === null || _a === void 0 ? void 0 : _a.auctionHouseMapping)];
                    case 1:
                        order = undefined;
                        if (!("order" in currencyOrOrder)) return [3 /*break*/, 2];
                        order = currencyOrOrder.order;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!("orderId" in currencyOrOrder)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.apis.order.getOrderById({ id: currencyOrOrder.orderId })];
                    case 3:
                        order = _c.sent();
                        _c.label = 4;
                    case 4:
                        if (order) {
                            return [2 /*return*/, (0, address_converters_1.extractPublicKey)((0, order_1.getOrderData)(order).auctionHouse)];
                        }
                        else {
                            return [2 /*return*/, (0, auction_house_1.getAuctionHouse)({ "@type": "SOLANA_SOL" }, (_b = this.config) === null || _b === void 0 ? void 0 : _b.auctionHouseMapping)];
                        }
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolanaBalance.prototype.getBiddingBalance = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auctionHouse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, this.getAuctionHouse(request)];
                    case 1:
                        auctionHouse = _a.sent();
                        return [4 /*yield*/, this.sdk.auctionHouse.getEscrowBalance({
                                auctionHouse: auctionHouse,
                                signer: this.wallet.provider,
                                wallet: (0, address_converters_1.extractPublicKey)(request.walletAddress),
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SolanaBalance;
}());
exports.SolanaBalance = SolanaBalance;
