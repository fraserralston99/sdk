"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var flow_sdk_1 = require("@rarible/flow-sdk");
var apis_1 = require("../../common/apis");
var retry_1 = require("../../common/retry");
var create_test_flow_auth_1 = require("./test/create-test-flow-auth");
var cancel_1 = require("./cancel");
var create_test_item_1 = require("./test/create-test-item");
var mint_1 = require("./mint");
var sell_item_1 = require("./test/sell-item");
var sell_1 = require("./sell");
describe("Flow cancel", function () {
    var authUser1 = (0, create_test_flow_auth_1.createTestFlowAuth)(fcl).authUser1;
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet.fcl, "testnet", {}, authUser1);
    var apis = (0, apis_1.createApisSdk)("testnet");
    var cancel = new cancel_1.FlowCancel(sdk, apis, "testnet");
    var mint = new mint_1.FlowMint(sdk, apis, "testnet");
    var sell = new sell_1.FlowSell(sdk, apis);
    test.skip("Should cancel flow NFT order", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, orderId, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.item.getItemById({ itemId: itemId }); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, sell_item_1.sellItem)(sell, itemId, "0.1")];
                case 3:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.order.getOrderById({ id: orderId }); })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, cancel.cancel({ orderId: orderId })];
                case 5:
                    tx = _a.sent();
                    expect(tx).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
