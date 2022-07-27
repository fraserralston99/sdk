"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintOnChainWithTokenId = void 0;
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
var domain_1 = require("@rarible/sdk/build/types/nft/mint/domain");
function mintOnChainWithTokenId(wallet, contractAddress) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var sdk, collectionId, tokenId, mintAction, mintResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sdk = (0, sdk_1.createRaribleSdk)(wallet, "dev");
                    collectionId = (0, types_1.toContractAddress)(contractAddress);
                    return [4 /*yield*/, sdk.nft.generateTokenId({
                            collection: collectionId,
                            minter: (0, types_1.toUnionAddress)("<CREATOR_ADDRESS>"),
                        })];
                case 1:
                    tokenId = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({
                            collectionId: (0, types_1.toCollectionId)(collectionId),
                            tokenId: tokenId,
                        })
                        /*
                      You should upload json file with item metadata with the following format:
                      {
                        name: string
                        description: string | undefined
                        image: string | undefined
                        "animation_url": string | undefined
                        "external_url": string | undefined
                        attributes: TokenMetadataAttribute[]
                      }
                      and insert link to json file to "uri" field.
                      To format your json data use "sdk.nft.preprocessMeta()" method
                       */
                    ];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "<YOUR_LINK_TO_JSON>",
                            //optional
                            royalties: [{
                                    account: (0, types_1.toUnionAddress)("<ROYLATY_ADDRESS>"),
                                    value: 1000,
                                }],
                            //optional, by default creator=minter
                            creators: [{
                                    account: (0, types_1.toUnionAddress)("<CREATOR_ADDRESS>"),
                                    value: 10000,
                                }],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, mintResult.itemId];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.mintOnChainWithTokenId = mintOnChainWithTokenId;