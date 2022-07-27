"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var collection_helper_1 = require("../../../common/api-helpers/collection-helper");
var create_collection_1 = require("../../../common/atoms-tests/create-collection");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            wallet: (0, wallet_1.getEthereumWallet)(),
            deployRequest: {
                blockchain: api_client_1.Blockchain.ETHEREUM,
                asset: {
                    assetType: "ERC721",
                    arguments: {
                        name: "erc721",
                        symbol: "rari",
                        baseURI: "https://ipfs.rarible.com",
                        contractURI: "https://ipfs.rarible.com",
                        isUserToken: false,
                    },
                },
            },
        },
    ];
}
describe.each(suites())("$blockchain api => collection", function (suite) {
    var wallet = suite.wallet;
    var sdk = (0, create_sdk_1.createSdk)(suite.blockchain, wallet);
    test("collection controller", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var address, walletAddress, actualAllCollections, actualAllCollectionsRaw, actualCollectionsByOwner, actualCollectionsByOwnerRaw;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_collection_1.createCollection)(sdk, wallet, suite.deployRequest)];
                case 1:
                    address = (_a.sent()).address;
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(wallet)];
                case 2:
                    walletAddress = _a.sent();
                    return [4 /*yield*/, (0, collection_helper_1.getCollectionById)(sdk, address)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, collection_helper_1.getCollectionByIdRaw)(sdk, address)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, collection_helper_1.getAllCollections)(sdk, [suite.blockchain], 2)];
                case 5:
                    actualAllCollections = _a.sent();
                    expect(actualAllCollections.collections.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, collection_helper_1.getAllCollectionsRaw)(sdk, [suite.blockchain], 2)];
                case 6:
                    actualAllCollectionsRaw = _a.sent();
                    expect(actualAllCollectionsRaw.value.collections.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, collection_helper_1.getCollectionsByOwner)(sdk, walletAddress.unionAddress, 2)];
                case 7:
                    actualCollectionsByOwner = _a.sent();
                    expect(actualCollectionsByOwner.collections.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, collection_helper_1.getCollectionsByOwnerRaw)(sdk, walletAddress.unionAddress, 2)];
                case 8:
                    actualCollectionsByOwnerRaw = _a.sent();
                    expect(actualCollectionsByOwnerRaw.value.collections.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
