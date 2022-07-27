"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBalance = void 0;
var tslib_1 = require("tslib");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var common_1 = require("./common");
var EthereumBalance = /** @class */ (function () {
    function EthereumBalance(sdk, apis, network) {
        var _this = this;
        this.sdk = sdk;
        this.apis = apis;
        this.network = network;
        this.depositBiddingBalance = action_1.Action
            .create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.convert({
                            blockchain: api_client_1.Blockchain.ETHEREUM,
                            isWrap: true,
                            value: request.amount,
                        })];
                });
            }); },
        });
        this.withdrawBiddingBalance = action_1.Action
            .create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.convert({
                            blockchain: api_client_1.Blockchain.ETHEREUM,
                            isWrap: false,
                            value: request.amount,
                        })];
                });
            }); },
        });
        this.getBalance = this.getBalance.bind(this);
        this.convert = this.convert.bind(this);
        this.getBiddingBalance = this.getBiddingBalance.bind(this);
    }
    EthereumBalance.prototype.getBalance = function (address, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetType, convertedAssetType, ethAddress;
            return tslib_1.__generator(this, function (_a) {
                assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(currency);
                convertedAssetType = (0, common_1.convertToEthereumAssetType)(assetType);
                if (convertedAssetType.assetClass !== "ETH" && convertedAssetType.assetClass !== "ERC20") {
                    throw new Error("Unsupported asset type for getting balance");
                }
                ethAddress = (0, common_1.convertToEthereumAddress)(address);
                return [2 /*return*/, this.sdk.balances.getBalance(ethAddress, convertedAssetType)];
            });
        });
    };
    EthereumBalance.prototype.convert = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wethContract, from, to, tx;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wethContract = this.sdk.balances.getWethContractAddress();
                        if (request.isWrap) {
                            from = { assetClass: "ETH" };
                            to = {
                                assetClass: "ERC20",
                                contract: wethContract,
                            };
                        }
                        else {
                            from = {
                                assetClass: "ERC20",
                                contract: wethContract,
                            };
                            to = { assetClass: "ETH" };
                        }
                        return [4 /*yield*/, this.sdk.balances.convert(from, to, request.value)];
                    case 1:
                        tx = _a.sent();
                        return [2 /*return*/, new sdk_transaction_1.BlockchainEthereumTransaction(tx, this.network)];
                }
            });
        });
    };
    EthereumBalance.prototype.getBiddingBalance = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wethContract;
            return tslib_1.__generator(this, function (_a) {
                if ("currency" in request) {
                    return [2 /*return*/, this.getBalance(request.walletAddress, request.currency)];
                }
                else {
                    wethContract = this.sdk.balances.getWethContractAddress();
                    return [2 /*return*/, this.getBalance(request.walletAddress, {
                            "@type": "ERC20",
                            contract: (0, types_1.toContractAddress)("ETHEREUM:" + wethContract),
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    return EthereumBalance;
}());
exports.EthereumBalance = EthereumBalance;
