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
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            wallet: (0, wallet_1.getEthereumWallet)(),
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
                    supply: 50,
                };
            },
        },
    ];
}
describe.each(suites())("$blockchain api => ownership", function (suite) {
    var wallet = suite.wallet;
    var sdk = (0, create_sdk_1.createSdk)(suite.blockchain, wallet);
    test("ownership controller", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var address, collection, nft, actualOwnerships, actualOwnershipsAll;
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
                    return [4 /*yield*/, (0, ownership_helper_1.getOwnershipByIdRaw)(sdk, nft.id, address.address)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.getOwnershipsByItem)(sdk, nft.contract, nft.tokenId)];
                case 6:
                    actualOwnerships = _a.sent();
                    expect(actualOwnerships.ownerships.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, ownership_helper_1.getOwnershipsByItemRaw)(sdk, nft.contract, nft.tokenId)];
                case 7:
                    actualOwnershipsAll = _a.sent();
                    expect(actualOwnershipsAll.value.ownerships.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
