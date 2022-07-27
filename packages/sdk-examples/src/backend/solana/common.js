"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSolanaWallet = void 0;
var solana_wallet_1 = require("@rarible/solana-wallet");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
function initSolanaWallet(pk) {
    var keypairWallet = solana_wallet_1.SolanaKeypairWallet.createFrom(pk);
    return new sdk_wallet_1.SolanaWallet(keypairWallet);
}
exports.initSolanaWallet = initSolanaWallet;
