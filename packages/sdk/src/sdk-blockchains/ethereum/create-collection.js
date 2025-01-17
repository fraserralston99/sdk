"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumCreateCollection = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var common_1 = require("./common");
var EthereumCreateCollection = /** @class */ (function () {
    function EthereumCreateCollection(sdk, network) {
        var _this = this;
        this.sdk = sdk;
        this.network = network;
        this.createCollection = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (request.blockchain !== api_client_1.Blockchain.ETHEREUM && request.blockchain !== api_client_1.Blockchain.POLYGON) {
                                throw new Error("Wrong blockchain");
                            }
                            _a = this.convertResponse;
                            return [4 /*yield*/, this.startCreateCollection(request.asset)];
                        case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                    }
                });
            }); },
        });
        this.blockchain = (0, common_1.getEVMBlockchain)(network);
        this.startCreateCollection = this.startCreateCollection.bind(this);
    }
    EthereumCreateCollection.prototype.convertOperatorsAddresses = function (operators) {
        if (!operators) {
            throw new Error("Operators should be provided in case of deploy private collection");
        }
        return operators.map(function (o) {
            var _a = tslib_1.__read(o.split(":"), 2), blockchain = _a[0], address = _a[1];
            if (blockchain !== "ETHEREUM") {
                throw new Error("Operator address should be in ethereum blockchain");
            }
            return (0, types_1.toAddress)(address);
        });
    };
    EthereumCreateCollection.prototype.convertResponse = function (response) {
        return {
            tx: new sdk_transaction_1.BlockchainEthereumTransaction(response.tx, this.network),
            address: (0, common_1.convertEthereumContractAddress)(response.address, this.blockchain),
        };
    };
    EthereumCreateCollection.prototype.startCreateCollection = function (asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var deployCommonArguments, operators;
            var _a, _b, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                deployCommonArguments = [
                    asset.arguments.name,
                    asset.arguments.symbol,
                    asset.arguments.baseURI,
                    asset.arguments.contractURI,
                ];
                if (asset.arguments.isUserToken) {
                    operators = this.convertOperatorsAddresses(asset.arguments.operators);
                    if (asset.assetType === "ERC721") {
                        return [2 /*return*/, (_a = this.sdk.nft.deploy.erc721).deployUserToken.apply(_a, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(deployCommonArguments), false), [operators], false))];
                    }
                    else if (asset.assetType === "ERC1155") {
                        return [2 /*return*/, (_b = this.sdk.nft.deploy.erc1155).deployUserToken.apply(_b, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(deployCommonArguments), false), [operators], false))];
                    }
                    else {
                        throw new Error("Unsupported asset type");
                    }
                }
                else {
                    if (asset.assetType === "ERC721") {
                        return [2 /*return*/, (_c = this.sdk.nft.deploy.erc721).deployToken.apply(_c, tslib_1.__spreadArray([], tslib_1.__read(deployCommonArguments), false))];
                    }
                    else if (asset.assetType === "ERC1155") {
                        return [2 /*return*/, (_d = this.sdk.nft.deploy.erc1155).deployToken.apply(_d, tslib_1.__spreadArray([], tslib_1.__read(deployCommonArguments), false))];
                    }
                    else {
                        throw new Error("Unsupported asset type");
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return EthereumCreateCollection;
}());
exports.EthereumCreateCollection = EthereumCreateCollection;
