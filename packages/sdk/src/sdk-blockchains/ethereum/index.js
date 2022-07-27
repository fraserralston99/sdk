"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEthereumSdk = void 0;
var protocol_ethereum_sdk_1 = require("@rarible/protocol-ethereum-sdk");
var api_client_1 = require("@rarible/api-client");
var middleware_1 = require("../../common/middleware/middleware");
var upload_meta_1 = require("../union/meta/upload-meta");
var mint_1 = require("./mint");
var sell_1 = require("./sell");
var fill_1 = require("./fill");
var burn_1 = require("./burn");
var transfer_1 = require("./transfer");
var bid_1 = require("./bid");
var cancel_1 = require("./cancel");
var balance_1 = require("./balance");
var token_id_1 = require("./token-id");
var create_collection_1 = require("./create-collection");
var cryptopunk_1 = require("./cryptopunk");
function createEthereumSdk(wallet, apis, blockchain, network, config) {
    var sdk = (0, protocol_ethereum_sdk_1.createRaribleSdk)(wallet === null || wallet === void 0 ? void 0 : wallet.ethereum, network, {
        apiClientParams: config.params,
        logs: config.logs,
        ethereum: config[api_client_1.Blockchain.ETHEREUM],
        polygon: config[api_client_1.Blockchain.POLYGON],
    });
    var sellService = new sell_1.EthereumSell(sdk, network, config);
    var balanceService = new balance_1.EthereumBalance(sdk, apis, network);
    var bidService = new bid_1.EthereumBid(sdk, wallet, balanceService, network, config);
    var mintService = new mint_1.EthereumMint(sdk, apis, network);
    var fillerService = new fill_1.EthereumFill(sdk, wallet, network, config);
    var createCollectionService = new create_collection_1.EthereumCreateCollection(sdk, network);
    var cryptopunkService = new cryptopunk_1.EthereumCryptopunk(sdk, network);
    var preprocessMeta = middleware_1.Middlewarer.skipMiddleware(mintService.preprocessMeta);
    var metaUploader = new upload_meta_1.MetaUploader(api_client_1.Blockchain.ETHEREUM, preprocessMeta);
    return {
        nft: {
            transfer: new transfer_1.EthereumTransfer(sdk, network).transfer,
            mint: mintService.prepare,
            burn: new burn_1.EthereumBurn(sdk, network).burn,
            generateTokenId: new token_id_1.EthereumTokenId(sdk).generateTokenId,
            deploy: createCollectionService.createCollection,
            createCollection: createCollectionService.createCollection,
            preprocessMeta: preprocessMeta,
            uploadMeta: metaUploader.uploadMeta,
        },
        order: {
            fill: fillerService.fill,
            buy: fillerService.buy,
            acceptBid: fillerService.acceptBid,
            sell: sellService.sell,
            sellUpdate: sellService.update,
            bid: bidService.bid,
            bidUpdate: bidService.update,
            cancel: new cancel_1.EthereumCancel(sdk, network).cancel,
        },
        balances: {
            getBalance: balanceService.getBalance,
            convert: balanceService.convert,
            getBiddingBalance: balanceService.getBiddingBalance,
            depositBiddingBalance: balanceService.depositBiddingBalance,
            withdrawBiddingBalance: balanceService.withdrawBiddingBalance,
        },
        restriction: {
            canTransfer: function () {
                return Promise.resolve({ success: true });
            },
        },
        ethereum: {
            wrapCryptoPunk: cryptopunkService.wrap,
            unwrapCryptoPunk: cryptopunkService.unwrap,
        },
    };
}
exports.createEthereumSdk = createEthereumSdk;
