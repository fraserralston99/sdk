"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWalletWeb3WithHDWalletWithEstimate = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var hdwallet_provider_1 = tslib_1.__importDefault(require("@truffle/hdwallet-provider"));
var web3_1 = tslib_1.__importDefault(require("web3"));
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var estimate_middleware_1 = require("@rarible/estimate-middleware");
function initWalletWeb3WithHDWalletWithEstimate(privateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider, web3, web3Ethereum;
        return tslib_1.__generator(this, function (_a) {
            if (process.env["ETHEREUM_RPC_URL"] === undefined ||
                process.env["ETHEREUM_NETWORK_ID"] === undefined) {
                throw new Error("Provide ETHEREUM_RPC_URL, ETHEREUM_NETWORK_ID as environment variables!");
            }
            provider = new hdwallet_provider_1.default(privateKey, process.env["ETHEREUM_RPC_URL"]);
            web3 = new web3_1.default((0, estimate_middleware_1.estimate)(provider, { threshold: 1.1, estimation: process.env["ETHEREUM_RPC_URL"] }));
            web3Ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
            return [2 /*return*/, new sdk_wallet_1.EthereumWallet(web3Ethereum)];
        });
    });
}
exports.initWalletWeb3WithHDWalletWithEstimate = initWalletWeb3WithHDWalletWithEstimate;
