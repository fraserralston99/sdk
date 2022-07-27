"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var retry_1 = require("@rarible/sdk/src/common/retry");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var create_collection_1 = require("../../../common/atoms-tests/create-collection");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
var collection_helper_1 = require("../../../common/api-helpers/collection-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721",
            wallet: (0, wallet_1.getEthereumWallet)(),
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
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs:/test",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            activities: [api_client_1.ActivityType.MINT],
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721_lazy",
            wallet: (0, wallet_1.getEthereumWallet)(),
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
                        operators: [],
                    },
                },
            },
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs:/test",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 1,
                };
            },
            activities: [],
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155",
            wallet: (0, wallet_1.getEthereumWallet)(),
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
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs:/test",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 14,
                };
            },
            activities: [api_client_1.ActivityType.MINT],
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155_lazy",
            wallet: (0, wallet_1.getEthereumWallet)(),
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC1155",
                    arguments: {
                        name: "name",
                        symbol: "RARI",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: true,
                        operators: [],
                    },
                },
            },
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs:/test",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 14,
                };
            },
            activities: [],
        },
    ];
}
describe.each(suites() /*.filter((t) => t.description === "ERC1155")*/)("$blockchain deploy => mint", function (suite) {
    var wallet = suite.wallet;
    var sdk = (0, create_sdk_1.createSdk)(suite.blockchain, wallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddress, address, collection, nft;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallet)];
                case 1:
                    walletAddress = _a.sent();
                    return [4 /*yield*/, (0, create_collection_1.createCollection)(sdk, wallet, suite.deployRequest)];
                case 2:
                    address = (_a.sent()).address;
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sdk, address)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var collectionsAll;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, collection_helper_1.getAllCollections)(sdk, [suite.blockchain], 10)];
                                    case 1:
                                        collectionsAll = _a.sent();
                                        return [4 /*yield*/, (0, collection_helper_1.verifyCollectionsByBlockchain)(collectionsAll, suite.blockchain)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (0, collection_helper_1.verifyCollectionsContainsCollection)(collectionsAll, address)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var collectionsByOwner;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, collection_helper_1.getCollectionsByOwner)(sdk, walletAddress.unionAddress, 10)];
                                    case 1:
                                        collectionsByOwner = _a.sent();
                                        return [4 /*yield*/, (0, collection_helper_1.verifyCollectionsByBlockchain)(collectionsByOwner, suite.blockchain)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (0, collection_helper_1.verifyCollectionsOwner)(collectionsByOwner, walletAddress.unionAddress)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, (0, collection_helper_1.verifyCollectionsContainsCollection)(collectionsByOwner, address)];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sdk, wallet, { collection: collection }, suite.mintRequest(walletAddress.unionAddress))];
                case 6:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sdk, nft.id, [api_client_1.ActivityType.MINT], suite.activities)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
