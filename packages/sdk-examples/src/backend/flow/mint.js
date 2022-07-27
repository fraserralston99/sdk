"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_1 = require("@rarible/sdk");
var types_1 = require("@rarible/types");
var domain_1 = require("@rarible/sdk/build/types/nft/mint/domain");
var common_1 = require("../common");
var common_2 = require("./common");
(0, common_1.updateNodeGlobalVars)();
function mint() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var raribleSdkWallet, raribleSdk, mintAction, response, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!process.env["FLOW_PRIVATE_KEY"] || !process.env["FLOW_ACCOUNT_ADDRESS"]) {
                        throw new Error("Provide FLOW_PRIVATE_KEY and FLOW_ACCOUNT_ADDRESS as environment variables");
                    }
                    return [4 /*yield*/, (0, common_2.initFlowWallet)(process.env["FLOW_ACCOUNT_ADDRESS"], process.env["FLOW_PRIVATE_KEY"])];
                case 1:
                    raribleSdkWallet = _a.sent();
                    raribleSdk = (0, sdk_1.createRaribleSdk)(raribleSdkWallet, "staging");
                    return [4 /*yield*/, raribleSdk.nft.mint({
                            collectionId: (0, types_1.toCollectionId)("FLOW:A.ebf4ae01d1284af8.RaribleNFT"),
                        })];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    response = _a.sent();
                    if (!(response.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, response.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log("minted response", response);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log("Error", e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
mint();
