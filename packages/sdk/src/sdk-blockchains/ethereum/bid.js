"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBid = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var big_number_1 = require("@rarible/types/build/big-number");
var api_client_1 = require("@rarible/api-client");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var action_1 = require("@rarible/action");
var add_fee_1 = require("@rarible/protocol-ethereum-sdk/build/order/add-fee");
var get_decimals_1 = require("@rarible/protocol-ethereum-sdk/build/common/get-decimals");
var get_price_1 = require("@rarible/protocol-ethereum-sdk/build/common/get-price");
var domain_1 = require("../../types/order/fill/domain");
var get_convertable_value_1 = require("../../common/get-convertable-value");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var common = tslib_1.__importStar(require("./common"));
var common_1 = require("./common");
var EthereumBid = /** @class */ (function () {
    function EthereumBid(sdk, wallet, balanceService, network, config) {
        this.sdk = sdk;
        this.wallet = wallet;
        this.balanceService = balanceService;
        this.network = network;
        this.config = config;
        this.blockchain = (0, common_1.getEVMBlockchain)(network);
        this.bid = this.bid.bind(this);
        this.update = this.update.bind(this);
        this.getConvertableValue = this.getConvertableValue.bind(this);
        this.convertCurrency = this.convertCurrency.bind(this);
    }
    EthereumBid.prototype.convertAssetType = function (assetType) {
        switch (assetType.assetClass) {
            case "ETH": {
                return {
                    "@type": "ETH",
                };
            }
            case "ERC20": {
                return {
                    "@type": "ERC20",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                };
            }
            case "ERC721": {
                return {
                    "@type": "ERC721",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                    tokenId: assetType.tokenId,
                };
            }
            case "ERC721_LAZY": {
                return {
                    "@type": "ERC721_Lazy",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                    tokenId: assetType.tokenId,
                    uri: assetType.uri,
                    creators: assetType.creators.map(function (c) { return ({
                        account: (0, types_1.toUnionAddress)(c.account),
                        value: c.value,
                    }); }),
                    royalties: assetType.royalties.map(function (r) { return ({
                        account: (0, types_1.toUnionAddress)(r.account),
                        value: r.value,
                    }); }),
                    signatures: assetType.signatures.map(function (str) { return (0, types_1.toBinary)(str); }),
                };
            }
            case "ERC1155": {
                return {
                    "@type": "ERC1155",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                    tokenId: assetType.tokenId,
                };
            }
            case "ERC1155_LAZY": {
                return {
                    "@type": "ERC1155_Lazy",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                    tokenId: assetType.tokenId,
                    uri: assetType.uri,
                    supply: assetType.supply !== undefined
                        ? (0, big_number_1.toBigNumber)(assetType.supply)
                        : (0, big_number_1.toBigNumber)("1"),
                    creators: assetType.creators.map(function (c) { return ({
                        account: (0, types_1.toUnionAddress)(c.account),
                        value: c.value,
                    }); }),
                    royalties: assetType.royalties.map(function (r) { return ({
                        account: (0, types_1.toUnionAddress)(r.account),
                        value: r.value,
                    }); }),
                    signatures: assetType.signatures.map(types_1.toBinary),
                };
            }
            case "GEN_ART": {
                return {
                    "@type": "GEN_ART",
                    contract: (0, common_1.convertEthereumContractAddress)(assetType.contract, this.blockchain),
                };
            }
            default: {
                throw new Error("Unsupported asset type ".concat(assetType.assetClass));
            }
        }
    };
    EthereumBid.prototype.getWethContractAddress = function () {
        var convertMap = this.getConvertMap();
        var wethAddressEntry = Object.entries(convertMap)
            .find(function (_a) {
            var _b = tslib_1.__read(_a, 2), contractAddr = _b[0], currency = _b[1];
            return contractAddr && currency === "ETH";
        });
        if (!wethAddressEntry) {
            throw new Error("Weth contract address has not been found");
        }
        var _a = tslib_1.__read(wethAddressEntry, 1), wethUnionContract = _a[0];
        return (0, types_1.toContractAddress)(wethUnionContract);
    };
    EthereumBid.prototype.bid = function (prepare) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.useDataV3) {
                    return [2 /*return*/, this.bidDataV3(prepare)];
                }
                else {
                    return [2 /*return*/, this.bidDataV2(prepare)];
                }
                return [2 /*return*/];
            });
        });
    };
    EthereumBid.prototype.bidDataV2 = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contractAddress, item, takeAssetType, itemId, collection, bidAction, submit;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("itemId" in prepare)) return [3 /*break*/, 2];
                        itemId = (0, common_1.getEthereumItemId)(prepare.itemId).itemId;
                        return [4 /*yield*/, this.sdk.apis.nftItem.getNftItemById({ itemId: itemId })];
                    case 1:
                        item = _b.sent();
                        contractAddress = item.contract;
                        takeAssetType = {
                            tokenId: item.tokenId,
                            contract: item.contract,
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        if ("collectionId" in prepare) {
                            contractAddress = (0, common_1.convertToEthereumAddress)(prepare.collectionId);
                            takeAssetType = {
                                assetClass: "COLLECTION",
                                contract: contractAddress,
                            };
                        }
                        else {
                            throw new Error("ItemId or CollectionId must be assigned");
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.sdk.apis.nftCollection.getNftCollectionById({
                            collection: contractAddress,
                        })];
                    case 4:
                        collection = _b.sent();
                        bidAction = this.sdk.order.bid
                            .before(function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var expirationDate, currencyAssetType;
                            return tslib_1.__generator(this, function (_a) {
                                expirationDate = request.expirationDate instanceof Date
                                    ? Math.floor(request.expirationDate.getTime() / 1000)
                                    : undefined;
                                currencyAssetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                                return [2 /*return*/, {
                                        type: "DATA_V2",
                                        makeAssetType: common.getEthTakeAssetType(currencyAssetType),
                                        takeAssetType: takeAssetType,
                                        amount: request.amount,
                                        priceDecimal: request.price,
                                        payouts: common.toEthereumParts(request.payouts),
                                        originFees: common.toEthereumParts(request.originFees),
                                        end: expirationDate,
                                    }];
                            });
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        submit = action_1.Action.create({
                            id: "convert",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var wethContractAddress, currency, originFeesSum, value;
                                var _a;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            wethContractAddress = this.getWethContractAddress();
                                            currency = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                                            if (!(currency["@type"] === "ERC20" && currency.contract.toLowerCase() === wethContractAddress.toLowerCase())) return [3 /*break*/, 3];
                                            originFeesSum = ((_a = request.originFees) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, fee) { return fee.value; }, 0)) || 0;
                                            return [4 /*yield*/, this.getConvertableValueCommon(currency, request.price, request.amount, originFeesSum)];
                                        case 1:
                                            value = _b.sent();
                                            return [4 /*yield*/, this.convertCurrency(value)];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3: return [2 /*return*/, request];
                                    }
                                });
                            }); },
                        }).thenAction(bidAction);
                        _a = {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: common.getSupportedCurrencies(api_client_1.Blockchain.ETHEREUM, true),
                            multiple: collection.type === "ERC1155",
                            maxAmount: item ? item.supply : null
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee()];
                    case 5: return [2 /*return*/, (_a.baseFee = _b.sent(),
                            _a.getConvertableValue = this.getConvertableValue,
                            _a.supportsExpirationDate = true,
                            _a.submit = submit,
                            _a)];
                }
            });
        });
    };
    EthereumBid.prototype.bidDataV3 = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contractAddress, item, takeAssetType, itemId, collection, bidAction, submit;
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!("itemId" in prepare)) return [3 /*break*/, 2];
                        itemId = (0, common_1.getEthereumItemId)(prepare.itemId).itemId;
                        return [4 /*yield*/, this.sdk.apis.nftItem.getNftItemById({ itemId: itemId })];
                    case 1:
                        item = _b.sent();
                        contractAddress = item.contract;
                        takeAssetType = {
                            tokenId: item.tokenId,
                            contract: item.contract,
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        if ("collectionId" in prepare) {
                            contractAddress = (0, common_1.convertToEthereumAddress)(prepare.collectionId);
                            takeAssetType = {
                                assetClass: "COLLECTION",
                                contract: contractAddress,
                            };
                        }
                        else {
                            throw new Error("ItemId or CollectionId must be assigned");
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.sdk.apis.nftCollection.getNftCollectionById({
                            collection: contractAddress,
                        })];
                    case 4:
                        collection = _b.sent();
                        bidAction = this.sdk.order.bid
                            .before(function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var expirationDate, currencyAssetType, payouts, originFees;
                            var _a, _b;
                            return tslib_1.__generator(this, function (_c) {
                                (0, common_1.validateOrderDataV3Request)(request, { shouldProvideMaxFeesBasePoint: false });
                                expirationDate = request.expirationDate instanceof Date
                                    ? Math.floor(request.expirationDate.getTime() / 1000)
                                    : undefined;
                                currencyAssetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                                payouts = common.toEthereumParts(request.payouts);
                                originFees = common.toEthereumParts(request.originFees);
                                return [2 /*return*/, {
                                        type: "DATA_V3_BUY",
                                        makeAssetType: common.getEthTakeAssetType(currencyAssetType),
                                        takeAssetType: takeAssetType,
                                        amount: request.amount,
                                        priceDecimal: request.price,
                                        payout: payouts[0],
                                        originFeeFirst: originFees[0],
                                        originFeeSecond: originFees[1],
                                        marketplaceMarker: ((_a = this.config) === null || _a === void 0 ? void 0 : _a.marketplaceMarker) ? (0, types_1.toWord)((_b = this.config) === null || _b === void 0 ? void 0 : _b.marketplaceMarker) : undefined,
                                        end: expirationDate,
                                    }];
                            });
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        submit = action_1.Action.create({
                            id: "convert",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var wethContractAddress, currency, originFeesSum, value;
                                var _a;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            wethContractAddress = this.getWethContractAddress();
                                            currency = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currency);
                                            if (!(currency["@type"] === "ERC20" && currency.contract.toLowerCase() === wethContractAddress.toLowerCase())) return [3 /*break*/, 3];
                                            originFeesSum = ((_a = request.originFees) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, fee) { return fee.value; }, 0)) || 0;
                                            return [4 /*yield*/, this.getConvertableValueCommon(currency, request.price, request.amount, originFeesSum)];
                                        case 1:
                                            value = _b.sent();
                                            return [4 /*yield*/, this.convertCurrency(value)];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3: return [2 /*return*/, request];
                                    }
                                });
                            }); },
                        }).thenAction(bidAction);
                        _a = {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: common.getSupportedCurrencies(api_client_1.Blockchain.ETHEREUM, true),
                            multiple: collection.type === "ERC1155",
                            maxAmount: item ? item.supply : null
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee()];
                    case 5: return [2 /*return*/, (_a.baseFee = _b.sent(),
                            _a.getConvertableValue = this.getConvertableValue,
                            _a.supportsExpirationDate = true,
                            _a.submit = submit,
                            _a)];
                }
            });
        });
    };
    EthereumBid.prototype.getConvertMap = function () {
        var convertMap = {};
        var wethAddress = this.sdk.balances.getWethContractAddress();
        if (wethAddress) {
            convertMap[(0, common_1.convertEthereumContractAddress)(wethAddress, this.blockchain)] = "ETH";
        }
        return convertMap;
    };
    EthereumBid.prototype.getConvertableValue = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var convertMap, assetType, originFeesSum;
            return tslib_1.__generator(this, function (_a) {
                convertMap = this.getConvertMap();
                if (request.assetType) {
                    assetType = request.assetType;
                }
                else if (request.currencyId) {
                    assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(request.currencyId);
                }
                else {
                    throw new Error("assetType or currencyId should be specified");
                }
                if (assetType["@type"] === "ERC20" && assetType.contract in convertMap) {
                    originFeesSum = request.originFees.reduce(function (acc, fee) { return fee.value; }, 0);
                    return [2 /*return*/, this.getConvertableValueCommon(assetType, request.price, request.amount, originFeesSum)];
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    EthereumBid.prototype.getConvertableValueCommon = function (assetType, price, amount, originFeesSum) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var convertedAssetType, value, convertedPrice, baseFee, completeFee, valueWithFee, assetDecimals, finishValue, walletAddress;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Wallet is undefined");
                        }
                        convertedAssetType = (0, common_1.convertToEthereumAssetType)(assetType);
                        value = new bignumber_js_1.default(price).multipliedBy(amount);
                        return [4 /*yield*/, (0, get_price_1.getPrice)(this.wallet.ethereum, convertedAssetType, value)];
                    case 1:
                        convertedPrice = _a.sent();
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee()];
                    case 2:
                        baseFee = _a.sent();
                        completeFee = originFeesSum + baseFee;
                        valueWithFee = (0, add_fee_1.addFee)({ assetType: convertedAssetType, value: (0, big_number_1.toBigNumber)(convertedPrice.toString()) }, new bignumber_js_1.default(completeFee));
                        return [4 /*yield*/, (0, get_decimals_1.getDecimals)(this.wallet.ethereum, convertedAssetType)];
                    case 3:
                        assetDecimals = _a.sent();
                        finishValue = new bignumber_js_1.default(valueWithFee.value)
                            .integerValue()
                            .div(new bignumber_js_1.default(10).pow(assetDecimals));
                        return [4 /*yield*/, this.wallet.ethereum.getFrom()];
                    case 4:
                        walletAddress = _a.sent();
                        return [2 /*return*/, (0, get_convertable_value_1.getCommonConvertableValue)(this.balanceService.getBalance, (0, common_1.convertEthereumToUnionAddress)(walletAddress, api_client_1.Blockchain.ETHEREUM), new bignumber_js_1.default(finishValue), { "@type": "ETH", blockchain: this.blockchain }, assetType)];
                }
            });
        });
    };
    EthereumBid.prototype.convertCurrency = function (convertableValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wethContract, tx;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wethContract = this.getWethContractAddress();
                        if (!this.wallet) {
                            throw new Error("Wallet is undefined");
                        }
                        if (convertableValue === undefined) {
                            return [2 /*return*/];
                        }
                        if (convertableValue.type === "insufficient") {
                            throw new Error("Insufficient ETH funds");
                        }
                        if (!(convertableValue.type === "convertable")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sdk.balances.convert((0, common_1.convertToEthereumAssetType)({ "@type": "ETH" }), (0, common_1.convertToEthereumAssetType)({ "@type": "ERC20", contract: wethContract }), convertableValue.value)];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EthereumBid.prototype.update = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, blockchain, hash, order, bidUpdateAction, sellUpdateAction;
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
                            throw new Error("Unable to update bid ".concat(JSON.stringify(order)));
                        }
                        bidUpdateAction = this.sdk.order.bidUpdate
                            .before(function (request) { return ({
                            orderHash: (0, types_1.toWord)(hash),
                            priceDecimal: request.price,
                        }); })
                            .after(function (order) { return common.convertEthereumOrderHash(order.hash, _this.blockchain); });
                        sellUpdateAction = action_1.Action.create({
                            id: "convert",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var wethContractAddress, value;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            wethContractAddress = (0, common_1.convertToEthereumAddress)(this.getWethContractAddress());
                                            if (!(order.make.assetType.assetClass === "ERC20" && order.make.assetType.contract.toLowerCase() === wethContractAddress.toLowerCase())) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.getConvertableValueCommon(this.convertAssetType(order.make.assetType), request.price, parseInt(order.take.value), (0, common_1.getOrderFeesSum)(order))];
                                        case 1:
                                            value = _a.sent();
                                            return [4 /*yield*/, this.convertCurrency(value)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/, request];
                                    }
                                });
                            }); },
                        }).thenAction(bidUpdateAction);
                        _b = {
                            originFeeSupport: (0, common_1.getOriginFeeSupport)(order.type),
                            payoutsSupport: (0, common_1.getPayoutsSupport)(order.type),
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportedCurrencies: common.getSupportedCurrencies(api_client_1.Blockchain.ETHEREUM, true)
                        };
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFee(order.type)];
                    case 2: return [2 /*return*/, (_b.baseFee = _c.sent(),
                            _b.getConvertableValue = this.getConvertableValue,
                            _b.submit = sellUpdateAction,
                            _b)];
                }
            });
        });
    };
    return EthereumBid;
}());
exports.EthereumBid = EthereumBid;
