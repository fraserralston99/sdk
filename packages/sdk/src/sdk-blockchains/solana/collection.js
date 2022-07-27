"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCollection = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var SolanaCollection = /** @class */ (function () {
    function SolanaCollection(sdk, wallet, apis, config) {
        var _this = this;
        this.sdk = sdk;
        this.wallet = wallet;
        this.apis = apis;
        this.config = config;
        this.createCollection = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var mintPrepare, res, collectionAddress, e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (request.blockchain !== api_client_1.Blockchain.SOLANA) {
                                throw new Error("Wrong blockchain");
                            }
                            return [4 /*yield*/, this.sdk.nft.mint({
                                    metadataUrl: request.asset.arguments.metadataURI,
                                    signer: this.wallet.provider,
                                    masterEditionSupply: 0,
                                    collection: null,
                                })];
                        case 1:
                            mintPrepare = _a.sent();
                            return [4 /*yield*/, mintPrepare.tx.submit("confirmed")];
                        case 2:
                            res = _a.sent();
                            collectionAddress = "SOLANA:".concat(mintPrepare.mint.toString());
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            // calling this to let backend know what mint is actually created as a collection
                            return [4 /*yield*/, this.apis.collection.refreshCollectionMeta({
                                    collection: collectionAddress,
                                })];
                        case 4:
                            // calling this to let backend know what mint is actually created as a collection
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, {
                                tx: new sdk_transaction_1.BlockchainSolanaTransaction(res, this.sdk),
                                address: (0, types_1.toContractAddress)("SOLANA:".concat(mintPrepare.mint.toString())),
                            }];
                    }
                });
            }); },
        });
    }
    return SolanaCollection;
}());
exports.SolanaCollection = SolanaCollection;
