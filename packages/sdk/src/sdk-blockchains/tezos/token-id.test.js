"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var test_wallet_1 = require("./test/test-wallet");
describe.skip("test getting token id", function () {
    var env = "staging";
    var wallet = (0, test_wallet_1.createTestWallet)("edsk3UUamwmemNBJgDvS8jXCgKsvjL2NoTwYRFpGSRPut4Hmfs6dG8", env);
    var sdk = (0, index_1.createRaribleSdk)(wallet, env, { logs: domain_1.LogsLevel.DISABLED });
    var nftContract = "KT1EreNsT2gXRvuTUrpx6Ju4WMug5xcEpr43";
    test.skip("get tezos token id", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var tokenId;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.nft.generateTokenId({
                        collection: (0, types_1.toContractAddress)("TEZOS:".concat(nftContract)),
                        minter: (0, types_1.toUnionAddress)("TEZOS:"),
                    })];
                case 1:
                    tokenId = _a.sent();
                    if (tokenId) {
                        expect(tokenId.tokenId).toBe("2");
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
