"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintToken = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var domain_1 = require("../../../../types/nft/mint/domain");
var retry_1 = require("../../../../common/retry");
function mintToken(sdk) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mint, mintRes;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)("SOLANA:Ev9n3xAfCrxPrUSUN4mLorwfaknjj4QMcyLUnbPymSmJ"),
                    })];
                case 1:
                    mint = _a.sent();
                    return [4 /*yield*/, mint.submit({
                            supply: 0,
                            lazyMint: false,
                            uri: "https://arweave.net/Vt0uj2ql0ck-U5dLWDWJnwQaZPrvqkfxils8agrTiOc",
                        })];
                case 2:
                    mintRes = _a.sent();
                    if (!(mintRes.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintRes.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sdk.apis.item.getItemById({ itemId: mintRes.itemId })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
                case 5: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.mintToken = mintToken;
