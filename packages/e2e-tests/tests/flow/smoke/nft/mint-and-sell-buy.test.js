"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var config_1 = require("../../../common/config");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var helpers_1 = require("../../../common/helpers");
var mint_and_sell_1 = require("../../../common/atoms-tests/mint-and-sell");
var buy_1 = require("../../../common/atoms-tests/buy");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.FLOW,
            description: "NFT <=> FLOW_FT",
            wallets: {
                creator: (0, wallet_1.getFlowSellerWallet)(),
                buyer: (0, wallet_1.getFlowBuyerWallet)(),
            },
            collectionId: config_1.testsConfig.variables.FLOW_RARIBLE_COLLECTION,
            mintAndSellRequest: function () {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                    price: "0.0001",
                    currency: {
                        "@type": "FLOW_FT",
                        contract: (0, types_1.toContractAddress)("FLOW:".concat(config_1.testsConfig.variables.FLOW_FT_CONTRACT_ADDRESS)),
                    },
                };
            },
            buyAmount: 1,
            creatorBalance: 0,
            mintSellActivities: [api_client_1.ActivityType.MINT, api_client_1.ActivityType.LIST],
        },
    ];
}
describe.each(suites())("$blockchain mint-and-sell => buy", function (suite) {
    var _a = suite.wallets, creatorWallet = _a.creator, buyerWallet = _a.buyer;
    var creatorSdk = (0, create_sdk_1.createSdk)(suite.blockchain, creatorWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressCreator, walletAddressBuyer, collection, mintAndSellResponse;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(creatorWallet)];
                case 1:
                    walletAddressCreator = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(buyerWallet)];
                case 2:
                    walletAddressBuyer = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(creatorSdk, suite.collectionId)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_and_sell_1.mintAndSell)(creatorSdk, creatorWallet, { collection: collection }, suite.mintAndSellRequest(walletAddressCreator.unionAddress))];
                case 4:
                    mintAndSellResponse = _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(creatorSdk, mintAndSellResponse.itemId, [api_client_1.ActivityType.MINT, api_client_1.ActivityType.LIST], suite.mintSellActivities)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, buy_1.buy)(buyerSdk, buyerWallet, mintAndSellResponse.itemId, { orderId: mintAndSellResponse.orderId }, { amount: suite.buyAmount })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(buyerSdk, mintAndSellResponse.itemId, walletAddressBuyer.address, (0, types_1.toBigNumber)(String(suite.buyAmount)))];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(creatorSdk, mintAndSellResponse.itemId, [api_client_1.ActivityType.SELL, api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.MINT, api_client_1.ActivityType.LIST], [api_client_1.ActivityType.TRANSFER, api_client_1.ActivityType.SELL, api_client_1.ActivityType.LIST, api_client_1.ActivityType.MINT])];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});