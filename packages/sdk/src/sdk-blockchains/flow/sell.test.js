"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var flow_sdk_1 = require("@rarible/flow-sdk");
var types_1 = require("@rarible/types");
var retry_1 = require("../../common/retry");
var apis_1 = require("../../common/apis");
var create_test_flow_auth_1 = require("./test/create-test-flow-auth");
var create_test_item_1 = require("./test/create-test-item");
var mint_1 = require("./mint");
var sell_item_1 = require("./test/sell-item");
var sell_1 = require("./sell");
describe("Flow sell", function () {
    var authUser1 = (0, create_test_flow_auth_1.createTestFlowAuth)(fcl).authUser1;
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet.fcl, "testnet", {}, authUser1);
    var apis = (0, apis_1.createApisSdk)("testnet");
    var mint = new mint_1.FlowMint(sdk, apis, "testnet");
    var sell = new sell_1.FlowSell(sdk, apis);
    test.skip("Should sell flow NFT item and update order", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, order, prepare, updatedOrderId, updatedOrder;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, sell_item_1.sellItem)(sell, itemId, "0.1")];
                case 2:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.order.getOrderById({ id: orderId }); })];
                case 3:
                    order = _a.sent();
                    expect(order.take.value.toString()).toEqual("0.1");
                    return [4 /*yield*/, sell.update({ orderId: orderId })];
                case 4:
                    prepare = _a.sent();
                    return [4 /*yield*/, prepare.submit({
                            price: (0, types_1.toBigNumber)("0.2"),
                        })];
                case 5:
                    updatedOrderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var order;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, apis.order.getOrderById({ id: updatedOrderId })];
                                    case 1:
                                        order = _a.sent();
                                        if (order.take.value.toString() !== "0.2") {
                                            throw new Error("Order is not updated yet");
                                        }
                                        return [2 /*return*/, order];
                                }
                            });
                        }); })];
                case 6:
                    updatedOrder = _a.sent();
                    expect(updatedOrder.take.value.toString()).toEqual("0.2");
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("Should sell flow NFT item with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, order, takeAssetType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, sell_item_1.sellItemWithCurrencyId)(sell, itemId, "0.1")];
                case 2:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.order.getOrderById({ id: orderId }); })];
                case 3:
                    order = _a.sent();
                    takeAssetType = order.take.type;
                    expect(takeAssetType["@type"]).toEqual("FLOW_FT");
                    expect(takeAssetType.contract).toEqual("FLOW:A.7e60df042a9c0868.FlowToken");
                    expect(order.take.value.toString()).toEqual("0.1");
                    return [2 /*return*/];
            }
        });
    }); });
});
