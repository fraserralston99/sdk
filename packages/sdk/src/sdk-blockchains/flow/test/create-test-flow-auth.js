"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestFlowAuth = void 0;
var flow_test_common_1 = require("@rarible/flow-test-common");
function createTestFlowAuth(fcl) {
    return {
        authUser1: (0, flow_test_common_1.createTestAuth)(fcl, "testnet", flow_test_common_1.FLOW_TESTNET_ACCOUNT_1.address, flow_test_common_1.FLOW_TESTNET_ACCOUNT_1.privKey),
        authUser2: (0, flow_test_common_1.createTestAuth)(fcl, "testnet", flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.address, flow_test_common_1.FLOW_TESTNET_ACCOUNT_2.privKey),
    };
}
exports.createTestFlowAuth = createTestFlowAuth;
