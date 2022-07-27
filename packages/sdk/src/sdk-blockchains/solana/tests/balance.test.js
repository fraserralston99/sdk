"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var domain_1 = require("../../../types/nft/mint/domain");
var retry_1 = require("../../../common/retry");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana get balance", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("get balance SOL", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.balances.getBalance((0, types_1.toUnionAddress)("SOLANA:" + wallet.publicKey), (0, types_1.toCurrencyId)("SOLANA:".concat(types_1.ZERO_ADDRESS)))];
                case 1:
                    balance = _a.sent();
                    expect(parseFloat(balance.toString())).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test("get balance NFT", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mint, mintRes, balance;
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
                case 4: return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var balance;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.balances.getBalance((0, types_1.toUnionAddress)("SOLANA:" + wallet.publicKey), (0, types_1.toCurrencyId)(mintRes.itemId))];
                                case 1:
                                    balance = _a.sent();
                                    if (parseFloat(balance.toString()) < 1) {
                                        throw new Error("Wrong balance value. Expected ".concat(1, ". Actual: ").concat(balance.toString()));
                                    }
                                    return [2 /*return*/, balance];
                            }
                        });
                    }); })];
                case 5:
                    balance = _a.sent();
                    expect(parseFloat(balance.toString())).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
