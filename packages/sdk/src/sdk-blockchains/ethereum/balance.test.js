"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var index_1 = require("../../index");
var retry_1 = require("../../common/retry");
var domain_1 = require("../../domain");
var init_providers_1 = require("./test/init-providers");
var common_1 = require("./common");
describe.skip("get balance", function () {
    var _a = (0, init_providers_1.initProviders)({
        pk1: "ded057615d97f0f1c751ea2795bc4b03bbf44844c13ab4f5e6fd976506c276b9",
    }), web31 = _a.web31, wallet1 = _a.wallet1;
    var ethereum = new web3_ethereum_1.Web3Ethereum({
        web3: web31,
        from: wallet1.getAddressString(),
    });
    var sdk = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum), "development", { logs: domain_1.LogsLevel.DISABLED });
    test("get ETH balance with wallet", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddress, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletAddress = (0, types_1.toUnionAddress)("ETHEREUM:0xa14FC5C72222FAce8A1BcFb416aE2571fA1a7a91");
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, {
                            "@type": "ETH",
                        })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1.9355");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get ETH balance without wallet", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sdk, walletAddress, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, index_1.createRaribleSdk)(undefined, "development", { logs: domain_1.LogsLevel.DISABLED });
                    walletAddress = (0, types_1.toUnionAddress)("ETHEREUM:0xa14FC5C72222FAce8A1BcFb416aE2571fA1a7a91");
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, {
                            "@type": "ETH",
                        })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1.9355");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get ETH balance without wallet with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sdk, walletAddress, currency, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, index_1.createRaribleSdk)(undefined, "development", { logs: domain_1.LogsLevel.DISABLED });
                    walletAddress = (0, types_1.toUnionAddress)("ETHEREUM:0xa14FC5C72222FAce8A1BcFb416aE2571fA1a7a91");
                    currency = (0, types_1.toCurrencyId)("ETHEREUM:".concat(types_1.ZERO_ADDRESS));
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, currency)];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("1.9355");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance erc-20", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sender, contract, nextBalance, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:0xa14FC5C72222FAce8A1BcFb416aE2571fA1a7a91");
                    contract = (0, types_1.toContractAddress)("ETHEREUM:0x55eB2809896aB7414706AaCDde63e3BBb26e0BC6");
                    nextBalance = "0.00035";
                    return [4 /*yield*/, sdk.balances.getBalance(sender, {
                            "@type": "ERC20",
                            contract: contract,
                        })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual(nextBalance);
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance erc-20 with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sender, contract, nextBalance, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:0xa14FC5C72222FAce8A1BcFb416aE2571fA1a7a91");
                    contract = (0, types_1.toCurrencyId)("ETHEREUM:0x55eB2809896aB7414706AaCDde63e3BBb26e0BC6");
                    nextBalance = "0.00035";
                    return [4 /*yield*/, sdk.balances.getBalance(sender, contract)];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual(nextBalance);
                    return [2 /*return*/];
            }
        });
    }); });
    test("convert from eth to wETH", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, wethE2eAssetType, sender, initWethBalance, convertTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    wethE2eAssetType = {
                        "@type": "ERC20",
                        contract: (0, common_1.convertEthereumContractAddress)("0x55eB2809896aB7414706AaCDde63e3BBb26e0BC6", api_client_1.Blockchain.ETHEREUM),
                    };
                    sender = (0, common_1.convertEthereumToUnionAddress)(senderRaw, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, sdk.balances.getBalance(sender, wethE2eAssetType)];
                case 1:
                    initWethBalance = _a.sent();
                    return [4 /*yield*/, sdk.balances.convert({
                            blockchain: api_client_1.Blockchain.ETHEREUM,
                            isWrap: true,
                            value: "0.00035",
                        })];
                case 2:
                    convertTx = _a.sent();
                    return [4 /*yield*/, convertTx.wait()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var finishWethBalance;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance(sender, wethE2eAssetType)];
                                    case 1:
                                        finishWethBalance = _a.sent();
                                        expect(finishWethBalance.toString()).toBe(new bignumber_js_1.default(initWethBalance).plus("0.00035").toString());
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("convert from wETH to eth", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, wethE2eAssetType, sender, balanceWithoutWeth, prepareConvertTx, initWethBalance, convertTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    wethE2eAssetType = {
                        "@type": "ERC20",
                        contract: (0, common_1.convertEthereumContractAddress)("0x55eB2809896aB7414706AaCDde63e3BBb26e0BC6", api_client_1.Blockchain.ETHEREUM),
                    };
                    sender = (0, common_1.convertEthereumToUnionAddress)(senderRaw, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, sdk.balances.getBalance(sender, wethE2eAssetType)];
                case 1:
                    balanceWithoutWeth = _a.sent();
                    return [4 /*yield*/, sdk.balances.convert({
                            blockchain: api_client_1.Blockchain.ETHEREUM,
                            isWrap: true,
                            value: "0.00000000000071",
                        })];
                case 2:
                    prepareConvertTx = _a.sent();
                    return [4 /*yield*/, prepareConvertTx.wait()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var initWethBalance;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance(sender, wethE2eAssetType)];
                                    case 1:
                                        initWethBalance = _a.sent();
                                        if (new bignumber_js_1.default(balanceWithoutWeth).isEqualTo(initWethBalance)) {
                                            throw new Error("Balance was not updated after init convert operation");
                                        }
                                        return [2 /*return*/, initWethBalance];
                                }
                            });
                        }); })];
                case 4:
                    initWethBalance = _a.sent();
                    return [4 /*yield*/, sdk.balances.convert({
                            blockchain: api_client_1.Blockchain.ETHEREUM,
                            isWrap: false,
                            value: "0.00000000000039",
                        })];
                case 5:
                    convertTx = _a.sent();
                    return [4 /*yield*/, convertTx.wait()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var finishWethBalance;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk.balances.getBalance(sender, wethE2eAssetType)];
                                    case 1:
                                        finishWethBalance = _a.sent();
                                        expect(finishWethBalance.toString()).toBe(new bignumber_js_1.default(initWethBalance).minus("0.00000000000039").toString());
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe.skip("get polygon balance", function () {
    var sdk = (0, index_1.createRaribleSdk)(undefined, "staging", { logs: domain_1.LogsLevel.DISABLED });
    test("get Matic balance", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddress, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletAddress = (0, types_1.toUnionAddress)("ETHEREUM:0xc8f35463Ea36aEE234fe7EFB86373A78BF37e2A1");
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, {
                            "@type": "ETH",
                            blockchain: api_client_1.Blockchain.POLYGON,
                        })];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0.009145");
                    return [2 /*return*/];
            }
        });
    }); });
    test("get Matic balance with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddress, currency, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletAddress = (0, types_1.toUnionAddress)("ETHEREUM:0xc8f35463Ea36aEE234fe7EFB86373A78BF37e2A1");
                    currency = (0, types_1.toCurrencyId)("POLYGON:".concat(types_1.ZERO_ADDRESS));
                    return [4 /*yield*/, sdk.balances.getBalance(walletAddress, currency)];
                case 1:
                    balance = _a.sent();
                    expect(balance.toString()).toEqual("0.009145");
                    return [2 /*return*/];
            }
        });
    }); });
});
describe.skip("Bidding balance", function () {
    var _a = (0, init_providers_1.initProviders)({
        pk1: "ded057615d97f0f1c751ea2795bc4b03bbf44844c13ab4f5e6fd976506c276b9",
    }), web31 = _a.web31, wallet1 = _a.wallet1;
    var ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var wallet = new sdk_wallet_1.EthereumWallet(ethereum);
    var sdk = (0, index_1.createRaribleSdk)(wallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    test("Should check bidding balance & deposit & withdraw", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var checkBalance, initBalance, _a, tx, remainBalance;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    checkBalance = function (expecting) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var balance;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.balances.getBiddingBalance({
                                        blockchain: api_client_1.Blockchain.ETHEREUM,
                                        walletAddress: (0, types_1.toUnionAddress)("ETHEREUM:" + wallet1.getAddressString()),
                                    })];
                                case 1:
                                    balance = _a.sent();
                                    if (expecting !== null) {
                                        expect(parseFloat(balance.toString())).toBeCloseTo(parseFloat(expecting.toString()), 5);
                                    }
                                    return [2 /*return*/, balance];
                            }
                        });
                    }); };
                    _a = bignumber_js_1.default.bind;
                    return [4 /*yield*/, checkBalance(null)];
                case 1:
                    initBalance = new (_a.apply(bignumber_js_1.default, [void 0, _b.sent()]))();
                    return [4 /*yield*/, checkBalance(initBalance)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, sdk.balances.depositBiddingBalance({ amount: 0.005, blockchain: api_client_1.Blockchain.ETHEREUM })];
                case 3:
                    tx = _b.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, checkBalance(new bignumber_js_1.default(initBalance).plus(0.005))];
                case 5:
                    remainBalance = _b.sent();
                    return [4 /*yield*/, sdk.balances.withdrawBiddingBalance({ amount: remainBalance, blockchain: api_client_1.Blockchain.ETHEREUM })];
                case 6:
                    tx = _b.sent();
                    return [4 /*yield*/, tx.wait()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, checkBalance(0)];
                case 8:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
