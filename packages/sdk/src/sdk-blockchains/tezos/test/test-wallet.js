"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestWallet = exports.getNodeForEnv = void 0;
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
function getNodeForEnv(env) {
    switch (env) {
        case "development": return "https://dev-tezos-node.rarible.org";
        case "dev":
        case "testnet":
        case "staging": return "https://rpc.tzkt.io/ithacanet";
        case "prod": return "https://rpc.tzkt.io/mainnet";
        default: throw new Error("Cannot get node for env");
    }
}
exports.getNodeForEnv = getNodeForEnv;
function createTestWallet(edsk, env) {
    return new sdk_wallet_1.TezosWallet((0, in_memory_provider_1.in_memory_provider)(edsk, getNodeForEnv(env)));
}
exports.createTestWallet = createTestWallet;
