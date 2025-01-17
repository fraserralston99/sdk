"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFlowSdk = void 0;
var flow_sdk_1 = require("@rarible/flow-sdk");
var env_1 = require("@rarible/flow-sdk/build/config/env");
var api_client_1 = require("@rarible/api-client");
var not_implemented_1 = require("../../common/not-implemented");
var middleware_1 = require("../../common/middleware/middleware");
var upload_meta_1 = require("../union/meta/upload-meta");
var mint_1 = require("./mint");
var sell_1 = require("./sell");
var buy_1 = require("./buy");
var transfer_1 = require("./transfer");
var burn_1 = require("./burn");
var cancel_1 = require("./cancel");
var balance_1 = require("./balance");
var bid_1 = require("./bid");
function createFlowSdk(wallet, apis, network, params, auth) {
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet === null || wallet === void 0 ? void 0 : wallet.fcl, network, params, auth);
    var blockchainNetwork = env_1.ENV_CONFIG[network].network;
    var sellService = new sell_1.FlowSell(sdk, apis);
    var mintService = new mint_1.FlowMint(sdk, apis, blockchainNetwork);
    var bidService = new bid_1.FlowBid(sdk);
    var preprocessMeta = middleware_1.Middlewarer.skipMiddleware(mintService.preprocessMeta);
    var metaUploader = new upload_meta_1.MetaUploader(api_client_1.Blockchain.FLOW, preprocessMeta);
    return {
        nft: {
            mint: mintService.prepare,
            burn: new burn_1.FlowBurn(sdk, blockchainNetwork).burn,
            transfer: new transfer_1.FlowTransfer(sdk, blockchainNetwork).transfer,
            generateTokenId: function () { return Promise.resolve(undefined); },
            deploy: not_implemented_1.nonImplementedAction,
            createCollection: not_implemented_1.nonImplementedAction,
            preprocessMeta: preprocessMeta,
            uploadMeta: metaUploader.uploadMeta,
        },
        order: {
            sell: sellService.sell,
            sellUpdate: sellService.update,
            fill: new buy_1.FlowBuy(sdk, apis, blockchainNetwork).buy,
            buy: new buy_1.FlowBuy(sdk, apis, blockchainNetwork).buy,
            acceptBid: new buy_1.FlowBuy(sdk, apis, blockchainNetwork).buy,
            bid: bidService.bid,
            bidUpdate: bidService.update,
            cancel: new cancel_1.FlowCancel(sdk, apis, blockchainNetwork).cancel,
        },
        balances: {
            getBalance: new balance_1.FlowBalance(sdk, network, wallet).getBalance,
            convert: not_implemented_1.notImplemented,
            getBiddingBalance: not_implemented_1.nonImplementedAction,
            depositBiddingBalance: not_implemented_1.nonImplementedAction,
            withdrawBiddingBalance: not_implemented_1.nonImplementedAction,
        },
        restriction: {
            canTransfer: function () {
                return Promise.resolve({ success: true });
            },
        },
    };
}
exports.createFlowSdk = createFlowSdk;
