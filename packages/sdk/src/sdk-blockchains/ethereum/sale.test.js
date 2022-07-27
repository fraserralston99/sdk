"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var send_transaction_1 = require("@rarible/protocol-ethereum-sdk/build/common/send-transaction");
var types_1 = require("@rarible/types");
var web3_1 = tslib_1.__importDefault(require("web3"));
var api_client_1 = require("@rarible/api-client");
var id_1 = require("@rarible/protocol-ethereum-sdk/build/common/id");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var domain_2 = require("../../types/nft/mint/domain");
var await_for_ownership_1 = require("../tezos/test/await-for-ownership");
var init_providers_1 = require("./test/init-providers");
var await_stock_1 = require("./test/await-stock");
var await_item_1 = require("./test/await-item");
var common_1 = require("./common");
describe.skip("sale", function () {
    var _a = (0, init_providers_1.initProviders)(), web31 = _a.web31, web32 = _a.web32, wallet1 = _a.wallet1, wallet2 = _a.wallet2;
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var ethereum2 = new web3_ethereum_1.Web3Ethereum({ web3: web32 });
    var sdk1 = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum1), "development", { logs: domain_1.LogsLevel.DISABLED });
    var sdk2 = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum2), "development", { logs: domain_1.LogsLevel.DISABLED });
    var erc721Address = (0, types_1.toAddress)("0x64F088254d7EDE5dd6208639aaBf3614C80D396d");
    var conf = (0, ethereum_sdk_test_common_1.awaitAll)({
        testErc20: (0, ethereum_sdk_test_common_1.deployTestErc20)(web31, "Test1", "TST1"),
    });
    test.skip("erc721 sell/buy using erc-20", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet1Address, wallet2Address, action, result, sellAction, orderId, nextStock, order, updateAction, fillAction, tx, nextStock2, order2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet1Address = wallet1.getAddressString();
                    wallet2Address = wallet2.getAddressString();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(conf.testErc20.methods.mint(wallet2Address, "1000000000"), { from: wallet1Address, gas: 200000 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sdk1.nft.mint({
                            collectionId: (0, common_1.convertEthereumCollectionId)(erc721Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 2:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(wallet1Address, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    result = _a.sent();
                    if (!(result.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, result.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: result.itemId })];
                case 7:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000000000000000002",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, types_1.toContractAddress)("ETHEREUM:".concat(conf.testErc20.options.address)),
                            },
                            expirationDate: new Date(Date.now() + 200000),
                        })];
                case 8:
                    orderId = _a.sent();
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 9:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(nextStock);
                    return [4 /*yield*/, sdk1.order.sellUpdate({ orderId: orderId })];
                case 10:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.000000000000000001" })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, sdk1.apis.order.getOrderById({ id: orderId })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.buy({ orderId: orderId })];
                case 13:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 14:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 15:
                    _a.sent();
                    nextStock2 = "0";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock2)];
                case 16:
                    order2 = _a.sent();
                    expect(order2.makeStock.toString()).toEqual(nextStock2);
                    return [2 /*return*/];
            }
        });
    }); });
    test("erc721 sell/buy using erc-20 with order object", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet1Address, wallet2Address, action, result, sellAction, orderId, nextStock, order, fillAction, tx, nextStock2, order2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet1Address = wallet1.getAddressString();
                    wallet2Address = wallet2.getAddressString();
                    return [4 /*yield*/, sdk1.nft.mint({
                            collectionId: (0, common_1.convertEthereumCollectionId)(erc721Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 1:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(wallet1Address, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 2:
                    result = _a.sent();
                    if (!(result.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 4];
                    return [4 /*yield*/, result.transaction.wait()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, (0, send_transaction_1.sentTx)(conf.testErc20.methods.mint(wallet2Address, 100), { from: wallet1Address, gas: 200000 })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: result.itemId })];
                case 7:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000000000000000002",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, types_1.toContractAddress)("ETHEREUM:".concat(conf.testErc20.options.address)),
                            },
                        })];
                case 8:
                    orderId = _a.sent();
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 9:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(nextStock);
                    return [4 /*yield*/, sdk2.order.buy({ order: order })];
                case 10:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 11:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 12:
                    _a.sent();
                    nextStock2 = "0";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock2)];
                case 13:
                    order2 = _a.sent();
                    expect(order2.makeStock.toString()).toEqual(nextStock2);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("erc721 sell/buy using erc-20 throw error with outdated expiration date", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet1Address, wallet2Address, action, result, sellAction, orderId, nextStock, order, fillAction, errorMessage, tx, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet1Address = wallet1.getAddressString();
                    wallet2Address = wallet2.getAddressString();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(conf.testErc20.methods.mint(wallet2Address, 100), { from: wallet1Address, gas: 200000 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sdk1.nft.mint({
                            collectionId: (0, common_1.convertEthereumCollectionId)(erc721Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 2:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(wallet1Address, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    result = _a.sent();
                    if (!(result.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, result.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: result.itemId })];
                case 7:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000000000000000002",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, types_1.toContractAddress)("ETHEREUM:".concat(conf.testErc20.options.address)),
                            },
                            expirationDate: new Date(),
                        })];
                case 8:
                    orderId = _a.sent();
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 9:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(nextStock);
                    return [4 /*yield*/, sdk2.order.buy({ orderId: orderId })];
                case 10:
                    fillAction = _a.sent();
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 14, , 15]);
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 12:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 14:
                    e_1 = _a.sent();
                    errorMessage = e_1.message;
                    return [3 /*break*/, 15];
                case 15:
                    expect(errorMessage).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("erc721 sell/buy using erc-20 with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet1Address, wallet2Address, action, result, sellAction, orderId, nextStock, order, fillAction, tx, nextStock2, order2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet1Address = wallet1.getAddressString();
                    wallet2Address = wallet2.getAddressString();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(conf.testErc20.methods.mint(wallet2Address, 100), { from: wallet1Address, gas: 200000 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sdk1.nft.mint({
                            collectionId: (0, common_1.convertEthereumCollectionId)(erc721Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 2:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(wallet1Address, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 3:
                    result = _a.sent();
                    if (!(result.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, result.transaction.wait()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: result.itemId })];
                case 7:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000000000000000002",
                            currency: (0, types_1.toCurrencyId)("ETHEREUM:".concat(conf.testErc20.options.address)),
                        })];
                case 8:
                    orderId = _a.sent();
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 9:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(nextStock);
                    return [4 /*yield*/, sdk2.order.buy({ order: order })];
                case 10:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 11:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 12:
                    _a.sent();
                    nextStock2 = "0";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock2)];
                case 13:
                    order2 = _a.sent();
                    expect(order2.makeStock.toString()).toEqual(nextStock2);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe.skip("buy item with opensea order", function () {
    var _a, _b;
    var provider = (0, ethereum_sdk_test_common_1.createE2eProvider)("0x00120de4b1518cf1f16dc1b02f6b4a8ac29e870174cb1d8575f578480930250a", {
        rpcUrl: "https://node-rinkeby.rarible.com",
        networkId: 4,
    }).provider;
    var web3 = new web3_1.default(provider);
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
    var meta = (0, types_1.toWord)((0, id_1.id32)("CUSTOM_META"));
    var sdk1 = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum1), "testnet", {
        logs: domain_1.LogsLevel.DISABLED,
        blockchain: (_a = {},
            _a[api_client_1.BlockchainGroup.ETHEREUM] = (_b = {},
                _b[api_client_1.Blockchain.ETHEREUM] = {
                    openseaOrdersMetadata: meta,
                },
                _b),
            _a),
    });
    test("buy opensea item with specifying origin", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var orderId, fillAction, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = (0, types_1.toOrderId)("ETHEREUM:0x298fab77f8c8af0f4adf014570287689f7b9228307eaaf657a7446bc8eab0bc1");
                    return [4 /*yield*/, sdk1.order.buy({ orderId: orderId })];
                case 1:
                    fillAction = _a.sent();
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("buy item with seaport", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var orderId, itemId, fillAction, tx, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    orderId = (0, types_1.toOrderId)("ETHEREUM:0xefc670c6a0a5659c623a6c7163f715317cbf44139119d9ebe2d636a0f1754776");
                    itemId = (0, types_1.toItemId)("ETHEREUM:0x1af7a7555263f275433c6bb0b8fdcd231f89b1d7:15754214302034704911334786657881932847148102202883437712117637319024858628148");
                    return [4 /*yield*/, sdk1.order.buy({ orderId: orderId })];
                case 1:
                    fillAction = _c.sent();
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 2:
                    tx = _c.sent();
                    return [4 /*yield*/, tx.wait()];
                case 3:
                    _c.sent();
                    _a = await_for_ownership_1.awaitForOwnership;
                    _b = [sdk1, itemId];
                    return [4 /*yield*/, ethereum1.getFrom()];
                case 4: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 5:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
