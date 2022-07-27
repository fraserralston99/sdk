"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var types_1 = require("@rarible/types");
var index_1 = require("../../index");
var domain_1 = require("../../domain");
var init_providers_1 = require("./test/init-providers");
var await_stock_1 = require("./test/await-stock");
var await_item_1 = require("./test/await-item");
var await_order_cancel_1 = require("./test/await-order-cancel");
describe.skip("cancel", function () {
    var _a = (0, init_providers_1.initProviders)(), web31 = _a.web31, wallet1 = _a.wallet1;
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var ethereumWallet = new sdk_wallet_1.EthereumWallet(ethereum1);
    var sdk1 = (0, index_1.createRaribleSdk)(ethereumWallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    var conf = (0, ethereum_sdk_test_common_1.awaitAll)({
        testErc20: (0, ethereum_sdk_test_common_1.deployTestErc20)(web31, "Test1", "TST1"),
        testErc721: (0, ethereum_sdk_test_common_1.deployTestErc721)(web31, "Test2", "TST2"),
    });
    test("sell and cancel", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, itemId, sellAction, orderId, nextStock, order, tx, cancelledOrder;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    return [4 /*yield*/, conf.testErc721.methods.mint(senderRaw, 1, "").send({
                            from: senderRaw,
                            gas: 200000,
                        })];
                case 1:
                    _a.sent();
                    itemId = (0, types_1.toItemId)("ETHEREUM:".concat(conf.testErc721.options.address, ":1"));
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, itemId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.sell({ itemId: itemId })];
                case 3:
                    sellAction = _a.sent();
                    return [4 /*yield*/, sellAction.submit({
                            amount: 1,
                            price: "0.000000000000000002",
                            currency: {
                                "@type": "ERC20",
                                contract: (0, types_1.toContractAddress)("ETHEREUM:".concat(conf.testErc20.options.address)),
                            },
                        })];
                case 4:
                    orderId = _a.sent();
                    nextStock = "1";
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, nextStock)];
                case 5:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(nextStock);
                    return [4 /*yield*/, sdk1.order.cancel.start({ orderId: orderId }).runAll()];
                case 6:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, await_order_cancel_1.awaitOrderCancel)(sdk1, orderId)];
                case 8:
                    cancelledOrder = _a.sent();
                    expect(cancelledOrder.cancelled).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
