"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainTezosTransaction = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var BlockchainTezosTransaction = /** @class */ (function () {
    function BlockchainTezosTransaction(transaction, network) {
        this.transaction = transaction;
        this.network = network;
        this.blockchain = api_client_1.Blockchain.TEZOS;
    }
    BlockchainTezosTransaction.prototype.hash = function () {
        return this.transaction.hash;
    };
    BlockchainTezosTransaction.prototype.wait = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transaction.confirmation()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                blockchain: this.blockchain,
                                hash: this.transaction.hash,
                            }];
                }
            });
        });
    };
    BlockchainTezosTransaction.prototype.getTxLink = function () {
        switch (this.network) {
            case "mainnet": return "https://tzkt.io/".concat(this.hash());
            case "testnet": return "https://ithacanet.tzkt.io//".concat(this.hash());
            default: throw new Error("Unsupported transaction network");
        }
    };
    return BlockchainTezosTransaction;
}());
exports.BlockchainTezosTransaction = BlockchainTezosTransaction;
