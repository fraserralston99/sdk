"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var sell_1 = require("../../../common/atoms-tests/sell");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var cancel_1 = require("../../../common/atoms-tests/cancel");
var config_1 = require("../../../common/config");
var currency_1 = require("../../../common/currency");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721 <=> ETH",
            isLazy: false,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            currency: "ETH",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721 <=> ERC20",
            isLazy: false,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            currency: "ERC20",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721_lazy <=> ETH",
            isLazy: true,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 1,
                };
            },
            currency: "ETH",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721_lazy <=> ERC20",
            isLazy: true,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 1,
                };
            },
            currency: "ERC20",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ETH",
            isLazy: false,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 20,
                };
            },
            currency: "ETH",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 20,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ERC20",
            isLazy: false,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 20,
                };
            },
            currency: "ERC20",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 20,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155_lazy <=> ETH",
            isLazy: true,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 20,
                };
            },
            currency: "ETH",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 20,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155_lazy <=> ERC20",
            isLazy: true,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 20,
                };
            },
            currency: "ERC20",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 20,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
    ];
}
describe.each(suites())("$blockchain mint => sell => cancel", function (suite) {
    var sellerWallet = suite.wallets.seller;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var sellerWalletAddress, collection, nft, requestCurrency, orderRequest, sellOrder, NORMAL_ACTIVITIES, LAZY_ACTIVITIES;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    sellerWalletAddress = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, suite.collectionId)];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(sellerWalletAddress.unionAddress))];
                case 3:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 4:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.sellRequest(requestCurrency)];
                case 5:
                    orderRequest = _a.sent();
                    return [4 /*yield*/, (0, sell_1.sell)(sellerSdk, sellerWallet, { itemId: nft.id }, orderRequest)];
                case 6:
                    sellOrder = _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sellerSdk, nft.id, [api_client_1.ActivityType.LIST], [api_client_1.ActivityType.LIST])];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, cancel_1.cancel)(sellerSdk, sellerWallet, { orderId: sellOrder.id })];
                case 8:
                    _a.sent();
                    NORMAL_ACTIVITIES = [api_client_1.ActivityType.LIST, api_client_1.ActivityType.MINT, api_client_1.ActivityType.CANCEL_LIST];
                    LAZY_ACTIVITIES = [api_client_1.ActivityType.LIST, api_client_1.ActivityType.CANCEL_LIST] // lazy items dont mint onchain
                    ;
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sellerSdk, nft.id, [api_client_1.ActivityType.MINT, api_client_1.ActivityType.LIST, api_client_1.ActivityType.CANCEL_LIST], suite.isLazy ? LAZY_ACTIVITIES : NORMAL_ACTIVITIES)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
