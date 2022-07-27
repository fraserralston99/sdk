"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var flow_sdk_1 = require("@rarible/flow-sdk");
var types_1 = require("@rarible/types");
var apis_1 = require("../../common/apis");
var create_test_flow_auth_1 = require("./test/create-test-flow-auth");
var create_test_item_1 = require("./test/create-test-item");
var mint_1 = require("./mint");
var bid_1 = require("./bid");
var cancel_1 = require("./cancel");
var await_order_1 = require("./test/await-order");
var buy_1 = require("./buy");
var create_test_bid_1 = require("./test/create-test-bid");
describe("Flow bid", function () {
    var authUser1 = (0, create_test_flow_auth_1.createTestFlowAuth)(fcl).authUser1;
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet.fcl, "testnet", {}, authUser1);
    var apis = (0, apis_1.createApisSdk)("testnet");
    var mint = new mint_1.FlowMint(sdk, apis, "testnet");
    var bid = new bid_1.FlowBid(sdk);
    var cancel = new cancel_1.FlowCancel(sdk, apis, "testnet");
    var acceptBid = new buy_1.FlowBuy(sdk, apis, "testnet");
    test.skip("Should place a bid on flow NFT item, update bid and cancel bid ", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, order, prepare, updatedBidId, updatedOrder, cancelledOrder;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, create_test_bid_1.createTestBid)(bid, itemId)];
                case 2:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_order_1.awaitFlowOrder)(sdk, orderId.split(":")[1])];
                case 3:
                    order = _a.sent();
                    expect(order.take.value.toString()).toEqual("1");
                    return [4 /*yield*/, bid.update({ orderId: orderId })];
                case 4:
                    prepare = _a.sent();
                    return [4 /*yield*/, prepare.submit({
                            price: (0, types_1.toBigNumber)("0.2"),
                        })];
                case 5:
                    updatedBidId = _a.sent();
                    return [4 /*yield*/, (0, await_order_1.awaitFlowOrder)(sdk, updatedBidId.split(":")[1])];
                case 6:
                    updatedOrder = _a.sent();
                    expect(updatedOrder.make.value.toString()).toEqual("0.2");
                    return [4 /*yield*/, cancel.cancel({ orderId: updatedBidId })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, await_order_1.awaitFlowOrder)(sdk, updatedBidId.split(":")[1])];
                case 8:
                    cancelledOrder = _a.sent();
                    expect(cancelledOrder.status).toEqual("CANCELLED");
                    return [2 /*return*/];
            }
        });
    }); }, 1000000);
    test.skip("Should place a bid on flow NFT item with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, order, takeAssetType;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, create_test_bid_1.createTestBidWithCurrencyId)(bid, itemId)];
                case 2:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_order_1.awaitFlowOrder)(sdk, orderId.split(":")[1])];
                case 3:
                    order = _a.sent();
                    takeAssetType = order.make;
                    expect(takeAssetType["@type"]).toEqual("fungible");
                    expect(takeAssetType.contract).toEqual("A.ebf4ae01d1284af8.RaribleNFT");
                    return [2 /*return*/];
            }
        });
    }); }, 1000000);
    test.skip("Should place a bid on flow NFT item and accept bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, order, prepare, acceptedOrderTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, create_test_bid_1.createTestBid)(bid, itemId)];
                case 2:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_order_1.awaitFlowOrder)(sdk, orderId.split(":")[1])];
                case 3:
                    order = _a.sent();
                    expect(order.take.value.toString()).toEqual("1");
                    return [4 /*yield*/, acceptBid.buy({ orderId: orderId })];
                case 4:
                    prepare = _a.sent();
                    return [4 /*yield*/, prepare.submit({ amount: 1 })];
                case 5:
                    acceptedOrderTx = _a.sent();
                    expect(acceptedOrderTx).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); }, 1000000);
});
