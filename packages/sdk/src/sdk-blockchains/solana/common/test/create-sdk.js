"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSdk = void 0;
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../../../index");
var domain_1 = require("../../../../domain");
function createSdk(wallet) {
    var _a;
    var endpoint = process.env.SOLANA_CUSTOM_ENDPOINT !== "" ? process.env.SOLANA_CUSTOM_ENDPOINT : undefined;
    console.debug("solana endpoint:", endpoint);
    return (0, index_1.createRaribleSdk)(new sdk_wallet_1.SolanaWallet(wallet), "development", {
        logs: domain_1.LogsLevel.DISABLED,
        blockchain: (_a = {},
            _a[api_client_1.BlockchainGroup.SOLANA] = {
                endpoint: endpoint,
            },
            _a),
    });
}
exports.createSdk = createSdk;
