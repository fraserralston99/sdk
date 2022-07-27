"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../index");
var domain_1 = require("../../types/nft/mint/domain");
var domain_2 = require("../../domain");
var await_item_supply_1 = require("../ethereum/test/await-item-supply");
var test_wallet_1 = require("./test/test-wallet");
var test_contracts_1 = require("./test/test-contracts");
describe.skip("mint test", function () {
    var env = "testnet";
    var wallet = (0, test_wallet_1.createTestWallet)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_2.LogsLevel.DISABLED });
    var nftContract = (0, test_contracts_1.getTestContract)(env, "nftContract");
    var mtContract = (0, test_contracts_1.getTestContract)(env, "mtContract");
    test("mint NFT token test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult, _a, _b, _c, _d;
        var _e, _f;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(nftContract),
                    })];
                case 1:
                    mintResponse = _g.sent();
                    _b = (_a = mintResponse).submit;
                    _e = {
                        uri: "ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4",
                        supply: 1,
                        lazyMint: false
                    };
                    _f = {};
                    _c = types_1.toUnionAddress;
                    _d = "TEZOS:".concat;
                    return [4 /*yield*/, wallet.provider.address()];
                case 2: return [4 /*yield*/, _b.apply(_a, [(_e.royalties = [(_f.account = _c.apply(void 0, [_d.apply("TEZOS:", [_g.sent()])]),
                                _f.value = 1000,
                                _f)],
                            _e.creators = [{
                                    account: (0, types_1.toUnionAddress)("TEZOS:tz1RLtXUYvgv7uTZGJ1ZtPQFg3PZkj4NUHrz"),
                                    value: 10000,
                                }],
                            _e)])];
                case 3:
                    mintResult = _g.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _g.sent();
                    _g.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, "1")];
                case 6:
                    _g.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test("mint MT token test", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var mintResponse, mintResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        collectionId: (0, types_1.toCollectionId)(mtContract),
                    })];
                case 1:
                    mintResponse = _a.sent();
                    return [4 /*yield*/, mintResponse.submit({
                            uri: "ipfs://bafkreiczcdnvl3qr7fscbokjd5cakiuihhbb7q3zjpxpo5ij6ehazfjety",
                            supply: 12,
                            lazyMint: false,
                            creators: [{
                                    account: (0, types_1.toUnionAddress)("TEZOS:tz1RLtXUYvgv7uTZGJ1ZtPQFg3PZkj4NUHrz"),
                                    value: 10000,
                                }],
                        })];
                case 2:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, "12")];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, 1500000);
    test("tezos preprocess metadata", function () {
        var response = sdk.nft.preprocessMeta({
            blockchain: api_client_1.Blockchain.TEZOS,
            name: "1",
            description: "2",
            image: {
                url: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                mimeType: "image/jpeg",
                fileName: "image",
            },
            animation: {
                url: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG2",
                mimeType: "image/mp4",
                fileName: "video",
            },
            external: "https://rarible.com",
            attributes: [{
                    key: "eyes",
                    value: "1",
                }],
        });
        expect(response.name).toBe("1");
        expect(response.description).toBe("2");
        expect(response.decimals).toBe(0);
        expect(response.artifactUri).toBe("ipfs://QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG2");
        expect(response.displayUri).toBe("ipfs://QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1");
        expect(response.formats).toStrictEqual([
            {
                uri: "ipfs://QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG1",
                mimeType: "image/jpeg",
                fileName: "image",
            },
            {
                uri: "ipfs://QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG2",
                mimeType: "image/mp4",
                fileName: "video",
            },
        ]);
        expect(response.attributes[0].name).toBe("eyes");
        expect(response.attributes[0].value).toBe("1");
    });
});
