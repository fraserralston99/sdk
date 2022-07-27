"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var networks = ["mainnet", "testnet", "emulator"];
describe.each(networks)("get flow tx link in %s network", function (network) {
    test("get tx link", function () {
        var tx = new _1.BlockchainFlowTransaction({
            txId: "1721f23ffbca59e5a48e330cdafa0e5c7f709141ee796d47fdf37a85d630a69c",
        }, network);
        tx.getTxLink();
    });
});
