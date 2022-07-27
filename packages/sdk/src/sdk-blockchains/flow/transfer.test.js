"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var flow_sdk_1 = require("@rarible/flow-sdk");
var flow_test_common_1 = require("@rarible/flow-test-common");
var apis_1 = require("../../common/apis");
var retry_1 = require("../../common/retry");
var create_test_flow_auth_1 = require("./test/create-test-flow-auth");
var create_test_item_1 = require("./test/create-test-item");
var mint_1 = require("./mint");
var transfer_1 = require("./transfer");
var converters_1 = require("./common/converters");
describe("Flow transfer", function () {
    var authUser1 = (0, create_test_flow_auth_1.createTestFlowAuth)(fcl).authUser1;
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet.fcl, "dev", {}, authUser1);
    var apis = (0, apis_1.createApisSdk)("dev");
    var mint = new mint_1.FlowMint(sdk, apis, "testnet");
    var transfer = new transfer_1.FlowTransfer(sdk, "testnet");
    test.skip("Should transfer flow NFT item", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, prepare, to, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.item.getItemById({ itemId: itemId }); })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, transfer.transfer({ itemId: itemId })];
                case 3:
                    prepare = _a.sent();
                    to = (0, converters_1.convertFlowUnionAddress)(flow_test_common_1.FLOW_TESTNET_ACCOUNT_1.address);
                    return [4 /*yield*/, prepare.submit({ to: to })];
                case 4:
                    tx = _a.sent();
                    expect(tx.transaction.status).toEqual(4);
                    return [2 /*return*/];
            }
        });
    }); });
});
