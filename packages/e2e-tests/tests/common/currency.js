"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrency = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var types_1 = require("@rarible/types");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var wallet_1 = require("./wallet");
var config_1 = require("./config");
var logger_1 = require("./logger");
function getCurrency(wallets, currency) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var testErc20, addressBuyer, addressSeller;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_1.Logger.log("Get currency for=".concat(currency));
                    if (!(wallets.seller instanceof sdk_wallet_1.EthereumWallet && wallets.buyer instanceof sdk_wallet_1.EthereumWallet)) return [3 /*break*/, 6];
                    if (!(currency === "ERC20")) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, ethereum_sdk_test_common_1.deployTestErc20)(wallets.seller.ethereum.config.web3, "test erc20", "TST20")];
                case 1:
                    testErc20 = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallets.buyer)];
                case 2:
                    addressBuyer = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallets.seller)];
                case 3:
                    addressSeller = _a.sent();
                    return [4 /*yield*/, testErc20.methods.mint(addressBuyer.address, 1000).send({
                            from: addressSeller.address,
                            gas: 200000,
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, {
                            "@type": "ERC20",
                            contract: (0, types_1.toContractAddress)("ETHEREUM:".concat(testErc20.options.address)),
                        }];
                case 5:
                    if (currency === "ETH") {
                        return [2 /*return*/, {
                                "@type": "ETH",
                            }];
                    }
                    throw new Error("Wrong currency provided=".concat(currency));
                case 6:
                    if (wallets.seller instanceof sdk_wallet_1.TezosWallet && wallets.buyer instanceof sdk_wallet_1.TezosWallet) {
                        if (currency === "XTZ") {
                            return [2 /*return*/, {
                                    "@type": "XTZ",
                                }];
                        }
                        throw new Error("Wrong currency provided=".concat(currency));
                    }
                    else if (wallets.seller instanceof sdk_wallet_1.FlowWallet && wallets.buyer instanceof sdk_wallet_1.FlowWallet) {
                        if (currency === "FLOW_FT") {
                            return [2 /*return*/, {
                                    "@type": "FLOW_FT",
                                    contract: (0, types_1.toContractAddress)("FLOW:".concat(config_1.testsConfig.variables.FLOW_FT_CONTRACT_ADDRESS)),
                                }];
                        }
                        throw new Error("Wrong currency provided=".concat(currency));
                    }
                    else if (wallets.seller instanceof sdk_wallet_1.SolanaWallet && wallets.buyer instanceof sdk_wallet_1.SolanaWallet) {
                        if (currency === "SOLANA_SOL") {
                            return [2 /*return*/, {
                                    "@type": "SOLANA_SOL",
                                }];
                        }
                        throw new Error("Wrong currency provided=".concat(currency));
                    }
                    _a.label = 7;
                case 7: throw new Error("Incorrect wallet provided, seller=".concat(wallets.seller, ", buyer=").concat(wallets.buyer));
            }
        });
    });
}
exports.getCurrency = getCurrency;
