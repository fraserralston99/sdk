"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../types/nft/mint/domain");
var domain_2 = require("../../domain");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var test_wallet_1 = require("./test/test-wallet");
var await_for_ownership_1 = require("./test/await-for-ownership");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("transfer test", function () {
    var env = "development";
    var wallet = (0, test_wallet_1.createTestWallet)("edsk3UUamwmemNBJgDvS8jXCgKsvjL2NoTwYRFpGSRPut4Hmfs6dG8", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var recipient = "tz1VXxRfyFHoPXBVUrWY5tsa1oWevrgChhSg";
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    test("transfer NFT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, transfer, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("1"))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.transfer({
                            itemId: mintResult.itemId,
                        })];
                case 6:
                    transfer = _a.sent();
                    return [4 /*yield*/, transfer.submit({
                            to: (0, types_1.toUnionAddress)("TEZOS:".concat(recipient)),
                            amount: 1,
                        })];
                case 7:
                    result = _a.sent();
                    return [4 /*yield*/, result.wait()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(sdk, mintResult.itemId, recipient)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test("transfer MT test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, transfer, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 10,
                            lazyMint: false,
                        })];
                case 2:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("10"))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.transfer({
                            itemId: mintResult.itemId,
                        })];
                case 6:
                    transfer = _a.sent();
                    return [4 /*yield*/, transfer.submit({
                            to: (0, types_1.toUnionAddress)("TEZOS:".concat(recipient)),
                            amount: 5,
                        })];
                case 7:
                    result = _a.sent();
                    return [4 /*yield*/, result.wait()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (0, await_for_ownership_1.awaitForOwnership)(sdk, mintResult.itemId, recipient)];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
});
