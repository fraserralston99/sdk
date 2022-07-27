"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var sell_1 = require("../../../common/atoms-tests/sell");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var buy_1 = require("../../../common/atoms-tests/buy");
var config_1 = require("../../../common/config");
var currency_1 = require("../../../common/currency");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721 <=> ETH",
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
            description: "ERC721_lazy <=> ERC20",
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
            description: "ERC721_lazy <=> ETH",
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
            description: "ERC1155 <=> ETH",
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
                            amount: 3,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ERC20",
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
                            amount: 3,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ETH",
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
                            amount: 3,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ERC20",
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
                            amount: 3,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
    ];
}
describe.each(suites())("$blockchain mint => sell => buy", function (suite) {
    var _a = suite.wallets, sellerWallet = _a.seller, buyerWallet = _a.buyer;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, walletAddressBuyer, collection, nft, requestCurrency, orderRequest, sellOrder, buyAmount;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    walletAddressSeller = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(buyerWallet)];
                case 2:
                    walletAddressBuyer = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, suite.collectionId)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 4:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 5:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.sellRequest(requestCurrency)];
                case 6:
                    orderRequest = _a.sent();
                    return [4 /*yield*/, (0, sell_1.sell)(sellerSdk, sellerWallet, { itemId: nft.id }, orderRequest)];
                case 7:
                    sellOrder = _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sellerSdk, nft.id, [api_client_1.ActivityType.LIST], [api_client_1.ActivityType.LIST])];
                case 8:
                    _a.sent();
                    buyAmount = orderRequest.amount;
                    return [4 /*yield*/, (0, buy_1.buy)(buyerSdk, buyerWallet, nft.id, { orderId: sellOrder.id }, { amount: buyAmount })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, (0, helpers_1.awaitOrderStock)(sellerSdk, sellOrder.id, (0, types_1.toBigNumber)("0"))];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(buyerSdk, nft.id, walletAddressBuyer.address, (0, types_1.toBigNumber)(String(buyAmount)))];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sellerSdk, nft.id, [api_client_1.ActivityType.SELL, api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.MINT, api_client_1.ActivityType.LIST], [api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.SELL, api_client_1.ActivityType.LIST, api_client_1.ActivityType.MINT])];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
