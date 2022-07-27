"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWalletWeb3WithHDWallet = exports.initWalletWeb3 = exports.initWallet = exports.initNodeProvider = exports.updateNodeGlobalVars = void 0;
var tslib_1 = require("tslib");
var form_data_1 = tslib_1.__importDefault(require("form-data"));
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var web3_provider_engine_1 = tslib_1.__importDefault(require("web3-provider-engine"));
var ethereumjs_wallet_1 = tslib_1.__importDefault(require("ethereumjs-wallet"));
var test_provider_1 = require("@rarible/test-provider");
// @ts-ignore
var rpc_1 = tslib_1.__importDefault(require("web3-provider-engine/subproviders/rpc"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var ethers_1 = require("ethers");
var ethers_ethereum_1 = require("@rarible/ethers-ethereum");
var web3_1 = tslib_1.__importDefault(require("web3"));
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var hdwallet_provider_1 = tslib_1.__importDefault(require("@truffle/hdwallet-provider"));
function updateNodeGlobalVars() {
    global.FormData = form_data_1.default;
    global.window = {
        fetch: node_fetch_1.default,
        dispatchEvent: function () { },
    };
    global.CustomEvent = function CustomEvent() {
        return;
    };
}
exports.updateNodeGlobalVars = updateNodeGlobalVars;
function initNodeProvider(pk, config) {
    var provider = new web3_provider_engine_1.default({ pollingInterval: 100 });
    var privateKey = pk.startsWith("0x") ? pk.substring(2) : pk;
    var wallet = new ethereumjs_wallet_1.default(Buffer.from(privateKey, "hex"));
    provider.addProvider(new test_provider_1.TestSubprovider(wallet, { networkId: config.networkId, chainId: config.networkId }));
    provider.addProvider(new rpc_1.default({ rpcUrl: config.rpcUrl }));
    provider.start();
    return provider;
}
exports.initNodeProvider = initNodeProvider;
function initWallet(privateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var raribleEthers, raribleProvider;
        return tslib_1.__generator(this, function (_a) {
            if (process.env["ETHEREUM_RPC_URL"] === undefined ||
                process.env["ETHEREUM_NETWORK_ID"] === undefined) {
                throw new Error("Provide ETHEREUM_RPC_URL, ETHEREUM_NETWORK_ID as environment variables!");
            }
            raribleEthers = new ethers_1.ethers.providers.JsonRpcProvider(process.env["ETHEREUM_RPC_URL"]);
            raribleProvider = new ethers_ethereum_1.EthersEthereum(new ethers_1.ethers.Wallet(privateKey, raribleEthers));
            return [2 /*return*/, new sdk_wallet_1.EthereumWallet(raribleProvider)];
        });
    });
}
exports.initWallet = initWallet;
function initWalletWeb3(privateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider, web3, web3Ethereum;
        return tslib_1.__generator(this, function (_a) {
            if (process.env["ETHEREUM_RPC_URL"] === undefined ||
                process.env["ETHEREUM_NETWORK_ID"] === undefined) {
                throw new Error("Provide ETHEREUM_RPC_URL, ETHEREUM_NETWORK_ID as environment variables!");
            }
            provider = initNodeProvider(privateKey, {
                rpcUrl: process.env["ETHEREUM_RPC_URL"],
                networkId: +process.env["ETHEREUM_NETWORK_ID"],
            });
            web3 = new web3_1.default(provider);
            web3Ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
            return [2 /*return*/, new sdk_wallet_1.EthereumWallet(web3Ethereum)];
        });
    });
}
exports.initWalletWeb3 = initWalletWeb3;
function initWalletWeb3WithHDWallet(privateKey) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider, web3, web3Ethereum;
        return tslib_1.__generator(this, function (_a) {
            if (process.env["ETHEREUM_RPC_URL"] === undefined ||
                process.env["ETHEREUM_NETWORK_ID"] === undefined) {
                throw new Error("Provide ETHEREUM_RPC_URL, ETHEREUM_NETWORK_ID as environment variables!");
            }
            provider = new hdwallet_provider_1.default(privateKey, process.env["ETHEREUM_RPC_URL"]);
            web3 = new web3_1.default(provider);
            web3Ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
            return [2 /*return*/, new sdk_wallet_1.EthereumWallet(web3Ethereum)];
        });
    });
}
exports.initWalletWeb3WithHDWallet = initWalletWeb3WithHDWallet;
