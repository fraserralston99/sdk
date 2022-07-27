"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var retry_1 = require("../../common/retry");
var domain_1 = require("../../domain");
var init_providers_1 = require("./test/init-providers");
var await_item_1 = require("./test/await-item");
describe.skip("transfer", function () {
    var _a = (0, init_providers_1.initProviders)(), web31 = _a.web31, wallet1 = _a.wallet1, wallet2 = _a.wallet2;
    var senderEthereum = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var senderWallet = new sdk_wallet_1.EthereumWallet(senderEthereum);
    var sdk = (0, index_1.createRaribleSdk)(senderWallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    var it = (0, ethereum_sdk_test_common_1.awaitAll)({
        testErc20: (0, ethereum_sdk_test_common_1.deployTestErc20)(web31, "Test1", "TST1"),
        testErc721: (0, ethereum_sdk_test_common_1.deployTestErc721)(web31, "Test2", "TST2"),
        testErc1155: (0, ethereum_sdk_test_common_1.deployTestErc1155)(web31, "Test3"),
    });
    test("transfer erc721", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, receipentRaw, receipent, tokenId, itemId, transfer, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    receipentRaw = wallet2.getAddressString();
                    receipent = (0, types_1.toUnionAddress)("ETHEREUM:".concat(receipentRaw));
                    tokenId = "1";
                    itemId = (0, types_1.toItemId)("ETHEREUM:".concat(it.testErc721.options.address, ":").concat(tokenId));
                    return [4 /*yield*/, it.testErc721.methods.mint(senderRaw, tokenId, "").send({
                            from: senderRaw,
                            gas: 500000,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk, itemId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.transfer({ itemId: itemId })];
                case 3:
                    transfer = _a.sent();
                    return [4 /*yield*/, transfer.submit({ to: receipent })];
                case 4:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var balanceRecipient;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, it.testErc721.methods.balanceOf(receipentRaw).call()];
                                    case 1:
                                        balanceRecipient = _a.sent();
                                        expect(balanceRecipient).toBe("1");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("transfer erc1155", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, receipentRaw, receipent, tokenId, itemId, transfer, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    receipentRaw = wallet2.getAddressString();
                    receipent = (0, types_1.toUnionAddress)("ETHEREUM:".concat(receipentRaw));
                    tokenId = "1";
                    itemId = (0, types_1.toItemId)("ETHEREUM:".concat(it.testErc1155.options.address, ":").concat(tokenId));
                    return [4 /*yield*/, it.testErc1155.methods.mint(senderRaw, tokenId, 100, "123").send({
                            from: senderRaw,
                            gas: 200000,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk, itemId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.transfer({ itemId: itemId })];
                case 3:
                    transfer = _a.sent();
                    return [4 /*yield*/, transfer.submit({ to: receipent, amount: 10 })];
                case 4:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var balanceRecipient;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, it.testErc1155.methods.balanceOf(receipentRaw, tokenId).call()];
                                    case 1:
                                        balanceRecipient = _a.sent();
                                        expect(balanceRecipient).toBe("10");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
