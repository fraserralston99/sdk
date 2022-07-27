"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTezosSdk = void 0;
var api_client_1 = require("@rarible/api-client");
var middleware_1 = require("../../common/middleware/middleware");
var not_implemented_1 = require("../../common/not-implemented");
var upload_meta_1 = require("../union/meta/upload-meta");
var sell_1 = require("./sell");
var fill_1 = require("./fill");
var common_1 = require("./common");
var mint_1 = require("./mint");
var transfer_1 = require("./transfer");
var burn_1 = require("./burn");
var token_id_1 = require("./token-id");
var cancel_1 = require("./cancel");
var balance_1 = require("./balance");
var create_collection_1 = require("./create-collection");
var restriction_1 = require("./restriction");
function createTezosSdk(wallet, _apis, config) {
    var network = config.tezosNetwork;
    var maybeProvider = (0, common_1.getMaybeTezosProvider)(wallet === null || wallet === void 0 ? void 0 : wallet.provider, network, config);
    var sellService = new sell_1.TezosSell(maybeProvider, _apis);
    var mintService = new mint_1.TezosMint(maybeProvider, _apis, network);
    var balanceService = new balance_1.TezosBalance(maybeProvider, network);
    var fillService = new fill_1.TezosFill(maybeProvider, _apis, network);
    var createCollectionService = new create_collection_1.TezosCreateCollection(maybeProvider, network);
    var preprocessMeta = middleware_1.Middlewarer.skipMiddleware(mintService.preprocessMeta);
    var metaUploader = new upload_meta_1.MetaUploader(api_client_1.Blockchain.TEZOS, preprocessMeta);
    return {
        nft: {
            mint: mintService.mint,
            burn: new burn_1.TezosBurn(maybeProvider, _apis, network).burn,
            transfer: new transfer_1.TezosTransfer(maybeProvider, _apis, network).transfer,
            generateTokenId: new token_id_1.TezosTokenId(maybeProvider).generateTokenId,
            deploy: createCollectionService.createCollection,
            createCollection: createCollectionService.createCollection,
            preprocessMeta: preprocessMeta,
            uploadMeta: metaUploader.uploadMeta,
        },
        order: {
            fill: fillService.fill,
            buy: fillService.fill,
            acceptBid: fillService.fill,
            sell: sellService.sell,
            sellUpdate: sellService.update,
            bid: not_implemented_1.notImplemented,
            bidUpdate: not_implemented_1.notImplemented,
            cancel: new cancel_1.TezosCancel(maybeProvider, _apis, network).cancel,
        },
        balances: {
            getBalance: balanceService.getBalance,
            convert: not_implemented_1.notImplemented,
            getBiddingBalance: not_implemented_1.nonImplementedAction,
            depositBiddingBalance: not_implemented_1.nonImplementedAction,
            withdrawBiddingBalance: not_implemented_1.nonImplementedAction,
        },
        restriction: {
            canTransfer: new restriction_1.TezosCanTransfer(maybeProvider).canTransfer,
        },
    };
}
exports.createTezosSdk = createTezosSdk;
