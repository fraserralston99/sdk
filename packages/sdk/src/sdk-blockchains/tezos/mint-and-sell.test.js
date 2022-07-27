"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var test_wallet_1 = require("./test/test-wallet");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("test tezos mint and sell", function () {
    var env = "development";
    var sellerWallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sellerSdk = (0, index_1.createRaribleSdk)(sellerWallet, env, { logs: domain_1.LogsLevel.DISABLED });
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    test("mint and sell nft", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintAndSellAction = _a.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: { "@type": "XTZ" },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("mint and sell mt", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintAndSellAction;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sellerSdk.nft.mintAndSell({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintAndSellAction = _a.sent();
                    return [4 /*yield*/, mintAndSellAction.submit({
                            price: new bignumber_js_1.default("0.0001"),
                            currency: { "@type": "XTZ" },
                            uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                            supply: 1,
                            lazyMint: false,
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
