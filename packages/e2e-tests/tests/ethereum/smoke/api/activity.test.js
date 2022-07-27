"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var models_1 = require("@rarible/api-client/build/models");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var config_1 = require("../../../common/config");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            wallets: { seller: (0, wallet_1.getEthereumWallet)() },
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
        },
    ];
}
describe.each(suites())("$blockchain api => activity", function (suite) {
    var sellerWallet = suite.wallets.seller;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    test("activity controller", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, collection, nft, activitiesByCollection, activitiesByCollectionRaw, activitiesByItem, activitiesByItemRaw, activitiesByUser, activitiesByUserRaw, allActivities, allActivitiesRaw;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    walletAddressSeller = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, suite.collectionId)];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 3:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByCollection)(sellerSdk, suite.collectionId, [api_client_1.ActivityType.MINT])];
                case 4:
                    activitiesByCollection = _a.sent();
                    expect(activitiesByCollection.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByCollectionRaw)(sellerSdk, suite.collectionId, [api_client_1.ActivityType.MINT])];
                case 5:
                    activitiesByCollectionRaw = _a.sent();
                    expect(activitiesByCollectionRaw.value.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sellerSdk, nft.id, [api_client_1.ActivityType.MINT])];
                case 6:
                    activitiesByItem = _a.sent();
                    expect(activitiesByItem.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItemRaw)(sellerSdk, nft.id, [api_client_1.ActivityType.MINT])];
                case 7:
                    activitiesByItemRaw = _a.sent();
                    expect(activitiesByItemRaw.value.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByUser)(sellerSdk, [walletAddressSeller.unionAddress], [models_1.UserActivityType.MINT])];
                case 8:
                    activitiesByUser = _a.sent();
                    expect(activitiesByUser.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByUserRaw)(sellerSdk, [walletAddressSeller.unionAddress], [models_1.UserActivityType.MINT])];
                case 9:
                    activitiesByUserRaw = _a.sent();
                    expect(activitiesByUserRaw.value.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getAllActivities)(sellerSdk, [suite.blockchain], [api_client_1.ActivityType.MINT])];
                case 10:
                    allActivities = _a.sent();
                    expect(allActivities.activities.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, activity_helper_1.getAllActivitiesRaw)(sellerSdk, [suite.blockchain], [api_client_1.ActivityType.MINT])];
                case 11:
                    allActivitiesRaw = _a.sent();
                    expect(allActivitiesRaw.value.activities.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
