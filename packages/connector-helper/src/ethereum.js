"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEthereumWallet = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var web3_1 = tslib_1.__importDefault(require("web3"));
var api_client_1 = require("@rarible/api-client");
var estimate_middleware_1 = require("@rarible/estimate-middleware");
var polygonRpcMap = {
    137: "https://polygon-rpc.com",
    80001: "https://matic-mumbai.chainstacklabs.com",
    300501: "https://dev-polygon-node.rarible.com",
    200501: "",
};
function mapEthereumWallet(provider) {
    return provider.map(function (state) {
        var blockchain = getEvmBlockchain(state.chainId);
        var web3;
        provider.map(function (e) { return e.provider; });
        if (blockchain === api_client_1.Blockchain.POLYGON) {
            if (state.chainId !== 137 && state.chainId !== 80001 && state.chainId !== 300501) {
                throw new Error("Wrong chain id");
            }
            web3 = new web3_1.default((0, estimate_middleware_1.estimate)(state.provider, { threshold: 1.1, estimation: polygonRpcMap[state.chainId] }));
        }
        else {
            web3 = new web3_1.default(state.provider);
        }
        return {
            wallet: new sdk_wallet_1.EthereumWallet(new web3_ethereum_1.Web3Ethereum({
                web3: web3,
                from: state.address,
            })),
            address: state.address,
            blockchain: blockchain,
        };
    });
}
exports.mapEthereumWallet = mapEthereumWallet;
function getEvmBlockchain(chainId) {
    switch (chainId) {
        case 137: return api_client_1.Blockchain.POLYGON;
        case 80001: return api_client_1.Blockchain.POLYGON;
        case 300501: return api_client_1.Blockchain.POLYGON;
        case 200501: return api_client_1.Blockchain.POLYGON;
        default: return api_client_1.Blockchain.ETHEREUM;
    }
}
