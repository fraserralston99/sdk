"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var networks = ["mainnet", "testnet"];
describe.each(networks)("get flow tx link in %s network", function (network) {
    test("get tx link", function () {
        var tx = new index_1.BlockchainTezosTransaction({
            hash: "ooCzZbUZGqUhXkiQ378MxWv8jvee3MJofnK2DigTc2azkBtoGif",
        }, network);
        tx.getTxLink();
    });
});
