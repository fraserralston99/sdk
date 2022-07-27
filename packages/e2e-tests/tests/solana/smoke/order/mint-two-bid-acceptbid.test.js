"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var retry_1 = require("@rarible/sdk/src/common/retry");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var bid_1 = require("../../../common/atoms-tests/bid");
var accept_bid_1 = require("../../../common/atoms-tests/accept-bid");
var config_1 = require("../../../common/config");
var currency_1 = require("../../../common/currency");
var ownership_helper_1 = require("../../../common/api-helpers/ownership-helper");
var order_helper_1 = require("../../../common/api-helpers/order-helper");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.SOLANA,
            description: "NFT <=> SOLANA_SOL",
            wallets: {
                seller: (0, wallet_1.getSolanaWallet)(0),
                buyer: (0, wallet_1.getSolanaWallet)(1),
            },
            collectionId: config_1.testsConfig.variables.SOLANA_COLLECTION,
            mintRequest: function (creatorAddress) {
                return {
                    uri: config_1.testsConfig.variables.SOLANA_URI,
                    creators: [{
                            account: creatorAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 1,
                };
            },
            currency: "SOLANA_SOL",
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 1,
                            price: (0, types_1.toBigNumber)("0.005"),
                            currency: currency,
                        }];
                });
            }); },
        },
    ];
}
describe.each(suites())("$blockchain mint => two bid => acceptBid", function (suite) {
    var _a = suite.wallets, sellerWallet = _a.seller, buyerWallet = _a.buyer;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test(suite.description, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, walletAddressBuyer, collection, nft1, nft2, requestCurrency, bidRequest, bidOrder1, bidOrder2;
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
                    nft1 = (_a.sent()).nft;
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 5:
                    nft2 = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 6:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.bidRequest(requestCurrency)];
                case 7:
                    bidRequest = _a.sent();
                    return [4 /*yield*/, (0, bid_1.bid)(buyerSdk, buyerWallet, { itemId: nft1.id }, bidRequest)];
                case 8:
                    bidOrder1 = _a.sent();
                    return [4 /*yield*/, (0, bid_1.bid)(buyerSdk, buyerWallet, { itemId: nft2.id }, bidRequest)];
                case 9:
                    bidOrder2 = _a.sent();
                    return [4 /*yield*/, (0, accept_bid_1.acceptBid)(sellerSdk, sellerWallet, { orderId: bidOrder1.id }, { amount: bidRequest.amount })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (0, ownership_helper_1.awaitForOwnershipValue)(buyerSdk, nft1.id, walletAddressBuyer.address, (0, types_1.toBigNumber)(String(bidRequest.amount)))];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var ordersByIds;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, order_helper_1.getOrdersByIds)(sellerSdk, bidOrder2.id)];
                                    case 1:
                                        ordersByIds = _a.sent();
                                        expect(ordersByIds.orders[0].status).toEqual("INACTIVE");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
