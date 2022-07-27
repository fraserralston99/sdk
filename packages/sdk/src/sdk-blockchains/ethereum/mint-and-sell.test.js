"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var web3_1 = tslib_1.__importDefault(require("web3"));
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/nft/mint/domain");
var index_1 = require("../../index");
var domain_2 = require("../../domain");
var retry_1 = require("../../common/retry");
var common_1 = require("./test/common");
describe.skip("mintAndSell", function () {
    var _a = (0, ethereum_sdk_test_common_1.createE2eProvider)(undefined, common_1.providerDevelopmentSettings), provider = _a.provider, wallet = _a.wallet;
    var ethereum = new web3_ethereum_1.Web3Ethereum({ web3: new web3_1.default(provider) });
    var ethereumWallet = new sdk_wallet_1.EthereumWallet(ethereum);
    var sdk = (0, index_1.createRaribleSdk)(ethereumWallet, "development", { logs: domain_2.LogsLevel.DISABLED });
    var erc721Address = (0, types_1.toAddress)("0x96CE5b00c75e28d7b15F25eA392Cbb513ce1DE9E");
    test("prepare should work even if wallet is undefined", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var collection, action;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collection = {
                        id: (0, types_1.toCollectionId)("ETHEREUM:0x96CE5b00c75e28d7b15F25eA392Cbb513ce1DE9E"),
                        blockchain: api_client_1.Blockchain.ETHEREUM,
                        type: api_client_1.CollectionType.ERC1155,
                        name: "name",
                        owner: (0, types_1.toUnionAddress)("ETHEREUM:0xcf715bc7a0817507d0648fae6c6dd1c1e6f8fe56"),
                        features: [
                            api_client_1.CollectionFeatures.APPROVE_FOR_ALL,
                            api_client_1.CollectionFeatures.SET_URI_PREFIX,
                            api_client_1.CollectionFeatures.BURN,
                            api_client_1.CollectionFeatures.MINT_WITH_ADDRESS,
                            api_client_1.CollectionFeatures.SECONDARY_SALE_FEES,
                            api_client_1.CollectionFeatures.MINT_AND_TRANSFER,
                        ],
                        minters: [(0, types_1.toUnionAddress)("ETHEREUM:0xcf715bc7a0817507d0648fae6c6dd1c1e6f8fe56")],
                        meta: {
                            name: "Untitled",
                            content: [],
                        },
                        bestBidOrder: {
                            id: (0, types_1.toOrderId)("ETHEREUM:0x19eef9cadee457c2642e34278805dd9ad992d64980a428781b745f1e8d987f33"),
                            fill: (0, types_1.toBigNumber)("0"),
                            platform: api_client_1.Platform.RARIBLE,
                            status: api_client_1.OrderStatus.ACTIVE,
                            makeStock: (0, types_1.toBigNumber)("0.0000000000000005"),
                            cancelled: false,
                            createdAt: "2022-04-11T12:59:51.790Z",
                            lastUpdatedAt: "2022-04-11T12:59:51.790Z",
                            takePrice: (0, types_1.toBigNumber)("0.0000000000000001"),
                            maker: (0, types_1.toUnionAddress)("ETHEREUM:0xa95e8f190179d999c53dd61f1a43284e12e8fdd2"),
                            make: {
                                type: {
                                    "@type": "ERC721",
                                    contract: (0, types_1.toContractAddress)("ETHEREUM:0x96CE5b00c75e28d7b15F25eA392Cbb513ce1DE9E"),
                                    tokenId: (0, types_1.toBigNumber)("!"),
                                },
                                value: (0, types_1.toBigNumber)("1"),
                            },
                            take: {
                                type: {
                                    "@type": "ETH",
                                },
                                value: (0, types_1.toBigNumber)("1"),
                            },
                            salt: "0x83e8e03e0df70e0197619db44fa2e85b1b2a90830738b49ec9029352624395f4",
                            signature: "0xae119b2b9fdf8e8ea15216605c9c73cf7713cac987fedb1f2705e6c11c2062155cae8257ec9996934760a1fe68ea90270a8d9e6f42a1fd3dc5d2f0e3e5ee06111b",
                            pending: [],
                            data: {
                                "@type": "ETH_RARIBLE_V2",
                                payouts: [],
                                originFees: [],
                            },
                        },
                    };
                    return [4 /*yield*/, sdk.nft.mintAndSell({ collection: collection })];
                case 1:
                    action = _a.sent();
                    expect(action.supportsRoyalties).toBeTruthy();
                    expect(action.originFeeSupport).toBe("FULL");
                    return [2 /*return*/];
            }
        });
    }); });
    test("should mint and put on sale ERC721 token", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, contract, collection, tokenId, action, result, transaction;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet.getAddressString();
                    sender = (0, types_1.toUnionAddress)("ETHEREUM:".concat(senderRaw));
                    contract = (0, types_1.toContractAddress)("ETHEREUM:".concat(erc721Address));
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                            collection: contract,
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.generateTokenId({
                            collection: contract,
                            minter: sender,
                        })];
                case 2:
                    tokenId = _a.sent();
                    return [4 /*yield*/, sdk.nft.mintAndSell({
                            collection: collection,
                            tokenId: tokenId,
                        })];
                case 3:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: sender,
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                            price: "0.000000000000000001",
                            currency: {
                                "@type": "ETH",
                            },
                        })];
                case 4:
                    result = _a.sent();
                    if (!(result.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 6];
                    return [4 /*yield*/, result.transaction.wait()];
                case 5:
                    transaction = _a.sent();
                    expect(transaction.blockchain).toEqual("ETHEREUM");
                    expect(transaction.hash).toBeTruthy();
                    return [3 /*break*/, 7];
                case 6: throw new Error("Minted not on chain");
                case 7: return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var order, item;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, sdk.apis.order.getOrderById({ id: result.orderId })];
                                case 1:
                                    order = _a.sent();
                                    expect(order.makeStock.toString()).toBe("1");
                                    return [4 /*yield*/, sdk.apis.item.getItemById({ itemId: result.itemId })];
                                case 2:
                                    item = _a.sent();
                                    expect(item.supply.toString()).toEqual("1");
                                    if (tokenId) {
                                        expect(item.tokenId).toEqual(tokenId.tokenId);
                                    }
                                    else {
                                        throw new Error("Token id must be defined");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
