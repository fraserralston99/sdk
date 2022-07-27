"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var bid_1 = require("../../../common/atoms-tests/bid");
var accept_bid_1 = require("../../../common/atoms-tests/accept-bid");
var config_1 = require("../../../common/config");
var currency_1 = require("../../../common/currency");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var bid_update_1 = require("../../../common/atoms-tests/bid-update");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.FLOW,
            description: "NFT <=> FLOW_FT",
            wallets: {
                seller: (0, wallet_1.getFlowSellerWallet)(),
                buyer: (0, wallet_1.getFlowBuyerWallet)(),
            },
            collectionId: config_1.testsConfig.variables.FLOW_RARIBLE_COLLECTION,
            mintRequest: function (creatorAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            currency: "FLOW_FT",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: "0.0001",
                            currency: currency,
                        }];
                });
            }); },
            updateBidRequest: {
                price: "0.0002",
            },
        },
    ];
}
describe.each(suites())("$blockchain mint => bid => bidUpdate => acceptBid", function (suite) {
    var _a = suite.wallets, sellerWallet = _a.seller, buyerWallet = _a.buyer;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, walletAddressBuyer, collection, nft, requestCurrency, bidRequest, bidOrder, order;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    walletAddressSeller = _a.sent();
                    return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(buyerWallet)];
                case 2:
                    walletAddressBuyer = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, suite.collectionId)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 4:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 5:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.bidRequest(requestCurrency)];
                case 6:
                    bidRequest = _a.sent();
                    return [4 /*yield*/, (0, bid_1.bid)(buyerSdk, buyerWallet, { itemId: nft.id }, bidRequest)];
                case 7:
                    bidOrder = _a.sent();
                    return [4 /*yield*/, (0, bid_update_1.bidUpdate)(buyerSdk, buyerWallet, { orderId: bidOrder.id }, suite.updateBidRequest)];
                case 8:
                    order = _a.sent();
                    return [4 /*yield*/, (0, accept_bid_1.acceptBid)(sellerSdk, sellerWallet, { orderId: order.id }, { amount: bidRequest.amount })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(buyerSdk, nft.id, walletAddressBuyer.address, (0, types_1.toBigNumber)(String(bidRequest.amount)))
                        //toDo add balance verification
                    ];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});