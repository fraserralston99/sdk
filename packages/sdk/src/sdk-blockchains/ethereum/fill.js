"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumFill = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bn_1 = require("@rarible/utils/build/bn");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var is_nft_1 = require("@rarible/protocol-ethereum-sdk/build/order/is-nft");
var get_ownership_id_1 = require("@rarible/protocol-ethereum-sdk/build/common/get-ownership-id");
var domain_1 = require("../../types/order/fill/domain");
var common_1 = require("./common");
var EthereumFill = /** @class */ (function () {
    function EthereumFill(sdk, wallet, network, config) {
        this.sdk = sdk;
        this.wallet = wallet;
        this.network = network;
        this.config = config;
        this.fill = this.fill.bind(this);
        this.buy = this.buy.bind(this);
        this.acceptBid = this.acceptBid.bind(this);
    }
    EthereumFill.prototype.getFillOrderRequest = function (order, fillRequest) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var request;
        switch (order.type) {
            case "RARIBLE_V1": {
                request = {
                    order: order,
                    amount: fillRequest.amount,
                    infinite: fillRequest.infiniteApproval,
                    originFee: ((_b = (_a = fillRequest.originFees) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) ? fillRequest.originFees[0].value : 0,
                    payout: ((_d = (_c = fillRequest.payouts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.account)
                        ? (0, common_1.convertToEthereumAddress)(fillRequest.payouts[0].account)
                        : undefined,
                };
                break;
            }
            case "RARIBLE_V2": {
                request = {
                    order: order,
                    amount: fillRequest.amount,
                    infinite: fillRequest.infiniteApproval,
                    payouts: (0, common_1.toEthereumParts)(fillRequest.payouts),
                    originFees: (0, common_1.toEthereumParts)(fillRequest.originFees),
                };
                switch (order.data.dataType) {
                    case "RARIBLE_V2_DATA_V3_BUY":
                        (0, common_1.validateOrderDataV3Request)(fillRequest, { shouldProvideMaxFeesBasePoint: true });
                        request.maxFeesBasePoint = fillRequest.maxFeesBasePoint;
                        request.marketplaceMarker =
                            ((_e = this.config) === null || _e === void 0 ? void 0 : _e.marketplaceMarker) ? (0, types_1.toWord)((_f = this.config) === null || _f === void 0 ? void 0 : _f.marketplaceMarker) : undefined;
                        break;
                    case "RARIBLE_V2_DATA_V3_SELL":
                        request.marketplaceMarker =
                            ((_g = this.config) === null || _g === void 0 ? void 0 : _g.marketplaceMarker) ? (0, types_1.toWord)((_h = this.config) === null || _h === void 0 ? void 0 : _h.marketplaceMarker) : undefined;
                        (0, common_1.validateOrderDataV3Request)(fillRequest, { shouldProvideMaxFeesBasePoint: false });
                        break;
                    default:
                }
                break;
            }
            case "OPEN_SEA_V1": {
                request = {
                    order: order,
                    originFees: order.take.assetType.assetClass === "ETH" ? (0, common_1.toEthereumParts)(fillRequest.originFees) : [],
                    payouts: (0, common_1.toEthereumParts)(fillRequest.payouts),
                    infinite: fillRequest.infiniteApproval,
                };
                break;
            }
            case "SEAPORT_V1": {
                request = {
                    order: order,
                    originFees: (0, common_1.toEthereumParts)(fillRequest.originFees),
                    amount: fillRequest.amount,
                };
                break;
            }
            default: {
                throw new Error("Unsupported order type");
            }
        }
        if (fillRequest.itemId) {
            var _j = (0, common_1.getEthereumItemId)(fillRequest.itemId), contract = _j.contract, tokenId = _j.tokenId;
            request.assetType = {
                contract: (0, types_1.toAddress)(contract),
                tokenId: tokenId,
            };
        }
        return request;
    };
    EthereumFill.prototype.getSupportFlags = function (order) {
        switch (order.type) {
            case "RARIBLE_V1": {
                return {
                    originFeeSupport: domain_1.OriginFeeSupport.AMOUNT_ONLY,
                    payoutsSupport: domain_1.PayoutsSupport.SINGLE,
                    maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                    supportsPartialFill: true,
                };
            }
            case "RARIBLE_V2": {
                switch (order.data.dataType) {
                    case "RARIBLE_V2_DATA_V3_BUY":
                        return {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.SINGLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.REQUIRED,
                            supportsPartialFill: true,
                        };
                    case "RARIBLE_V2_DATA_V3_SELL":
                        return {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.SINGLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportsPartialFill: true,
                        };
                    case "RARIBLE_V2_DATA_V2":
                    default:
                        return {
                            originFeeSupport: domain_1.OriginFeeSupport.FULL,
                            payoutsSupport: domain_1.PayoutsSupport.MULTIPLE,
                            maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                            supportsPartialFill: true,
                        };
                }
            }
            case "OPEN_SEA_V1": {
                return {
                    originFeeSupport: order.take.assetType.assetClass === "ETH" ? domain_1.OriginFeeSupport.FULL : domain_1.OriginFeeSupport.NONE,
                    payoutsSupport: domain_1.PayoutsSupport.SINGLE,
                    maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                    supportsPartialFill: false,
                };
            }
            case "SEAPORT_V1": {
                var supportsPartialFill = order.data.orderType === "PARTIAL_OPEN" || order.data.orderType === "PARTIAL_RESTRICTED";
                return {
                    originFeeSupport: domain_1.OriginFeeSupport.FULL,
                    payoutsSupport: domain_1.PayoutsSupport.NONE,
                    maxFeesBasePointSupport: domain_1.MaxFeesBasePointSupport.IGNORED,
                    supportsPartialFill: supportsPartialFill,
                };
            }
            default:
                throw new Error("Unsupported order type");
        }
    };
    EthereumFill.prototype.getMaxAmount = function (order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var address, ownershipId, ownership;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (order.take.assetType.assetClass === "COLLECTION") {
                            return [2 /*return*/, null];
                        }
                        if (!(0, is_nft_1.isNft)(order.take.assetType)) return [3 /*break*/, 3];
                        if (this.wallet === undefined) {
                            throw new Error("Wallet undefined");
                        }
                        return [4 /*yield*/, this.wallet.ethereum.getFrom()];
                    case 1:
                        address = _a.sent();
                        ownershipId = (0, get_ownership_id_1.getOwnershipId)(order.take.assetType.contract, order.take.assetType.tokenId, (0, types_1.toAddress)(address));
                        return [4 /*yield*/, this.sdk.apis.nftOwnership.getNftOwnershipById({ ownershipId: ownershipId })];
                    case 2:
                        ownership = _a.sent();
                        return [2 /*return*/, (0, types_1.toBigNumber)(bn_1.BigNumber.min(ownership.value, order.take.value).toFixed())];
                    case 3: return [2 /*return*/, order.makeStock];
                }
            });
        });
    };
    EthereumFill.prototype.isMultiple = function (order) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contract, collection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, is_nft_1.isNft)(order.take.assetType) || order.take.assetType.assetClass === "COLLECTION") {
                            contract = order.take.assetType.contract;
                        }
                        else if ((0, is_nft_1.isNft)(order.make.assetType) || order.make.assetType.assetClass === "COLLECTION") {
                            contract = order.make.assetType.contract;
                        }
                        else {
                            throw new Error("Nft has not been found");
                        }
                        return [4 /*yield*/, this.sdk.apis.nftCollection.getNftCollectionById({
                                collection: contract,
                            })];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, collection.type === "ERC1155"];
                }
            });
        });
    };
    EthereumFill.prototype.getOrderHashFromRequest = function (request) {
        if ("order" in request) {
            return (0, common_1.convertOrderIdToEthereumHash)(request.order.id);
        }
        else if ("orderId" in request) {
            return (0, common_1.convertOrderIdToEthereumHash)(request.orderId);
        }
        throw new Error("OrderId has not been found in request");
    };
    EthereumFill.prototype.hasCollectionAssetType = function (order) {
        return order.take.assetType.assetClass === "COLLECTION" || order.make.assetType.assetClass === "COLLECTION";
    };
    EthereumFill.prototype.commonFill = function (action, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var orderHash, order, submit, _a;
            var _b;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        orderHash = this.getOrderHashFromRequest(request);
                        return [4 /*yield*/, this.sdk.apis.order.getOrderByHash({ hash: orderHash })];
                    case 1:
                        order = _c.sent();
                        submit = action
                            .before(function (fillRequest) {
                            if (fillRequest.unwrap) {
                                throw new Error("Unwrap is not supported yet");
                            }
                            if (_this.hasCollectionAssetType(order) && !fillRequest.itemId) {
                                throw new Error("For collection order you should pass itemId");
                            }
                            return _this.getFillOrderRequest(order, fillRequest);
                        })
                            .after((function (tx) { return new sdk_transaction_1.BlockchainEthereumTransaction(tx, _this.network); }));
                        _a = [tslib_1.__assign({}, this.getSupportFlags(order))];
                        _b = {};
                        return [4 /*yield*/, this.isMultiple(order)];
                    case 2:
                        _b.multiple = _c.sent();
                        return [4 /*yield*/, this.getMaxAmount(order)];
                    case 3:
                        _b.maxAmount = _c.sent();
                        return [4 /*yield*/, this.sdk.order.getBaseOrderFillFee(order)];
                    case 4: return [2 /*return*/, tslib_1.__assign.apply(void 0, _a.concat([(_b.baseFee = _c.sent(), _b.submit = submit, _b)]))];
                }
            });
        });
    };
    /**
     * @deprecated
     * @param request
     */
    EthereumFill.prototype.fill = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.commonFill(this.sdk.order.fill, request)];
            });
        });
    };
    EthereumFill.prototype.buy = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.commonFill(this.sdk.order.buy, request)];
            });
        });
    };
    EthereumFill.prototype.acceptBid = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.commonFill(this.sdk.order.acceptBid, request)];
            });
        });
    };
    return EthereumFill;
}());
exports.EthereumFill = EthereumFill;
