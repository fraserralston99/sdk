"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSolanaWallet = void 0;
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
function mapSolanaWallet(provider) {
    return provider.map(function (state) { return ({
        wallet: new sdk_wallet_1.SolanaWallet({
            publicKey: state.publicKey,
            signTransaction: state.signTransaction,
            signAllTransactions: state.signAllTransactions,
            signMessage: state.signMessage,
        }),
        address: state.address,
        blockchain: api_client_1.Blockchain.SOLANA,
    }); });
}
exports.mapSolanaWallet = mapSolanaWallet;
