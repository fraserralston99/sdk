"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var wallet_test_1 = require("@rarible/solana-wallet/src/tests/wallet.test");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var web3_1 = tslib_1.__importDefault(require("web3"));
var index_1 = require("./index");
describe("test signPersonalMessage", function () {
    var provider = (0, ethereum_sdk_test_common_1.createE2eProvider)("d519f025ae44644867ee8384890c4a0b8a7b00ef844e8d64c566c0ac971c9469").provider;
    test("ethereum signPersonalMessage", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var web3, ethereum, wallet, msg;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new web3_1.default(provider);
                    ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
                    wallet = new index_1.EthereumWallet(ethereum);
                    return [4 /*yield*/, wallet.signPersonalMessage("Dude, Where Is My Beer?")];
                case 1:
                    msg = _a.sent();
                    expect(msg.signature).toBe("0x9fa1bffacceceb1cfb8123fd997f121c939a377e73ed2c64bdf0af4a03b" +
                        "a1e91543f3cfda796caa7244d71154c84d87d19cdc469089de6980f0978eca5e3fae21c");
                    expect(msg.publicKey).toBe("0xC5eAC3488524D577a1495492599E8013B1F91efa");
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("flow signPersonalMessage", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = new index_1.FlowWallet(fcl);
                    return [4 /*yield*/, wallet.signPersonalMessage("Dude, Where Is My Beer?")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("tezos signPersonalMessage", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var provider, wallet;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = (0, in_memory_provider_1.in_memory_provider)("edsk3UUamwmemNBJgDvS8jXCgKsvjL2NoTwYRFpGSRPut4Hmfs6dG8", "https://hangzhou.tz.functori.com");
                    wallet = new index_1.TezosWallet(provider);
                    return [4 /*yield*/, wallet.signPersonalMessage("Dude, Where Is My Beer?")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("solana signPersonalMessage", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wallet = new index_1.SolanaWallet((0, wallet_test_1.getSolanaTestWallet)());
                    _b = (_a = console).log;
                    return [4 /*yield*/, wallet.signPersonalMessage("Hello")];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
