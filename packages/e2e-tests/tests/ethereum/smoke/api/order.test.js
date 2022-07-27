"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var sell_1 = require("../../../common/atoms-tests/sell");
var wallet_1 = require("../../../common/wallet");
var create_sdk_1 = require("../../../common/create-sdk");
var mint_1 = require("../../../common/atoms-tests/mint");
var helpers_1 = require("../../../common/helpers");
var config_1 = require("../../../common/config");
var currency_1 = require("../../../common/currency");
var order_helper_1 = require("../../../common/api-helpers/order-helper");
var bid_1 = require("../../../common/atoms-tests/bid");
function suites() {
    var _this = this;
    return [
        {
            blockchain: api_client_1.Blockchain.ETHEREUM,
            wallets: {
                seller: (0, wallet_1.getEthereumWallet)(),
                buyer: (0, wallet_1.getEthereumWalletBuyer)(),
            },
            collectionId: config_1.testsConfig.variables.ETHEREUM_COLLECTION_ERC_1155,
            mintRequest: function (walletAddress) {
                return {
                    uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                    creators: [{
                            account: walletAddress,
                            value: 10000,
                        }],
                    royalties: [],
                    lazyMint: false,
                    supply: 20,
                };
            },
            currency: "ERC20",
            sellRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 3,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
            bidRequest: function (currency) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, {
                            amount: 5,
                            price: "0.0000000000000001",
                            currency: currency,
                        }];
                });
            }); },
        },
    ];
}
describe.each(suites())("$blockchain api => order", function (suite) {
    var _a = suite.wallets, sellerWallet = _a.seller, buyerWallet = _a.buyer;
    var sellerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, sellerWallet);
    var buyerSdk = (0, create_sdk_1.createSdk)(suite.blockchain, buyerWallet);
    test("order controller", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var walletAddressSeller, collection, nft, requestCurrency, orderRequest, sellOrder, ordersAll, ordersAllRaw, ordersByIds, ordersByIdsRaw, sellOrders, sellOrdersRaw, sellOrdersByItem, sellOrdersByItemRaw, sellOrdersByMaker, sellOrdersByMakerRaw, bidRequest, orderBidsByItem, orderBidsByItemRaw;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, wallet_1.getWalletAddressFull)(sellerWallet)];
                case 1:
                    walletAddressSeller = _a.sent();
                    return [4 /*yield*/, (0, helpers_1.getCollection)(sellerSdk, suite.collectionId)];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, (0, mint_1.mint)(sellerSdk, sellerWallet, { collection: collection }, suite.mintRequest(walletAddressSeller.unionAddress))];
                case 3:
                    nft = (_a.sent()).nft;
                    return [4 /*yield*/, (0, currency_1.getCurrency)(suite.wallets, suite.currency)];
                case 4:
                    requestCurrency = _a.sent();
                    return [4 /*yield*/, suite.sellRequest(requestCurrency)];
                case 5:
                    orderRequest = _a.sent();
                    return [4 /*yield*/, (0, sell_1.sell)(sellerSdk, sellerWallet, { itemId: nft.id }, orderRequest)];
                case 6:
                    sellOrder = _a.sent();
                    return [4 /*yield*/, (0, order_helper_1.getOrdersAll)(sellerSdk, [suite.blockchain], 2)];
                case 7:
                    ordersAll = _a.sent();
                    expect(ordersAll.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getOrdersAllRaw)(sellerSdk, [suite.blockchain], 2)];
                case 8:
                    ordersAllRaw = _a.sent();
                    expect(ordersAllRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getOrdersByIds)(sellerSdk, sellOrder.id)];
                case 9:
                    ordersByIds = _a.sent();
                    expect(ordersByIds.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getOrdersByIdsRaw)(sellerSdk, sellOrder.id)];
                case 10:
                    ordersByIdsRaw = _a.sent();
                    expect(ordersByIdsRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrders)(sellerSdk, [suite.blockchain], 2)];
                case 11:
                    sellOrders = _a.sent();
                    expect(sellOrders.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrdersRaw)(sellerSdk, [suite.blockchain], 2)];
                case 12:
                    sellOrdersRaw = _a.sent();
                    expect(sellOrdersRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrdersByItem)(sellerSdk, nft.contract, nft.tokenId, 2)];
                case 13:
                    sellOrdersByItem = _a.sent();
                    expect(sellOrdersByItem.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrdersByItemRaw)(sellerSdk, nft.contract, nft.tokenId, 2)];
                case 14:
                    sellOrdersByItemRaw = _a.sent();
                    expect(sellOrdersByItemRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrdersByMaker)(sellerSdk, walletAddressSeller.unionAddress, 2)];
                case 15:
                    sellOrdersByMaker = _a.sent();
                    expect(sellOrdersByMaker.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getSellOrdersByMakerRaw)(sellerSdk, walletAddressSeller.unionAddress, 2)];
                case 16:
                    sellOrdersByMakerRaw = _a.sent();
                    expect(sellOrdersByMakerRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, suite.bidRequest(requestCurrency)];
                case 17:
                    bidRequest = _a.sent();
                    return [4 /*yield*/, (0, bid_1.bid)(buyerSdk, buyerWallet, { itemId: nft.id }, bidRequest)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, (0, order_helper_1.getOrderBidsByItem)(sellerSdk, nft.contract, nft.tokenId, 2)];
                case 19:
                    orderBidsByItem = _a.sent();
                    expect(orderBidsByItem.orders.length).toBeGreaterThanOrEqual(1);
                    return [4 /*yield*/, (0, order_helper_1.getOrderBidsByItemRaw)(sellerSdk, nft.contract, nft.tokenId, 2)];
                case 20:
                    orderBidsByItemRaw = _a.sent();
                    expect(orderBidsByItemRaw.value.orders.length).toBeGreaterThanOrEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
