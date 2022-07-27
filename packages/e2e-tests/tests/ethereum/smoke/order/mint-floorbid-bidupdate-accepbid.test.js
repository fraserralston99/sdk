"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var retry_1 = require("@rarible/sdk/build/common/retry");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var bid_1 = require("../../../common/atoms-tests/bid");
var accept_bid_1 = require("../../../common/atoms-tests/accept-bid");
var currency_1 = require("../../../common/currency");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var bid_update_1 = require("../../../common/atoms-tests/bid-update");
var create_collection_1 = require("../../../common/atoms-tests/create-collection");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721 <=> ERC20",
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC721",
                    arguments: {
                        name: "name",
                        symbol: "RARI",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: false,
                    },
                },
            },
            mintRequest: function (creatorAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            currency: "ERC20",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
            updateBidRequest: {
                price: "0.0000000000000002",
            },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721_lazy <=> ERC20",
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC721",
                    arguments: {
                        name: "name",
                        symbol: "RARI",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: false,
                    },
                },
            },
            mintRequest: function (creatorAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 1,
                };
            },
            currency: "ERC20",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
            updateBidRequest: {
                price: "0.0000000000000002",
            },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155 <=> ERC20",
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC1155",
                    arguments: {
                        name: "name",
                        symbol: "RARI",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: false,
                    },
                },
            },
            mintRequest: function (creatorAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 20,
                };
            },
            currency: "ERC20",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 5,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
            updateBidRequest: {
                price: "0.0000000000000002",
            },
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155_lazy <=> ERC20",
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC1155",
                    arguments: {
                        name: "name",
                        symbol: "RARI",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: false,
                    },
                },
            },
            mintRequest: function (creatorAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 20,
                };
            },
            currency: "ERC20",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 5,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
            updateBidRequest: {
                price: "0.0000000000000002",
            },
        },
    ];
}
// deprecated, should be removed
describe.each(suites())("$blockchain mint => floorBid => bidUpdate => acceptBid", function (suite) {
    var _a = suite.wallets, sellerWallet = _a.seller, buyerWallet = _a.buyer;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, walletAddressBuyer, address, collection, nft, requestCurrency, bidRequest, bidOrder, collection3;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    walletAddressSeller = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(buyerWallet)];
                case 2:
                    walletAddressBuyer = _a.sent();
                    return [4 /*yield*/, (0, create_collection_1.createCollection)(sellerSdk, sellerWallet, suite.deployRequest)];
                case 3:
                    address = (_a.sent()).address;
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, address)];
                case 4:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 5:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 6:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.bidRequest(requestCurrency)];
                case 7:
                    bidRequest = _a.sent();
                    return [4 /*yield*/, (0, bid_1.bid)(buyerSdk, buyerWallet, { collectionId: collection.id }, bidRequest)];
                case 8:
                    bidOrder = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var collection1;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, address)];
                                    case 1:
                                        collection1 = _b.sent();
                                        expect((_a = collection1.bestBidOrder) === null || _a === void 0 ? void 0 : _a.takePrice).toBe(bidRequest.price);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, (0, bid_update_1.bidUpdate)(buyerSdk, buyerWallet, { orderId: bidOrder.id }, suite.updateBidRequest)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var collection2;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, address)];
                                    case 1:
                                        collection2 = _b.sent();
                                        expect((_a = collection2.bestBidOrder) === null || _a === void 0 ? void 0 : _a.takePrice).toBe(suite.updateBidRequest.price);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, (0, accept_bid_1.acceptBid)(sellerSdk, sellerWallet, { orderId: bidOrder.id }, {
                            amount: bidRequest.amount,
                            itemId: nft.id,
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(buyerSdk, nft.id, walletAddressBuyer.address, (0, types_1.toBigNumber)(String(bidRequest.amount)))];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, address)];
                case 14:
                    collection3 = _a.sent();
                    expect(collection3.bestBidOrder).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
