"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var retry_1 = require("@rarible/sdk/build/common/retry");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var config_1 = require("../../../common/config");
var burn_1 = require("../../../common/atoms-tests/burn");
var transfer_1 = require("../../../common/atoms-tests/transfer");
var collection_helper_1 = require("../../../common/api-helpers/collection-helper");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
var item_helper_1 = require("../../../common/api-helpers/item-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721",
            wallets: {
                creator: (0, wallet_1.getEthereumWallet)(),
                recipient: (0, wallet_1.getEthereumWallet)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            transferRequest: function (walletAddress) {
                return {
                    to: walletAddress,
                    amount: 1,
                };
            },
            creatorBalanceAfterTransfer: "0",
            recipientBalanceAfterTransfer: "1",
            burnRequest: {
                amount: 1,
                creators: [],
            },
            totalBalanceAfterBurn: 0,
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC721_lazy",
            wallets: {
                creator: (0, wallet_1.getEthereumWallet)(),
                recipient: (0, wallet_1.getEthereumWallet)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_721,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 1,
                };
            },
            transferRequest: function (walletAddress) {
                return {
                    to: walletAddress,
                    amount: 1,
                };
            },
            creatorBalanceAfterTransfer: "0",
            recipientBalanceAfterTransfer: "1",
            burnRequest: {
                amount: 1,
                creators: [],
            },
            totalBalanceAfterBurn: 0,
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155",
            wallets: {
                creator: (0, wallet_1.getEthereumWallet)(),
                recipient: (0, wallet_1.getEthereumWallet)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 20,
                };
            },
            transferRequest: function (walletAddress) {
                return {
                    to: walletAddress,
                    amount: 9,
                };
            },
            creatorBalanceAfterTransfer: "11",
            recipientBalanceAfterTransfer: "9",
            burnRequest: {
                amount: 4,
                creators: [],
            },
            totalBalanceAfterBurn: 16,
        },
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            description: "ERC1155_lazy",
            wallets: {
                creator: (0, wallet_1.getEthereumWallet)(),
                recipient: (0, wallet_1.getEthereumWallet)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: true,
                    supply: 20,
                };
            },
            transferRequest: function (walletAddress) {
                return {
                    to: walletAddress,
                    amount: 9,
                };
            },
            creatorBalanceAfterTransfer: "11",
            recipientBalanceAfterTransfer: "9",
            burnRequest: {
                amount: 4,
                creators: [],
            },
            totalBalanceAfterBurn: 16,
        },
    ];
}
describe.each(suites())("$blockchain mint => transfer => burn", function (suite) {
    var _a = suite.wallets, creatorWallet = _a.creator, recipientWallet = _a.recipient;
    var creatorSdk = (0, create_sdk_1.createSdk)(suite.blockchain, creatorWallet);
    var recipientSdk = (0, create_sdk_1.createSdk)(suite.blockchain, recipientWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var creatorWalletAddress, recipientWalletAddress, collection, nft;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(creatorWallet)];
                case 1:
                    creatorWalletAddress = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(recipientWallet)];
                case 2:
                    recipientWalletAddress = _a.sent();
                    return [4 /*yield*/, (0, collection_helper_1.getCollectionById)(creatorSdk, suite.collectionId)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(creatorSdk, creatorWallet, { collection: collection }, suite.mintRequest(creatorWalletAddress.unionAddress))];
                case 4:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var allItems;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, item_helper_1.getAllItems)(creatorSdk, [suite.blockchain], 50)];
                                    case 1:
                                        allItems = _a.sent();
                                        return [4 /*yield*/, (0, item_helper_1.verifyItemsByBlockchain)(allItems, suite.blockchain)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (0, item_helper_1.verifyItemsContainsItem)(allItems, nft.id)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, transfer_1.transfer)(creatorSdk, { itemId: nft.id }, suite.transferRequest(recipientWalletAddress.unionAddress))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(recipientSdk, nft.id, recipientWalletAddress.address, (0, types_1.toBigNumber)(suite.recipientBalanceAfterTransfer))];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(creatorSdk, nft.id, [api_client_1.ActivityType.MINT, api_client_1.ActivityType.TRANSFER], [api_client_1.ActivityType.MINT, api_client_1.ActivityType.TRANSFER])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (0, burn_1.burn)(recipientSdk, { itemId: nft.id }, suite.burnRequest, suite.totalBalanceAfterBurn)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(creatorSdk, nft.id, [api_client_1.ActivityType.MINT, api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.BURN], [api_client_1.ActivityType.MINT, api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.BURN])];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
