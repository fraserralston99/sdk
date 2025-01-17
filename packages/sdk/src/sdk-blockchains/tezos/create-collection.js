"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosCreateCollection = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var common_1 = require("./common");
var TezosCreateCollection = /** @class */ (function () {
    function TezosCreateCollection(provider, network) {
        var _this = this;
        this.provider = provider;
        this.network = network;
        this.createCollection = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var operationResult;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (request.blockchain !== api_client_1.Blockchain.TEZOS) {
                                throw new Error("Wrong blockchain");
                            }
                            return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.getDeployOperation(request.asset)];
                        case 2:
                            operationResult = _a.sent();
                            return [2 /*return*/, {
                                    tx: new sdk_transaction_1.BlockchainTezosTransaction(operationResult, this.network),
                                    address: (0, common_1.convertTezosToContractAddress)(operationResult.contract),
                                }];
                    }
                });
            }); },
        });
    }
    TezosCreateCollection.prototype.getDeployOperation = function (asset) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, owner, meta;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        return [4 /*yield*/, provider.tezos.address()];
                    case 1:
                        owner = _a.sent();
                        meta = {
                            name: asset.arguments.name,
                            symbol: asset.arguments.symbol,
                            contractURI: asset.arguments.contractURI,
                        };
                        if (asset.assetType === "NFT") {
                            if (!asset.arguments.isUserToken) {
                                return [2 /*return*/, (0, tezos_sdk_1.deploy_nft_public)(provider, owner, meta)];
                            }
                            else {
                                return [2 /*return*/, (0, tezos_sdk_1.deploy_nft_private)(provider, owner, meta)];
                            }
                        }
                        else if (asset.assetType === "MT") {
                            if (!asset.arguments.isUserToken) {
                                return [2 /*return*/, (0, tezos_sdk_1.deploy_mt_public)(provider, owner, meta)];
                            }
                            else {
                                return [2 /*return*/, (0, tezos_sdk_1.deploy_mt_private)(provider, owner, meta)];
                            }
                        }
                        else {
                            throw new Error("Unsupported asset type=".concat(asset.assetType));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TezosCreateCollection;
}());
exports.TezosCreateCollection = TezosCreateCollection;
