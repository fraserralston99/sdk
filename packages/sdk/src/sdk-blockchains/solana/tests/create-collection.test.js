"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var test_wallets_1 = require("../common/test/test-wallets");
var retry_1 = require("../../../common/retry");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana collection", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should create an collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var res, collection;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.createCollection({
                        blockchain: api_client_1.Blockchain.SOLANA,
                        asset: {
                            arguments: {
                                metadataURI: "https://arweave.net/Vt0uj2ql0ck-U5dLWDWJnwQaZPrvqkfxils8agrTiOc",
                            },
                        },
                    })];
                case 1:
                    res = _a.sent();
                    res.tx.wait();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () {
                            return sdk.apis.collection.getCollectionById({ collection: res.address });
                        })];
                case 2:
                    collection = _a.sent();
                    expect(collection).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
