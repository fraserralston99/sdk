"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var domain_1 = require("../../../types/nft/mint/domain");
var retry_1 = require("../../../common/retry");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana mint", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("mint an nft", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var submit, res, nft;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)("SOLANA:Ev9n3xAfCrxPrUSUN4mLorwfaknjj4QMcyLUnbPymSmJ"),
                    })];
                case 1:
                    submit = (_a.sent()).submit;
                    return [4 /*yield*/, submit({
                            supply: 0,
                            lazyMint: false,
                            uri: "https://arweave.net/Vt0uj2ql0ck-U5dLWDWJnwQaZPrvqkfxils8agrTiOc",
                        })];
                case 2:
                    res = _a.sent();
                    expect(res.itemId).toBeTruthy();
                    expect(res.type).toEqual(domain_1.MintType.ON_CHAIN);
                    if (!(res.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.transaction.wait()];
                case 3:
                    _a.sent();
                    expect(res.transaction.hash).toBeTruthy();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return sdk.apis.item.getItemById({ itemId: res.itemId }); })];
                case 5:
                    nft = _a.sent();
                    expect(nft.id).toEqual(res.itemId);
                    return [2 /*return*/];
            }
        });
    }); });
});
