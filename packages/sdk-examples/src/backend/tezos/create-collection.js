"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var api_client_1 = require("@rarible/api-client");
var build_1 = require("@rarible/sdk/build");
var common_1 = require("../common");
(0, common_1.updateNodeGlobalVars)();
function createCollection() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var wallet, sdk, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = new sdk_wallet_1.TezosWallet((0, in_memory_provider_1.in_memory_provider)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
                        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", "https://rpc.tzkt.io/ithacanet"));
                    sdk = (0, build_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.nft.createCollection({
                            blockchain: api_client_1.Blockchain.TEZOS,
                            asset: {
                                assetType: "NFT",
                                arguments: {
                                    name: "My NFT collection",
                                    symbol: "MYNFT",
                                    contractURI: "https://ipfs.io/ipfs/QmTKxwnqqxTxH4HE3UVM9yoJFZgbsZ8CuqqRFZCSWBF53m",
                                    isUserToken: false,
                                },
                            },
                        })];
                case 1:
                    result = _a.sent();
                    console.log("address of new collection", result.address);
                    return [4 /*yield*/, result.tx.wait()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
createCollection();
