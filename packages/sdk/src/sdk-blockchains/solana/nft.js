"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaNft = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var domain_1 = require("../../types/nft/mint/domain");
var address_converters_1 = require("./common/address-converters");
var SolanaNft = /** @class */ (function () {
    function SolanaNft(sdk, wallet, apis, config) {
        this.sdk = sdk;
        this.wallet = wallet;
        this.apis = apis;
        this.config = config;
        this.mint = this.mint.bind(this);
        this.burn = this.burn.bind(this);
        this.transfer = this.transfer.bind(this);
        this.preprocessMeta = this.preprocessMeta.bind(this);
    }
    SolanaNft.prototype.getCollectionId = function (prepareRequest) {
        if ("collection" in prepareRequest) {
            return (0, address_converters_1.extractPublicKey)(prepareRequest.collection.id);
        }
        else {
            return (0, address_converters_1.extractPublicKey)(prepareRequest.collectionId);
        }
    };
    SolanaNft.prototype.mint = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!this.wallet) {
                    throw new Error("Solana wallet not provided");
                }
                return [2 /*return*/, {
                        multiple: false,
                        supportsRoyalties: false,
                        supportsLazyMint: false,
                        submit: action_1.Action.create({
                            id: "mint",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var collectionId, transactions, mintPrepare, _a, _b, res;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            collectionId = this.getCollectionId(prepareRequest);
                                            transactions = [];
                                            return [4 /*yield*/, this.sdk.nft.mint({
                                                    signer: this.wallet.provider,
                                                    metadataUrl: request.uri,
                                                    masterEditionSupply: 0,
                                                    collection: collectionId,
                                                })];
                                        case 1:
                                            mintPrepare = _c.sent();
                                            transactions.push(mintPrepare.tx);
                                            if (!collectionId) return [3 /*break*/, 3];
                                            _b = (_a = transactions).push;
                                            return [4 /*yield*/, this.sdk.collection.verifyCollection({
                                                    signer: this.wallet.provider,
                                                    collection: collectionId,
                                                    mint: mintPrepare.mint,
                                                })];
                                        case 2:
                                            _b.apply(_a, [_c.sent()]);
                                            _c.label = 3;
                                        case 3: return [4 /*yield*/, this.sdk.unionInstructionsAndSend(this.wallet.provider, transactions, "processed")];
                                        case 4:
                                            res = _c.sent();
                                            return [2 /*return*/, {
                                                    type: domain_1.MintType.ON_CHAIN,
                                                    transaction: new sdk_transaction_1.BlockchainSolanaTransaction(res, this.sdk),
                                                    itemId: (0, types_1.toItemId)("SOLANA:".concat(mintPrepare.mint.toString())),
                                                }];
                                    }
                                });
                            }); },
                        }),
                    }];
            });
        });
    };
    SolanaNft.prototype.burn = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var item;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, this.apis.item.getItemById({ itemId: prepare.itemId })];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, {
                                multiple: parseFloat(item.supply) > 1,
                                maxAmount: (0, types_1.toBigNumber)(item.supply),
                                submit: action_1.Action.create({
                                    id: "burn",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var amount, mint, prepare, tx;
                                        var _a;
                                        return tslib_1.__generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    amount = (_a = request === null || request === void 0 ? void 0 : request.amount) !== null && _a !== void 0 ? _a : 1;
                                                    mint = (0, address_converters_1.extractPublicKey)(item.id);
                                                    return [4 /*yield*/, this.sdk.nft.burn({
                                                            mint: mint,
                                                            signer: this.wallet.provider,
                                                            amount: amount,
                                                            closeAssociatedAccount: false, // todo should be set true if all tokens burn
                                                        })];
                                                case 1:
                                                    prepare = _b.sent();
                                                    return [4 /*yield*/, prepare.submit("processed")];
                                                case 2:
                                                    tx = _b.sent();
                                                    return [2 /*return*/, new sdk_transaction_1.BlockchainSolanaTransaction(tx, this.sdk)];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    SolanaNft.prototype.transfer = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var item;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.wallet) {
                            throw new Error("Solana wallet not provided");
                        }
                        return [4 /*yield*/, this.apis.item.getItemById({ itemId: prepare.itemId })];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, {
                                multiple: parseFloat(item.supply) > 1,
                                maxAmount: (0, types_1.toBigNumber)(item.supply),
                                submit: action_1.Action.create({
                                    id: "transfer",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var amount, mint, prepare, tx;
                                        var _a;
                                        return tslib_1.__generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    amount = (_a = request === null || request === void 0 ? void 0 : request.amount) !== null && _a !== void 0 ? _a : 1;
                                                    mint = (0, address_converters_1.extractPublicKey)(item.id);
                                                    return [4 /*yield*/, this.sdk.nft.transfer({
                                                            mint: mint,
                                                            signer: this.wallet.provider,
                                                            amount: amount,
                                                            to: (0, address_converters_1.extractPublicKey)(request.to),
                                                        })];
                                                case 1:
                                                    prepare = _b.sent();
                                                    return [4 /*yield*/, prepare.submit("processed")];
                                                case 2:
                                                    tx = _b.sent();
                                                    return [2 /*return*/, new sdk_transaction_1.BlockchainSolanaTransaction(tx, this.sdk)];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    SolanaNft.prototype.preprocessMeta = function (meta) {
        var _a, _b, _c, _d, _e;
        if (!this.wallet) {
            throw new Error("Solana wallet not provided");
        }
        if (meta.blockchain !== api_client_1.Blockchain.SOLANA) {
            throw new Error("Wrong blockchain");
        }
        return {
            "name": meta.name,
            "symbol": meta.symbol,
            "description": meta.description,
            "seller_fee_basis_points": ((_b = (_a = meta.royalties) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) * 100,
            "image": (_c = meta.image) === null || _c === void 0 ? void 0 : _c.url,
            "animation_url": (_d = meta.animation) === null || _d === void 0 ? void 0 : _d.url,
            "external_url": meta.external,
            "attributes": (_e = meta.attributes) === null || _e === void 0 ? void 0 : _e.map(function (a) { return ({
                "trait_type": a.key,
                "value": a.value,
            }); }),
            "properties": {
                "files": [meta.image, meta.animation]
                    .filter(function (f) { return f !== undefined; })
                    .map(function (file) {
                    return {
                        uri: file.url,
                        type: file.mimeType,
                    };
                }),
                "creators": [{
                        address: this.wallet.provider.publicKey.toString(),
                        share: 100,
                    }],
            },
        };
    };
    return SolanaNft;
}());
exports.SolanaNft = SolanaNft;
