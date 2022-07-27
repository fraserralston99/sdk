"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var send_transaction_1 = require("@rarible/protocol-ethereum-sdk/build/common/send-transaction");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var domain_2 = require("../../types/nft/mint/domain");
var domain_3 = require("../../types/order/fill/domain");
var retry_1 = require("../../common/retry");
var init_providers_1 = require("./test/init-providers");
var await_stock_1 = require("./test/await-stock");
var await_item_1 = require("./test/await-item");
var common_1 = require("./common");
describe("Create & fill orders with order data v3", function () {
    var _a, _b;
    var _c = (0, init_providers_1.initProviders)(), web31 = _c.web31, web32 = _c.web32, wallet1 = _c.wallet1, wallet2 = _c.wallet2;
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var ethereum2 = new web3_ethereum_1.Web3Ethereum({ web3: web32 });
    var sdk1 = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum1), "development", {
        logs: domain_1.LogsLevel.DISABLED,
        blockchain: (_a = {},
            _a[api_client_1.BlockchainGroup.ETHEREUM] = {
                marketplaceMarker: "0x000000000000000000000000000000000000000000000000000000000000face",
                useDataV3: true,
            },
            _a),
    });
    var sdk2 = (0, index_1.createRaribleSdk)(new sdk_wallet_1.EthereumWallet(ethereum2), "development", {
        logs: domain_1.LogsLevel.DISABLED,
        blockchain: (_b = {},
            _b[api_client_1.BlockchainGroup.ETHEREUM] = {
                marketplaceMarker: "0x000000000000000000000000000000000000000000000000000000000000dead",
                useDataV3: true,
            },
            _b),
    });
    var it = (0, ethereum_sdk_test_common_1.awaitAll)({
        testErc20: (0, ethereum_sdk_test_common_1.deployTestErc20)(web31, "Test1", "TST1"),
    });
    var erc721Address = (0, types_1.toAddress)("0x64F088254d7EDE5dd6208639aaBf3614C80D396d");
    function mint() {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wallet1Address, action, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wallet1Address = wallet1.getAddressString();
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
                    case 4: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, result.itemId];
                }
            });
        });
    }
    test("erc721 sell/buy", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var wallet1Address, itemId, sellAction, orderId, nextStock, updateAction, fillAction, tx, nextStock2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet1Address = wallet1.getAddressString();
                    return [4 /*yield*/, (0, send_transaction_1.sentTxConfirm)(it.testErc20.methods.mint(wallet2.getAddressString(), "100000000000000000"), {
                            from: wallet1Address,
                            gas: 500000,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mint()];
                case 2:
                    itemId = _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: itemId })];
                case 3:
                    sellAction = _a.sent();
                    expect(sellAction.maxFeesBasePointSupport).toEqual(domain_3.MaxFeesBasePointSupport.REQUIRED);
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.004",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM),
                            },
                            originFees: [{
                                    account: (0, types_1.toUnionAddress)("ETHEREUM:" + wallet1Address),
                                    value: 10,
                                }],
                            maxFeesBasePoint: 500,
                        })];
                case 4:
                    orderId = _a.sent();
                    console.log("orderid > ", orderId);
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sellUpdate({ orderId: orderId })];
                case 6:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.003" })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, sdk1.apis.order.getOrderById({ id: orderId })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.buy({ orderId: orderId })];
                case 9:
                    fillAction = _a.sent();
                    expect(fillAction.maxFeesBasePointSupport).toEqual(domain_3.MaxFeesBasePointSupport.IGNORED);
                    return [4 /*yield*/, fillAction.submit({ amount: 1 })];
                case 10:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 11:
                    _a.sent();
                    nextStock2 = "0";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock2)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(15, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk1.apis.order.getOrderById({ id: orderId })];
                                    case 1:
                                        order = _a.sent();
                                        expect(order.status).toEqual("FILLED");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("erc721 bid/acceptBid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, bidAction, orderId, updateAction, fillAction, tx, nextStock2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, send_transaction_1.sentTxConfirm)(it.testErc20.methods.mint(wallet2.getAddressString(), "100000000000000000"), {
                        from: wallet1.getAddressString(),
                        gas: 500000,
                    })
                    // console.log("balance",
                    // 	(await sdk2.balances.getBalance(toUnionAddress("ETHEREUM:" + wallet2.getAddressString()), {
                    // 		"@type": "ERC20",
                    // 		contract: convertEthereumContractAddress(it.testErc20.options.address, Blockchain.ETHEREUM),
                    // 	})).toString()
                    // )
                ];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mint()];
                case 2:
                    itemId = _a.sent();
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 3:
                    bidAction = _a.sent();
                    expect(bidAction.maxFeesBasePointSupport).toEqual(domain_3.MaxFeesBasePointSupport.IGNORED);
                    return [4 /*yield*/, bidAction.submit({
                            amount: 1,
                            price: "0.0002",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM),
                            },
                        })];
                case 4:
                    orderId = _a.sent();
                    console.log("orderid > ", orderId);
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, 0.0002)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bidUpdate({ orderId: orderId })];
                case 6:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.0003" })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, sdk1.apis.order.getOrderById({ id: orderId })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({ orderId: orderId })];
                case 9:
                    fillAction = _a.sent();
                    expect(fillAction.maxFeesBasePointSupport).toEqual(domain_3.MaxFeesBasePointSupport.REQUIRED);
                    return [4 /*yield*/, fillAction.submit({ amount: 1, maxFeesBasePoint: 500 })];
                case 10:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 11:
                    _a.sent();
                    nextStock2 = "0";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock2)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(15, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk1.apis.order.getOrderById({ id: orderId })];
                                    case 1:
                                        order = _a.sent();
                                        expect(order.status).toEqual("FILLED");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
