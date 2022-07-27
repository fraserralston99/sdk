"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var test_wallets_1 = require("../common/test/test-wallets");
var create_sdk_1 = require("../common/test/create-sdk");
describe("Solana metadata", function () {
    var wallet = (0, test_wallets_1.getWallet)();
    var sdk = (0, create_sdk_1.createSdk)(wallet);
    test("Should create correct metadata", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var meta;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            meta = sdk.nft.preprocessMeta({
                blockchain: api_client_1.Blockchain.SOLANA,
                name: "name",
                symbol: "TEST",
                description: "description",
                royalties: { account: (0, types_1.toUnionAddress)("SOLANA:abc"), value: 15 },
                external: "http://external.url",
                image: { url: "http://image.png", mimeType: "image/png" },
                animation: { url: "http://image.gif", mimeType: "image/gif" },
                attributes: [{
                        key: "a1",
                        value: "1",
                    }, {
                        key: "a2",
                        value: "2",
                    }],
            });
            expect(meta.name).toEqual("name");
            expect(meta.symbol).toEqual("TEST");
            expect(meta.description).toEqual("description");
            expect(meta.seller_fee_basis_points).toEqual(1500);
            expect(meta.image).toEqual("http://image.png");
            expect(meta.animation_url).toEqual("http://image.gif");
            expect(meta.external_url).toEqual("http://external.url");
            expect((_a = meta.properties) === null || _a === void 0 ? void 0 : _a.creators).toEqual([{ address: wallet.publicKey.toString(), share: 100 }]);
            expect((_b = meta.properties) === null || _b === void 0 ? void 0 : _b.files).toEqual([
                {
                    uri: "http://image.png",
                    type: "image/png",
                },
                {
                    uri: "http://image.gif",
                    type: "image/gif",
                },
            ]);
            expect(meta.attributes).toEqual([
                {
                    "trait_type": "a1",
                    value: "1",
                },
                {
                    "trait_type": "a2",
                    value: "2",
                },
            ]);
            return [2 /*return*/];
        });
    }); });
});
