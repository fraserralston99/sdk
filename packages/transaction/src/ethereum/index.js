"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainEthereumTransaction = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var BlockchainEthereumTransaction = /** @class */ (function () {
    function BlockchainEthereumTransaction(transaction, network) {
        this.transaction = transaction;
        this.network = network;
        this.blockchain = this.getBlockchain(network);
    }
    BlockchainEthereumTransaction.prototype.getBlockchain = function (network) {
        switch (network) {
            case "mumbai":
            case "mumbai-dev":
            case "polygon":
                return api_client_1.Blockchain.POLYGON;
            default:
                return api_client_1.Blockchain.ETHEREUM;
        }
    };
    BlockchainEthereumTransaction.prototype.hash = function () {
        return this.transaction.hash;
    };
    BlockchainEthereumTransaction.prototype.wait = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transaction.wait()];
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
    BlockchainEthereumTransaction.prototype.getTxLink = function () {
        switch (this.network) {
            case "mainnet": return "https://etherscan.io/tx/".concat(this.hash());
            case "mumbai": return "https://mumbai.polygonscan.com/tx/".concat(this.hash());
            case "polygon": return "https://polygonscan.com/tx/".concat(this.hash());
            case "ropsten": return "https://ropsten.etherscan.io/tx/".concat(this.hash());
            case "rinkeby": return "https://rinkeby.etherscan.io/tx/".concat(this.hash());
            case "testnet": return "https://rinkeby.etherscan.io/tx/".concat(this.hash());
            default: throw new Error("Unsupported transaction network");
        }
    };
    return BlockchainEthereumTransaction;
}());
exports.BlockchainEthereumTransaction = BlockchainEthereumTransaction;
