"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractFromRequest = exports.getCollectionData = exports.TezosMint = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line camelcase
var tezos_sdk_1 = require("@rarible/tezos-sdk");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var bn_1 = require("@rarible/utils/build/bn");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/nft/mint/domain");
var common_1 = require("./common");
var TezosMint = /** @class */ (function () {
    function TezosMint(provider, unionAPI, network) {
        this.provider = provider;
        this.unionAPI = unionAPI;
        this.network = network;
        this.mint = this.mint.bind(this);
        this.preprocessMeta = this.preprocessMeta.bind(this);
    }
    TezosMint.prototype.getFormatsMeta = function (meta) {
        return [meta.image, meta.animation]
            .reduce(function (acc, item) {
            if (item) {
                var url = item.url, rest = tslib_1.__rest(item, ["url"]);
                return acc.concat(tslib_1.__assign(tslib_1.__assign({}, rest), { uri: fixIpfs(url) }));
            }
            return acc;
        }, []);
    };
    TezosMint.prototype.preprocessMeta = function (meta) {
        var _a;
        if (meta.blockchain !== api_client_1.Blockchain.TEZOS) {
            throw new Error("Wrong blockchain");
        }
        var artifact = meta.animation || meta.image;
        return {
            name: meta.name,
            decimals: 0,
            description: meta.description,
            artifactUri: artifact ? fixIpfs(artifact.url) : undefined,
            displayUri: meta.image ? fixIpfs(meta.image.url) : undefined,
            attributes: (_a = meta.attributes) === null || _a === void 0 ? void 0 : _a.map(function (attr) { return ({
                name: attr.key,
                value: attr.value,
                type: attr.type,
            }); }),
            formats: this.getFormatsMeta(meta),
        };
    };
    TezosMint.prototype.getOwner = function (request) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                if ((_a = request.creators) === null || _a === void 0 ? void 0 : _a.length) {
                    return [2 /*return*/, (0, common_1.getTezosAddress)(request.creators[0].account)];
                }
                return [2 /*return*/, (0, tezos_sdk_1.get_address)((0, common_1.getRequiredProvider)(this.provider))];
            });
        });
    };
    TezosMint.prototype.mint = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, contract, type;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, common_1.checkChainId)(this.provider)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, getCollectionData(this.unionAPI, prepareRequest)];
                    case 2:
                        _a = _b.sent(), contract = _a.contract, type = _a.type;
                        return [2 /*return*/, {
                                multiple: type === api_client_1.CollectionType.TEZOS_MT,
                                supportsRoyalties: true,
                                supportsLazyMint: false,
                                submit: action_1.Action.create({
                                    id: "mint",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var royalties, collectionType, supply, provider, result, _a, _b;
                                        var _c;
                                        return tslib_1.__generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    royalties = ((_c = request.royalties) === null || _c === void 0 ? void 0 : _c.reduce(function (acc, royalty) {
                                                        var account = (0, common_1.getTezosAddress)(royalty.account);
                                                        acc[account] = new bignumber_js_1.default(royalty.value);
                                                        return acc;
                                                    }, {})) || {};
                                                    return [4 /*yield*/, (0, common_1.getCollectionType)(this.provider, contract)];
                                                case 1:
                                                    collectionType = _d.sent();
                                                    supply = collectionType === api_client_1.CollectionType.TEZOS_NFT ? undefined : (0, bn_1.toBn)(request.supply);
                                                    provider = (0, common_1.getRequiredProvider)(this.provider);
                                                    _a = tezos_sdk_1.mint;
                                                    _b = [provider,
                                                        contract,
                                                        royalties,
                                                        supply,
                                                        undefined,
                                                        {
                                                            "": fixIpfs(request.uri),
                                                        }];
                                                    return [4 /*yield*/, this.getOwner(request)];
                                                case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.sent()]))];
                                                case 3:
                                                    result = _d.sent();
                                                    return [2 /*return*/, {
                                                            type: domain_1.MintType.ON_CHAIN,
                                                            transaction: new sdk_transaction_1.BlockchainTezosTransaction(result, this.network),
                                                            itemId: (0, common_1.convertTezosItemId)("".concat(contract, ":").concat(result.token_id)),
                                                        }];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    return TezosMint;
}());
exports.TezosMint = TezosMint;
function getCollectionData(unionAPI, prepareRequest) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var contractAddress, _a, blockchain, contract, collection;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contractAddress = getContractFromRequest(prepareRequest);
                    _a = tslib_1.__read(contractAddress.split(":"), 2), blockchain = _a[0], contract = _a[1];
                    if (blockchain !== api_client_1.Blockchain.TEZOS) {
                        throw new Error("Unsupported blockchain of collection: ".concat(blockchain));
                    }
                    return [4 /*yield*/, unionAPI.collection.getCollectionById({
                            collection: contractAddress,
                        })];
                case 1:
                    collection = _b.sent();
                    if (!collection) {
                        throw new Error("Tezos collection with address=".concat(contract, " has not been found"));
                    }
                    return [2 /*return*/, {
                            contract: contract,
                            owner: collection.owner,
                            type: collection.type,
                        }];
            }
        });
    });
}
exports.getCollectionData = getCollectionData;
function getContractFromRequest(request) {
    if ("collection" in request)
        return request.collection.id;
    if ("collectionId" in request)
        return request.collectionId;
    throw new Error("Wrong request: collection or collectionId has not been found");
}
exports.getContractFromRequest = getContractFromRequest;
function fixIpfs(link) {
    return link.replace("ipfs://ipfs/", "ipfs://");
}
