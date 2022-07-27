"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
// eslint-disable-next-line camelcase
var in_memory_provider_1 = require("@rarible/tezos-sdk/dist/providers/in_memory/in_memory_provider");
var build_1 = require("@rarible/sdk/build");
var types_1 = require("@rarible/types");
var common_1 = require("../common");
(0, common_1.updateNodeGlobalVars)();
function acceptBid() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var wallet, sdk, bidAction, tx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = new sdk_wallet_1.TezosWallet((0, in_memory_provider_1.in_memory_provider)("edskRqrEPcFetuV7xDMMFXHLMPbsTawXZjH9yrEz4RBqH1" +
                        "D6H8CeZTTtjGA3ynjTqD8Sgmksi7p5g3u5KUEVqX2EWrRnq5Bymj", "https://dev-tezos-node.rarible.org"));
                    sdk = (0, build_1.createRaribleSdk)(wallet, "dev");
                    return [4 /*yield*/, sdk.order.acceptBid({
                            orderId: (0, types_1.toOrderId)("TEZOS:YOUR_ORDER_ID"),
                        })];
                case 1:
                    bidAction = _a.sent();
                    return [4 /*yield*/, bidAction.submit({
                            amount: 1,
                            infiniteApproval: true,
                        })];
                case 2:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 3:
                    _a.sent();
                    console.log("tx", tx);
                    return [2 /*return*/];
            }
        });
    });
}
acceptBid();
