"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.EthereumMint = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var EthereumSdk = tslib_1.__importStar(require("@rarible/protocol-ethereum-sdk"));
var protocol_ethereum_sdk_1 = require("@rarible/protocol-ethereum-sdk");
var mint_1 = require("@rarible/protocol-ethereum-sdk/build/nft/mint");
var types_1 = require("@rarible/types");
var ethereum_api_client_1 = require("@rarible/ethereum-api-client");
var bn_1 = require("@rarible/utils/build/bn");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/nft/mint/domain");
var common_1 = require("./common");
var EthereumMint = /** @class */ (function () {
    function EthereumMint(sdk, apis, network) {
        this.sdk = sdk;
        this.apis = apis;
        this.network = network;
        this.blockchain = (0, common_1.getEVMBlockchain)(network);
        this.prepare = this.prepare.bind(this);
    }
    EthereumMint.prototype.handleSubmit = function (request, nftCollection, nftTokenId) {
        if (this.blockchain === api_client_1.Blockchain.POLYGON && request.lazyMint) {
            throw new Error("Lazy minting on polygon is not supported");
        }
        if (EthereumSdk.isErc721v3Collection(nftCollection)) {
            return this.sdk.nft.mint({
                collection: nftCollection,
                uri: request.uri,
                lazy: request.lazyMint,
                royalties: this.toPart(request.royalties),
                creators: this.toPart(request.creators),
                nftTokenId: nftTokenId,
            });
        }
        if (EthereumSdk.isErc721v2Collection(nftCollection)) {
            return this.sdk.nft.mint({
                collection: nftCollection,
                uri: request.uri,
                royalties: this.toPart(request.royalties),
                nftTokenId: nftTokenId,
            });
        }
        if (EthereumSdk.isErc721v1Collection(nftCollection)) {
            return this.sdk.nft.mint({
                collection: nftCollection,
                uri: request.uri,
                nftTokenId: nftTokenId,
            });
        }
        if (EthereumSdk.isErc1155v2Collection(nftCollection)) {
            return this.sdk.nft.mint({
                collection: nftCollection,
                uri: request.uri,
                supply: request.supply,
                lazy: request.lazyMint,
                royalties: this.toPart(request.royalties),
                creators: this.toPart(request.creators),
                nftTokenId: nftTokenId,
            });
        }
        if (EthereumSdk.isErc1155v1Collection(nftCollection)) {
            return this.sdk.nft.mint({
                collection: nftCollection,
                uri: request.uri,
                supply: request.supply,
                royalties: this.toPart(request.royalties),
                nftTokenId: nftTokenId,
            });
        }
        throw new Error("Unsupported NFT Collection");
    };
    EthereumMint.prototype.toPart = function (royalties) {
        if (royalties === void 0) { royalties = []; }
        return royalties.map(function (r) { return ({
            account: (0, common_1.convertToEthereumAddress)(r.account),
            value: (0, bn_1.toBn)(r.value).toNumber(),
        }); });
    };
    EthereumMint.prototype.isSupportsRoyalties = function (collection) {
        if (collection.type === "ERC721") {
            return (0, protocol_ethereum_sdk_1.isErc721v3Collection)(collection) || (0, protocol_ethereum_sdk_1.isErc721v2Collection)(collection);
        }
        else if (collection.type === "ERC1155") {
            return true;
        }
        else {
            throw new Error("Unrecognized collection type");
        }
    };
    EthereumMint.prototype.isSupportsLazyMint = function (collection) {
        if (this.blockchain === api_client_1.Blockchain.POLYGON) {
            return false;
        }
        return (0, protocol_ethereum_sdk_1.isErc721v3Collection)(collection) || (0, protocol_ethereum_sdk_1.isErc1155v2Collection)(collection);
    };
    EthereumMint.prototype.prepare = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var collection, nftCollection;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCollection(this.apis.collection, request)];
                    case 1:
                        collection = _a.sent();
                        if (!isSupportedCollection(collection.type)) {
                            throw new Error("Collection with type \"".concat(collection, "\" not supported"));
                        }
                        nftCollection = toNftCollection(collection);
                        return [2 /*return*/, {
                                multiple: collection.type === "ERC1155",
                                supportsRoyalties: this.isSupportsRoyalties(nftCollection),
                                supportsLazyMint: this.isSupportsLazyMint(nftCollection),
                                submit: action_1.Action.create({
                                    id: "mint",
                                    run: function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var mintResponse;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.handleSubmit(data, nftCollection, toNftTokenId(request.tokenId))];
                                                case 1:
                                                    mintResponse = _a.sent();
                                                    switch (mintResponse.type) {
                                                        case mint_1.MintResponseTypeEnum.ON_CHAIN:
                                                            return [2 /*return*/, {
                                                                    type: domain_1.MintType.ON_CHAIN,
                                                                    itemId: (0, common_1.convertEthereumItemId)(mintResponse.itemId, this.blockchain),
                                                                    transaction: new sdk_transaction_1.BlockchainEthereumTransaction(mintResponse.transaction, this.network),
                                                                }];
                                                        case mint_1.MintResponseTypeEnum.OFF_CHAIN:
                                                            return [2 /*return*/, {
                                                                    type: domain_1.MintType.OFF_CHAIN,
                                                                    itemId: (0, common_1.convertEthereumItemId)(mintResponse.itemId, this.blockchain),
                                                                }];
                                                        default:
                                                            throw new Error("Unrecognized mint response type");
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    EthereumMint.prototype.preprocessMeta = function (meta) {
        var _a, _b;
        if (meta.blockchain !== api_client_1.Blockchain.ETHEREUM && meta.blockchain !== api_client_1.Blockchain.POLYGON) {
            throw new Error("Wrong blockchain");
        }
        return {
            name: meta.name,
            description: meta.description,
            image: (_a = meta.image) === null || _a === void 0 ? void 0 : _a.url,
            animation_url: (_b = meta.animation) === null || _b === void 0 ? void 0 : _b.url,
            external_url: meta.external,
            attributes: meta.attributes,
        };
    };
    return EthereumMint;
}());
exports.EthereumMint = EthereumMint;
function getCollection(api, req) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            if ("collection" in req) {
                return [2 /*return*/, req.collection];
            }
            return [2 /*return*/, api.getCollectionById({ collection: req.collectionId })];
        });
    });
}
exports.getCollection = getCollection;
function toNftCollection(collection) {
    var _a, _b;
    var contract = (0, common_1.convertToEthereumAddress)(collection.id);
    if (!isSupportedCollection(collection.type)) {
        throw new Error("Collection with type \"".concat(collection, "\" not supported"));
    }
    return tslib_1.__assign(tslib_1.__assign({}, collection), { id: (0, types_1.toAddress)(contract), type: ethereum_api_client_1.NftCollectionType[collection.type], owner: collection.owner ? (0, common_1.convertToEthereumAddress)(collection.owner) : undefined, features: (_a = collection.features) === null || _a === void 0 ? void 0 : _a.map(function (x) { return ethereum_api_client_1.NftCollectionFeatures[x]; }), minters: (_b = collection.minters) === null || _b === void 0 ? void 0 : _b.map(function (minter) { return (0, common_1.convertToEthereumAddress)(minter); }), meta: convertCollectionMeta(collection.meta) });
}
function convertCollectionMeta(meta) {
    if (!meta) {
        return undefined;
    }
    var feeRecipient = meta.feeRecipient !== undefined ? (0, types_1.toAddress)(meta.feeRecipient) : undefined;
    return {
        name: meta.name,
        description: meta.description,
        createdAt: meta.createdAt,
        tags: meta.tags || [],
        genres: meta.genres || [],
        language: meta.language,
        rights: meta.rights,
        rightsUri: meta.rightsUri,
        externalUri: meta.externalUri,
        originalMetaUri: meta.originalMetaUri,
        sellerFeeBasisPoints: meta.sellerFeeBasisPoints,
        content: meta.content,
        feeRecipient: feeRecipient,
    };
}
function isSupportedCollection(type) {
    return type === api_client_1.CollectionType.ERC721 || type === api_client_1.CollectionType.ERC1155;
}
function toNftTokenId(tokenId) {
    if (tokenId) {
        return {
            tokenId: (0, types_1.toBigNumber)(tokenId.tokenId),
            signature: tokenId.signature,
        };
    }
    return undefined;
}
