"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var wallet_1 = require("../../../common/wallet");
var config_1 = require("../../../common/config");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var item_helper_1 = require("../../../common/api-helpers/item-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            wallet: (0, wallet_1.getEthereumWallet)(),
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
                    supply: 50,
                };
            },
        },
    ];
}
describe.each(suites())("$blockchain api => ownership", function (suite) {
    var wallet = suite.wallet;
    var sdk = (0, create_sdk_1.createSdk)(suite.blockchain, wallet);
    test("item controller", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var address, collection, nft, allItems, allItemsRaw, itemsByCollection, itemsByCollectionRaw, itemsByCreator, itemsByCreatorRaw, itemsByOwner, itemsByOwnerRaw, itemRoyalties, itemRoyaltiesRaw;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallet)];
                case 1:
                    address = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sdk, suite.collectionId)];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sdk, wallet, { collection: collection }, suite.mintRequest(address.unionAddress))];
                case 3:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(sdk, nft.id, address.address, (0, types_1.toBigNumber)(String(50)))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, helpers_1.awaitForItemSupply)(sdk, nft.id, (0, types_1.toBigNumber)(String(50)))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, item_helper_1.getItemByIdRaw)(sdk, nft.id)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, item_helper_1.getAllItems)(sdk, [suite.blockchain], 2)];
                case 7:
                    allItems = _a.sent();
                    expect(allItems.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getAllItemsRaw)(sdk, [suite.blockchain], 2)];
                case 8:
                    allItemsRaw = _a.sent();
                    expect(allItemsRaw.value.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByCollection)(sdk, collection.id, 2)];
                case 9:
                    itemsByCollection = _a.sent();
                    expect(itemsByCollection.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByCollectionRaw)(sdk, collection.id, 2)];
                case 10:
                    itemsByCollectionRaw = _a.sent();
                    expect(itemsByCollectionRaw.value.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByCreator)(sdk, address.unionAddress, 2)];
                case 11:
                    itemsByCreator = _a.sent();
                    expect(itemsByCreator.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByCreatorRaw)(sdk, address.unionAddress, 2)];
                case 12:
                    itemsByCreatorRaw = _a.sent();
                    expect(itemsByCreatorRaw.value.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByOwner)(sdk, address.unionAddress, 2)];
                case 13:
                    itemsByOwner = _a.sent();
                    expect(itemsByOwner.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemsByOwnerRaw)(sdk, address.unionAddress, 2)];
                case 14:
                    itemsByOwnerRaw = _a.sent();
                    expect(itemsByOwnerRaw.value.items.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, item_helper_1.getItemRoyaltiesById)(sdk, nft.contract, nft.tokenId)];
                case 15:
                    itemRoyalties = _a.sent();
                    expect(itemRoyalties.royalties.length).toBeGreaterThanOrEqual(0);
                    return [4 /*yield*/, (0, item_helper_1.getItemRoyaltiesByIdRaw)(sdk, nft.contract, nft.tokenId)];
                case 16:
                    itemRoyaltiesRaw = _a.sent();
                    expect(itemRoyaltiesRaw.value.royalties.length).toBeGreaterThanOrEqual(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
