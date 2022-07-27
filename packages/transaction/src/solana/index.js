"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainSolanaTransaction = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var BlockchainSolanaTransaction = /** @class */ (function () {
    function BlockchainSolanaTransaction(transaction, sdk) {
        this.transaction = transaction;
        this.blockchain = api_client_1.Blockchain.SOLANA;
        this.cluster = sdk.cluster;
        this.getSdk = function () { return sdk; }; // to hide sdk from json.stringify
    }
    BlockchainSolanaTransaction.prototype.hash = function () {
        return this.transaction.txId;
    };
    BlockchainSolanaTransaction.prototype.wait = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var RETRIES_COUNT, check;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        RETRIES_COUNT = 4;
                        check = function (retryCount) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var res, e_1;
                            var _a, _b;
                            return tslib_1.__generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 2, , 6]);
                                        return [4 /*yield*/, (this.getSdk().confirmTransaction(this.transaction.txId, "confirmed"))];
                                    case 1:
                                        res = _c.sent();
                                        if ((_a = res.value) === null || _a === void 0 ? void 0 : _a.err) {
                                            if (typeof res.value.err === "string") {
                                                throw new Error(res.value.err);
                                            }
                                            else {
                                                throw res.value.err;
                                            }
                                        }
                                        return [3 /*break*/, 6];
                                    case 2:
                                        e_1 = _c.sent();
                                        if (!(((_b = e_1 === null || e_1 === void 0 ? void 0 : e_1.message) === null || _b === void 0 ? void 0 : _b.includes("Transaction was not confirmed in")) && retryCount > 0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, check(retryCount - 1)];
                                    case 3:
                                        _c.sent();
                                        return [3 /*break*/, 5];
                                    case 4: throw e_1;
                                    case 5: return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, check(RETRIES_COUNT)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                blockchain: this.blockchain,
                                hash: this.transaction.txId,
                            }];
                }
            });
        });
    };
    BlockchainSolanaTransaction.prototype.getTxLink = function () {
        var url = "https://solscan.io/tx/".concat(this.hash());
        switch (this.cluster) {
            case "mainnet-beta":
                return url;
            case "testnet":
            case "devnet":
                return url + "?cluster=".concat(this.cluster);
            default: throw new Error("Unsupported transaction network");
        }
    };
    BlockchainSolanaTransaction.prototype.valueOf = function () {
        return {
            blockchain: this.blockchain,
            transaction: this.transaction,
        };
    };
    return BlockchainSolanaTransaction;
}());
exports.BlockchainSolanaTransaction = BlockchainSolanaTransaction;
