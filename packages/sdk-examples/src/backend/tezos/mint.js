"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var build_1 = require("@rarible/sdk/build");
var types_1 = require("@rarible/types");
var domain_1 = require("@rarible/sdk/build/types/nft/mint/domain");
var common_1 = require("../common");
(0, common_1.updateNodeGlobalVars)();
function mint() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var walletEdsk, provider, wallet, sdk, nftCollection, mintAction, mintResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    walletEdsk = "edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1D6" +
                        "H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj";
                    provider = (0, in_memory_provider_1.in_memory_provider)(walletEdsk, "https://rpc.tzkt.io/ithacanet");
                    wallet = new sdk_wallet_1.TezosWallet(provider);
                    sdk = (0, build_1.createRaribleSdk)(wallet, "dev");
                    nftCollection = (0, types_1.toCollectionId)("TEZOS:KT1EreNsT2gXRvuTUrpx6Ju4WMug5xcEpr43");
                    return [4 /*yield*/, sdk.nft.mint({
                            collectionId: nftCollection,
                        })];
                case 1:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 2:
                    mintResult = _a.sent();
                    console.log("mint", mintResult);
                    if (!(mintResult.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
mint();
