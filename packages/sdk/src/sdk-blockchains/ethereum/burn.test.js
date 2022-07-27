"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var domain_2 = require("../../types/nft/mint/domain");
var init_providers_1 = require("./test/init-providers");
var await_item_1 = require("./test/await-item");
var await_item_supply_1 = require("./test/await-item-supply");
var common_1 = require("./common");
var await_deleted_item_1 = require("./test/await-deleted-item");
describe.skip("burn", function () {
    var _a = (0, init_providers_1.initProviders)(), web31 = _a.web31, wallet1 = _a.wallet1;
    var ethereum = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var wallet = new sdk_wallet_1.EthereumWallet(ethereum);
    var sdk = (0, index_1.createRaribleSdk)(wallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    var contractErc721 = (0, types_1.toAddress)("0x4Ab7B255Df8B212678582F7271BE99f3dECe1eAE");
    var contractErc1155 = (0, types_1.toAddress)("0xFe3d1f0003B17eA0C8D29164F0511508f1425b3a");
    var e2eErc721V3ContractAddress = (0, types_1.toAddress)("0x4Ab7B255Df8B212678582F7271BE99f3dECe1eAE");
    var e2eErc1155V2ContractAddress = (0, types_1.toAddress)("0xFe3d1f0003B17eA0C8D29164F0511508f1425b3a");
    test("burn erc721", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, collection, mintAction, mintResult, burn, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:".concat(senderRaw));
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({ collection: "ETHEREUM:".concat(contractErc721) })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({ collection: collection })];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk, mintResult.itemId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.burn({ itemId: mintResult.itemId })];
                case 7:
                    burn = _a.sent();
                    return [4 /*yield*/, burn.submit()];
                case 8:
                    tx = _a.sent();
                    if (!tx) return [3 /*break*/, 10];
                    return [4 /*yield*/, tx.wait()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("0"))];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("burn erc1155", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, collection, mintAction, mintResult, burn, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:".concat(senderRaw));
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                            collection: "ETHEREUM:".concat(contractErc1155),
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({ collection: collection })];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 10,
                        })];
                case 3:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("10"))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.burn({
                            itemId: mintResult.itemId,
                        })];
                case 7:
                    burn = _a.sent();
                    return [4 /*yield*/, burn.submit({ amount: 5 })];
                case 8:
                    tx = _a.sent();
                    if (!tx) return [3 /*break*/, 10];
                    return [4 /*yield*/, tx.wait()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("5"))];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("burn erc-721 lazy item", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, collection, mintAction, mintResult, burn;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:".concat(senderRaw));
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                            collection: (0, common_1.convertEthereumContractAddress)(e2eErc721V3ContractAddress, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({ collection: collection })];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: true,
                            supply: 1,
                        })];
                case 3:
                    mintResult = _a.sent();
                    return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("1"))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.burn({ itemId: mintResult.itemId })];
                case 5:
                    burn = _a.sent();
                    return [4 /*yield*/, burn.submit({
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, await_deleted_item_1.awaitDeletedItem)(sdk, mintResult.itemId)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("burn erc1155 lazy item", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, collection, mintAction, mintResult, burn;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:".concat(senderRaw));
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                            collection: (0, common_1.convertEthereumContractAddress)(e2eErc1155V2ContractAddress, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({ collection: collection })];
                case 2:
                    mintAction = _a.sent();
                    return [4 /*yield*/, mintAction.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: true,
                            supply: 10,
                        })];
                case 3:
                    mintResult = _a.sent();
                    return [4 /*yield*/, (0, await_item_supply_1.awaitItemSupply)(sdk, mintResult.itemId, (0, types_1.toBigNumber)("10"))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, sdk.nft.burn({
                            itemId: mintResult.itemId,
                        })];
                case 5:
                    burn = _a.sent();
                    return [4 /*yield*/, burn.submit({
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, await_deleted_item_1.awaitDeletedItem)(sdk, mintResult.itemId)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
