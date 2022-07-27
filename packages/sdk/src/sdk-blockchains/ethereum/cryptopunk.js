"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumCryptopunk = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var EthereumCryptopunk = /** @class */ (function () {
    function EthereumCryptopunk(sdk, network) {
        var _this = this;
        this.sdk = sdk;
        this.network = network;
        this.wrap = action_1.Action.create({
            id: "approve-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var tx;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!request.punkId) {
                                throw new Error("PunkId has not been specified");
                            }
                            return [4 /*yield*/, this.sdk.nft.cryptoPunks.approveForWrapper(request.punkId)];
                        case 1:
                            tx = _a.sent();
                            if (!tx) return [3 /*break*/, 3];
                            return [4 /*yield*/, (new sdk_transaction_1.BlockchainEthereumTransaction(tx, this.network)).wait()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, request];
                    }
                });
            }); },
        }).thenStep({
            id: "wrap-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var tx;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sdk.nft.cryptoPunks.wrap(request.punkId)];
                        case 1:
                            tx = _a.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainEthereumTransaction(tx, this.network)];
                    }
                });
            }); },
        });
        this.unwrap = action_1.Action.create({
            id: "unwrap-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var tx;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!request.punkId) {
                                throw new Error("PunkId has not been specified");
                            }
                            return [4 /*yield*/, this.sdk.nft.cryptoPunks.unwrap(request.punkId)];
                        case 1:
                            tx = _a.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainEthereumTransaction(tx, this.network)];
                    }
                });
            }); },
        });
    }
    return EthereumCryptopunk;
}());
exports.EthereumCryptopunk = EthereumCryptopunk;
