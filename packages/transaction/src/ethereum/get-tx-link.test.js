"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@rarible/types");
var _1 = require("./");
var networks = ["mainnet", "mumbai", "ropsten", "rinkeby", "testnet"];
describe.each(networks)("get ethereum tx link in %s network", function (network) {
    test("get tx link", function () {
        var tx = new _1.BlockchainEthereumTransaction({
            hash: (0, types_1.toWord)("0x62b32a0793ab08515c3cdc159430f1ddc62b906b3db809a824571844ba5d459f"),
            from: (0, types_1.toAddress)("0xccfceecf8451d8cfd1edd0b859c4301f60d3e948"),
            data: "",
            nonce: 0,
            wait: function () { return Promise.resolve(null); },
        }, network);
        tx.getTxLink();
    });
});
