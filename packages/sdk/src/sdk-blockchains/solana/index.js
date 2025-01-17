"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSolanaSdk = void 0;
var solana_sdk_1 = require("@rarible/solana-sdk");
var api_client_1 = require("@rarible/api-client");
var not_implemented_1 = require("../../common/not-implemented");
var middleware_1 = require("../../common/middleware/middleware");
var upload_meta_1 = require("../union/meta/upload-meta");
var nft_1 = require("./nft");
var fill_1 = require("./fill");
var order_1 = require("./order");
var balance_1 = require("./balance");
var collection_1 = require("./collection");
function createSolanaSdk(wallet, apis, cluster, config) {
    var sdk = solana_sdk_1.SolanaSdk.create({
        connection: {
            cluster: cluster,
            endpoint: config === null || config === void 0 ? void 0 : config.endpoint,
            commitmentOrConfig: "confirmed",
        },
        debug: false,
    });
    var nftService = new nft_1.SolanaNft(sdk, wallet, apis, config);
    var balanceService = new balance_1.SolanaBalance(sdk, wallet, apis, config);
    var orderService = new order_1.SolanaOrder(sdk, wallet, apis, config);
    var fillService = new fill_1.SolanaFill(sdk, wallet, apis, config);
    var collectionService = new collection_1.SolanaCollection(sdk, wallet, apis, config);
    var preprocessMeta = middleware_1.Middlewarer.skipMiddleware(nftService.preprocessMeta);
    var metaUploader = new upload_meta_1.MetaUploader(api_client_1.Blockchain.SOLANA, preprocessMeta);
    return {
        nft: {
            mint: nftService.mint,
            burn: nftService.burn,
            transfer: nftService.transfer,
            generateTokenId: not_implemented_1.nonImplementedAction,
            deploy: collectionService.createCollection,
            createCollection: collectionService.createCollection,
            preprocessMeta: preprocessMeta,
            uploadMeta: metaUploader.uploadMeta,
        },
        order: {
            fill: fillService.fill,
            buy: fillService.fill,
            acceptBid: fillService.fill,
            sell: orderService.sell,
            sellUpdate: orderService.sellUpdate,
            bid: orderService.bid,
            bidUpdate: orderService.bidUpdate,
            cancel: orderService.cancel,
        },
        balances: {
            getBalance: balanceService.getBalance,
            convert: not_implemented_1.nonImplementedAction,
            getBiddingBalance: balanceService.getBiddingBalance,
            depositBiddingBalance: balanceService.depositBiddingBalance,
            withdrawBiddingBalance: balanceService.withdrawBiddingBalance,
        },
        restriction: {
            canTransfer: not_implemented_1.nonImplementedAction,
        },
    };
}
exports.createSolanaSdk = createSolanaSdk;
