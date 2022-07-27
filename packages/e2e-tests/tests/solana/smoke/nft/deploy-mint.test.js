"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var create_collection_1 = require("../../../common/atoms-tests/create-collection");
var activity_helper_1 = require("../../../common/api-helpers/activity-helper");
function suites() {
    return [
        {
            blockchain: api_client_1.Blockchain.SOLANA,
            description: "NFT",
            wallet: (0, wallet_1.getSolanaWallet)(),
            deployRequest: {
                blockchain: api_client_1.Blockchain.SOLANA,
                asset: {
                    arguments: {
                        metadataURI: "https://gist.githubusercontent.com/rzcoder/757f644f9755acb00aa8c34b619eb2a8/raw/ab18b90681643279c63ed96a666c622700bf30aa/konosuba",
                    },
                },
            },
            mintRequest: function (walletAddress) {
                return {
                    uri: "https://arweave.net/Vt0uj2ql0ck-U5dLWDWJnwQaZPrvqkfxils8agrTiOc",
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
    ];
}
describe.each(suites())("$blockchain deploy => mint", function (suite) {
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
                    return [4 /*yield*/, (0, mint_1.mint)(sdk, wallet, { collection: collection }, suite.mintRequest(walletAddress.unionAddress))];
                case 4:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, activity_helper_1.getActivitiesByItem)(sdk, nft.id, [api_client_1.ActivityType.MINT], suite.activities)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
