"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletAddressFull = exports.getSolanaWallet = exports.getFlowBuyerWallet = exports.getFlowSellerWallet = exports.getTezosTestWallet = exports.getEthereumWalletBuyer = exports.getPolygonWallet = exports.getEthereumWallet = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
var init_providers_1 = require("@rarible/sdk/src/sdk-blockchains/ethereum/test/init-providers");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var fcl_1 = tslib_1.__importDefault(require("@onflow/fcl"));
var types_1 = require("@rarible/types");
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var solana_wallet_1 = require("@rarible/solana-wallet");
var flow_test_common_1 = require("@rarible/flow-test-common");
var config_1 = require("./config");
var logger_1 = require("./logger");
function getEthereumWallet(pk) {
    var config = {
        networkId: config_1.testsConfig.variables.ETHEREUM_NETWORK_ID,
        rpcUrl: config_1.testsConfig.variables.ETHEREUM_RPC_URL,
    };
    var _a = (0, init_providers_1.initProvider)(pk, config), web3 = _a.web3, wallet = _a.wallet;
    var ethereum = new web3_ethereum_1.Web3Ethereum({
        web3: web3,
        from: wallet.getAddressString(),
    });
    return new sdk_wallet_1.EthereumWallet(ethereum);
}
exports.getEthereumWallet = getEthereumWallet;
function getPolygonWallet(pk) {
    var _a = (0, init_providers_1.initProvider)(pk, {
        networkId: 80001,
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
    }), web3 = _a.web3, wallet = _a.wallet;
    var ethereum = new web3_ethereum_1.Web3Ethereum({
        web3: web3,
        from: wallet.getAddressString(),
    });
    return new sdk_wallet_1.EthereumWallet(ethereum);
}
exports.getPolygonWallet = getPolygonWallet;
function getEthereumWalletBuyer() {
    return getEthereumWallet(config_1.testsConfig.variables.ETHEREUM_WALLET_BUYER);
}
exports.getEthereumWalletBuyer = getEthereumWalletBuyer;
function getTezosTestWallet(walletNumber) {
    if (walletNumber === void 0) { walletNumber = 0; }
    var edsks = [
        config_1.testsConfig.variables.TEZOS_WALLET_1,
        config_1.testsConfig.variables.TEZOS_WALLET_2,
        config_1.testsConfig.variables.TEZOS_WALLET_3,
    ];
    return new sdk_wallet_1.TezosWallet((0, in_memory_provider_1.in_memory_provider)(edsks[walletNumber], config_1.testsConfig.variables.TEZOS_WALLET_ENDPOINT));
}
exports.getTezosTestWallet = getTezosTestWallet;
function getFlowSellerWallet() {
    var auth = (0, flow_test_common_1.createTestAuth)(fcl_1.default, "testnet", flow_test_common_1.FLOW_TESTNET_ACCOUNT_3.address, flow_test_common_1.FLOW_TESTNET_ACCOUNT_3.privKey);
    return new sdk_wallet_1.FlowWallet(fcl_1.default, auth);
}
exports.getFlowSellerWallet = getFlowSellerWallet;
function getFlowBuyerWallet() {
    var auth = (0, flow_test_common_1.createTestAuth)(fcl_1.default, "testnet", flow_test_common_1.FLOW_TESTNET_ACCOUNT_4.address, flow_test_common_1.FLOW_TESTNET_ACCOUNT_4.privKey);
    return new sdk_wallet_1.FlowWallet(fcl_1.default, auth);
}
exports.getFlowBuyerWallet = getFlowBuyerWallet;
function getSolanaWallet(walletNumber) {
    if (walletNumber === void 0) { walletNumber = 0; }
    var wallets = [
        config_1.testsConfig.variables.SOLANA_WALLET_1,
        config_1.testsConfig.variables.SOLANA_WALLET_2,
    ];
    return new sdk_wallet_1.SolanaWallet(solana_wallet_1.SolanaKeypairWallet.createFrom(Uint8Array.from(wallets[walletNumber])));
}
exports.getSolanaWallet = getSolanaWallet;
function getWalletAddressFull(wallet) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var address, addressWithPrefix, _a, auth, user, response;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    address = "";
                    addressWithPrefix = "";
                    _a = wallet.blockchain;
                    switch (_a) {
                        case api_client_1.BlockchainGroup.ETHEREUM: return [3 /*break*/, 1];
                        case api_client_1.BlockchainGroup.TEZOS: return [3 /*break*/, 3];
                        case api_client_1.BlockchainGroup.FLOW: return [3 /*break*/, 5];
                        case api_client_1.BlockchainGroup.SOLANA: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, wallet.ethereum.getFrom()];
                case 2:
                    address = _b.sent();
                    addressWithPrefix = "ETHEREUM:" + address;
                    return [3 /*break*/, 12];
                case 3: return [4 /*yield*/, wallet.provider.address()];
                case 4:
                    address = _b.sent();
                    addressWithPrefix = "TEZOS:" + address;
                    return [3 /*break*/, 12];
                case 5:
                    auth = wallet.getAuth();
                    if (!auth) return [3 /*break*/, 7];
                    return [4 /*yield*/, auth()];
                case 6:
                    user = _b.sent();
                    if (user.addr) {
                        address = "0x" + user.addr;
                        addressWithPrefix = "FLOW:" + address;
                    }
                    else {
                        throw new Error("FLOW user address is undefined");
                    }
                    return [3 /*break*/, 8];
                case 7: throw new Error("FLOW auth object is not passed to sdk");
                case 8: return [3 /*break*/, 12];
                case 9: return [4 /*yield*/, wallet.provider.publicKey.toString()];
                case 10:
                    address = _b.sent();
                    addressWithPrefix = "SOLANA:" + address;
                    return [3 /*break*/, 12];
                case 11: throw new Error("Unrecognized wallet");
                case 12:
                    response = {
                        address: address,
                        addressWithPrefix: addressWithPrefix,
                        unionAddress: (0, types_1.toUnionAddress)(addressWithPrefix),
                    };
                    logger_1.Logger.log("wallet_address=", response);
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.getWalletAddressFull = getWalletAddressFull;
