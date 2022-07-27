"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFlowWallet = void 0;
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var flow_test_common_1 = require("@rarible/flow-test-common");
function initFlowWallet(accountAddress, privateKey) {
    var flowAuth = (0, flow_test_common_1.createFlowAuth)(fcl, "testnet", accountAddress, privateKey);
    return new sdk_wallet_1.FlowWallet(fcl, flowAuth);
}
exports.initFlowWallet = initFlowWallet;
