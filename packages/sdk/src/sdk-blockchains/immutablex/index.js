"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImmutablexSdkBlank = void 0;
var not_implemented_1 = require("../../common/not-implemented");
function createImmutablexSdkBlank() {
    return {
        nft: {
            mint: not_implemented_1.notImplemented,
            burn: not_implemented_1.notImplemented,
            transfer: not_implemented_1.notImplemented,
            generateTokenId: not_implemented_1.notImplemented,
            deploy: not_implemented_1.nonImplementedAction,
            createCollection: not_implemented_1.nonImplementedAction,
            preprocessMeta: not_implemented_1.notImplemented,
            uploadMeta: not_implemented_1.notImplemented,
        },
        order: {
            fill: not_implemented_1.notImplemented,
            buy: not_implemented_1.notImplemented,
            acceptBid: not_implemented_1.notImplemented,
            sell: not_implemented_1.notImplemented,
            sellUpdate: not_implemented_1.notImplemented,
            bid: not_implemented_1.notImplemented,
            bidUpdate: not_implemented_1.notImplemented,
            cancel: not_implemented_1.nonImplementedAction,
        },
        balances: {
            getBalance: not_implemented_1.notImplemented,
            convert: not_implemented_1.notImplemented,
            getBiddingBalance: not_implemented_1.nonImplementedAction,
            depositBiddingBalance: not_implemented_1.nonImplementedAction,
            withdrawBiddingBalance: not_implemented_1.nonImplementedAction,
        },
        restriction: {
            canTransfer: not_implemented_1.notImplemented,
        },
    };
}
exports.createImmutablexSdkBlank = createImmutablexSdkBlank;
