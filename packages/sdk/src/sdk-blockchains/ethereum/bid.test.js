"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web3_ethereum_1 = require("@rarible/web3-ethereum");
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var ethereum_sdk_test_common_1 = require("@rarible/ethereum-sdk-test-common");
var types_1 = require("@rarible/types");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
var api_client_1 = require("@rarible/api-client");
var protocol_ethereum_sdk_1 = require("@rarible/protocol-ethereum-sdk");
var send_transaction_1 = require("@rarible/protocol-ethereum-sdk/build/common/send-transaction");
var index_1 = require("../../index");
var retry_1 = require("../../common/retry");
var domain_1 = require("../../domain");
var domain_2 = require("../../types/nft/mint/domain");
var init_providers_1 = require("./test/init-providers");
var await_item_1 = require("./test/await-item");
var await_stock_1 = require("./test/await-stock");
var common_1 = require("./common");
var reset_weth_funds_1 = require("./test/reset-weth-funds");
var await_balance_1 = require("./test/await-balance");
describe.skip("bid", function () {
    var _a = (0, init_providers_1.initProviders)({
        pk1: undefined,
        pk2: "ded057615d97f0f1c751ea2795bc4b03bbf44844c13ab4f5e6fd976506c276b9",
    }), web31 = _a.web31, wallet1 = _a.wallet1, web32 = _a.web32;
    var ethereum1 = new web3_ethereum_1.Web3Ethereum({ web3: web31 });
    var ethwallet1 = new sdk_wallet_1.EthereumWallet(ethereum1);
    var sdk1 = (0, index_1.createRaribleSdk)(ethwallet1, "development", { logs: domain_1.LogsLevel.DISABLED });
    var ethereum2 = new web3_ethereum_1.Web3Ethereum({ web3: web32 });
    var ethwallet2 = new sdk_wallet_1.EthereumWallet(ethereum2);
    var sdk2 = (0, index_1.createRaribleSdk)(ethwallet2, "development", { logs: domain_1.LogsLevel.DISABLED });
    var ethSdk2 = (0, protocol_ethereum_sdk_1.createRaribleSdk)(ethwallet2.ethereum, "dev-ethereum", { logs: domain_1.LogsLevel.DISABLED });
    var web3 = (0, init_providers_1.initProvider)(undefined, {
        rpcUrl: "https://dev-ethereum-node.rarible.com",
        networkId: 300500,
    }).web3;
    var nullFundsEthereum = new web3_ethereum_1.Web3Ethereum({ web3: web3 });
    var nullFundsWallet = new sdk_wallet_1.EthereumWallet(nullFundsEthereum);
    var nullFundsSdk = (0, index_1.createRaribleSdk)(nullFundsWallet, "development", { logs: domain_1.LogsLevel.DISABLED });
    var wethContractEthereum = (0, types_1.toAddress)("0x55eB2809896aB7414706AaCDde63e3BBb26e0BC6");
    var wethContract = (0, types_1.toContractAddress)("".concat(api_client_1.Blockchain.ETHEREUM, ":").concat(wethContractEthereum));
    var wethAsset = { "@type": "ERC20", contract: wethContract };
    var erc721Address = (0, types_1.toAddress)("0x96CE5b00c75e28d7b15F25eA392Cbb513ce1DE9E");
    var erc1155Address = (0, types_1.toAddress)("0xda75B20cCFf4F86d2E8Ef00Da61A166edb7a233a");
    var e2eErc1155V2ContractAddress = (0, common_1.convertEthereumCollectionId)(erc1155Address, api_client_1.Blockchain.ETHEREUM);
    var it = (0, ethereum_sdk_test_common_1.awaitAll)({
        testErc20: (0, ethereum_sdk_test_common_1.deployTestErc20)(web31, "Test1", "TST1"),
        testErc721: (0, ethereum_sdk_test_common_1.deployTestErc721)(web31, "Test2", "TST2"),
        testErc1155: (0, ethereum_sdk_test_common_1.deployTestErc1155)(web31, "Test2"),
    });
    test.skip("bid on erc721 <-> erc20 and update bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemOwner, bidderAddress, bidderUnionAddress, _a, _b, action, result, response, price, orderId, order, updateAction, acceptBidResponse, acceptBidTx;
        var _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, ethwallet1.ethereum.getFrom()];
                case 1:
                    itemOwner = _d.sent();
                    return [4 /*yield*/, ethwallet2.ethereum.getFrom()];
                case 2:
                    bidderAddress = _d.sent();
                    bidderUnionAddress = (0, common_1.convertEthereumToUnionAddress)(bidderAddress, api_client_1.Blockchain.ETHEREUM);
                    _a = send_transaction_1.sentTx;
                    _b = [it.testErc20.methods.mint(bidderAddress, "10000000000000")];
                    _c = {};
                    return [4 /*yield*/, ethereum1.getFrom()];
                case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.from = _d.sent(),
                            _c.gas = 500000,
                            _c)]))];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, sdk1.nft.mint({
                            collectionId: (0, common_1.convertEthereumCollectionId)(erc721Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 5:
                    action = _d.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(itemOwner, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: false,
                            supply: 1,
                        })];
                case 6:
                    result = _d.sent();
                    if (!(result.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 8];
                    return [4 /*yield*/, result.transaction.wait()];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, result.itemId)];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, (0, reset_weth_funds_1.resetWethFunds)(ethwallet2, ethSdk2, wethContractEthereum)];
                case 10:
                    _d.sent();
                    return [4 /*yield*/, sdk2.order.bid({ itemId: result.itemId })];
                case 11:
                    response = _d.sent();
                    price = "0.0000000000000002";
                    return [4 /*yield*/, response.submit({
                            amount: 1,
                            price: price,
                            currency: {
                                "@type": "ERC20",
                                contract: (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM),
                            },
                            originFees: [{
                                    account: bidderUnionAddress,
                                    value: 1000,
                                }],
                        })];
                case 12:
                    orderId = _d.sent();
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, price)];
                case 13:
                    order = _d.sent();
                    expect(order.makeStock.toString()).toEqual(price);
                    return [4 /*yield*/, sdk2.order.bidUpdate({
                            orderId: orderId,
                        })];
                case 14:
                    updateAction = _d.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.0000000000000004" })];
                case 15:
                    _d.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({ orderId: orderId })];
                case 16:
                    acceptBidResponse = _d.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({ amount: 1, infiniteApproval: true })];
                case 17:
                    acceptBidTx = _d.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 18:
                    _d.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.ownership.getOwnershipById({
                                        ownershipId: "".concat(result.itemId, ":").concat(bidderAddress),
                                    })];
                            });
                        }); })];
                case 19:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("bid on erc-1155, convert to weth and update bid", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemOwner, bidderAddress, bidderUnionAddress, tokenId, itemId, response, price, orderId, updateAction, acceptBidResponse, acceptBidTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethwallet1.ethereum.getFrom()];
                case 1:
                    itemOwner = _a.sent();
                    return [4 /*yield*/, ethwallet2.ethereum.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    bidderUnionAddress = (0, common_1.convertEthereumToUnionAddress)(bidderAddress, api_client_1.Blockchain.ETHEREUM);
                    tokenId = "2";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc1155.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, it.testErc1155.methods.mint(itemOwner, tokenId, 100, "124").send({
                            from: itemOwner,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, itemId)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, reset_weth_funds_1.resetWethFunds)(ethwallet2, ethSdk2, wethContractEthereum)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 6:
                    response = _a.sent();
                    price = "0.00000000000000002";
                    return [4 /*yield*/, response.submit({
                            amount: 3,
                            price: price,
                            currency: {
                                "@type": "ERC20",
                                contract: wethContract,
                            },
                            originFees: [{
                                    account: bidderUnionAddress,
                                    value: 1000,
                                }],
                        })];
                case 7:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, "0.00000000000000006")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bidUpdate({
                            orderId: orderId,
                        })];
                case 9:
                    updateAction = _a.sent();
                    return [4 /*yield*/, updateAction.submit({ price: "0.00000000000000004" })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({ orderId: orderId })];
                case 11:
                    acceptBidResponse = _a.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({ amount: 1, infiniteApproval: true })];
                case 12:
                    acceptBidTx = _a.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.ownership.getOwnershipById({
                                        ownershipId: "ETHEREUM:".concat(it.testErc1155.options.address, ":").concat(tokenId, ":").concat(bidderAddress),
                                    })];
                            });
                        }); })];
                case 14:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("getConvertValue returns undefined when passed non-weth contract", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, tokenId, itemId, bidderAddress, bidderUnionAddress, bidResponse, value;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    tokenId = "3";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc1155.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc1155.methods.mint(senderRaw, tokenId, 100, "123"), {
                            from: senderRaw,
                            gas: 500000,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    bidderUnionAddress = (0, common_1.convertEthereumToUnionAddress)(bidderAddress, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc20.methods.mint(bidderAddress, "10000000000000"), {
                            from: senderRaw,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk2, itemId)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, reset_weth_funds_1.resetWethFunds)(ethwallet2, ethSdk2, wethContractEthereum)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, await_balance_1.awaitBalance)(sdk2, wethAsset, ethwallet2, "0")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 7:
                    bidResponse = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var value;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bidResponse.getConvertableValue({
                                            assetType: {
                                                "@type": "ERC20",
                                                contract: (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM),
                                            },
                                            price: "0.00000000000000001",
                                            amount: 5,
                                            originFees: [{
                                                    account: bidderUnionAddress,
                                                    value: 1000,
                                                }],
                                        })];
                                    case 1:
                                        value = _a.sent();
                                        expect(value).toBe(undefined);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, bidResponse.getConvertableValue({
                            currencyId: (0, types_1.toCurrencyId)("ETHEREUM:".concat(it.testErc20.options.address)),
                            price: "0.00000000000000001",
                            amount: 5,
                            originFees: [{
                                    account: bidderUnionAddress,
                                    value: 1000,
                                }],
                        })];
                case 9:
                    value = _a.sent();
                    expect(value).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("getConvertValue returns insufficient type", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, tokenId, itemId, bidResponse, value, _a, _b, _c;
        var _d, _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    senderRaw = wallet1.getAddressString();
                    tokenId = "4";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc1155.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc1155.methods.mint(senderRaw, tokenId, 100, "123"), {
                            from: senderRaw,
                            gas: 500000,
                        })];
                case 1:
                    _f.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(nullFundsSdk, itemId)];
                case 2:
                    _f.sent();
                    return [4 /*yield*/, nullFundsSdk.order.bid({ itemId: itemId })];
                case 3:
                    bidResponse = _f.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var value, _a, _b, _c;
                            var _d, _e;
                            return tslib_1.__generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _b = (_a = bidResponse).getConvertableValue;
                                        _d = {
                                            assetType: { "@type": "ERC20", contract: wethContract },
                                            price: "0.00000000000000001",
                                            amount: 5
                                        };
                                        _e = {};
                                        _c = common_1.convertEthereumToUnionAddress;
                                        return [4 /*yield*/, ethereum2.getFrom()];
                                    case 1: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent(), api_client_1.Blockchain.ETHEREUM]),
                                                    _e.value = 1000,
                                                    _e)],
                                                _d)])];
                                    case 2:
                                        value = _f.sent();
                                        if (!value)
                                            throw new Error("Convertable value must be non-undefined");
                                        expect(value.value.toString()).toBe("0.000000000000000055");
                                        expect(value.type).toBe("insufficient");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _f.sent();
                    _b = (_a = bidResponse).getConvertableValue;
                    _d = {
                        currencyId: (0, types_1.toCurrencyId)(wethContract),
                        price: "0.00000000000000001",
                        amount: 5
                    };
                    _e = {};
                    _c = common_1.convertEthereumToUnionAddress;
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 5: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent(), api_client_1.Blockchain.ETHEREUM]),
                                _e.value = 1000,
                                _e)],
                            _d)])];
                case 6:
                    value = _f.sent();
                    if (!value)
                        throw new Error("Convertable value must be non-undefined");
                    expect(value.value.toString()).toBe("0.000000000000000055");
                    expect(value.type).toBe("insufficient");
                    return [2 /*return*/];
            }
        });
    }); });
    test("getConvertableValue returns undefined", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, bidResponse, bidderUnionAddress, _a, wethAsset, wethBidderBalance, _b, tx;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    itemId = (0, types_1.toItemId)("".concat(api_client_1.Blockchain.ETHEREUM, ":0x2Ac19979c171F7b626096C9eDc8Cd5C589cf110b:1"));
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 1:
                    bidResponse = _c.sent();
                    _a = common_1.convertEthereumToUnionAddress;
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 2:
                    bidderUnionAddress = _a.apply(void 0, [_c.sent(), api_client_1.Blockchain.ETHEREUM]);
                    wethAsset = { "@type": "ERC20", contract: wethContract };
                    _b = bignumber_js_1.default.bind;
                    return [4 /*yield*/, sdk2.balances.getBalance(bidderUnionAddress, wethAsset)];
                case 3:
                    wethBidderBalance = new (_b.apply(bignumber_js_1.default, [void 0, _c.sent()]))();
                    if (!wethBidderBalance.lt("0.000000000000001")) return [3 /*break*/, 6];
                    return [4 /*yield*/, ethSdk2.balances.convert({ assetClass: "ETH" }, { assetClass: "ERC20", contract: (0, types_1.toAddress)(wethContractEthereum) }, "0.0000000000000055")];
                case 4:
                    tx = _c.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6: return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var value, _a, _b, _c;
                        var _d, _e;
                        return tslib_1.__generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _b = (_a = bidResponse).getConvertableValue;
                                    _d = {
                                        assetType: { "@type": "ERC20", contract: wethContract },
                                        price: "0.000000000000001",
                                        amount: 5
                                    };
                                    _e = {};
                                    _c = common_1.convertEthereumToUnionAddress;
                                    return [4 /*yield*/, ethereum2.getFrom()];
                                case 1: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent(), api_client_1.Blockchain.ETHEREUM]),
                                                _e.value = 1000,
                                                _e)],
                                            _d)])];
                                case 2:
                                    value = _f.sent();
                                    expect(value).toBe(undefined);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("getConvertableValue returns convertable value", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, bidResponse;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemId = (0, types_1.toItemId)("".concat(api_client_1.Blockchain.ETHEREUM, ":0x2Ac19979c171F7b626096C9eDc8Cd5C589cf110b:1"));
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 1:
                    bidResponse = _a.sent();
                    return [4 /*yield*/, (0, reset_weth_funds_1.resetWethFunds)(ethwallet2, ethSdk2, wethContractEthereum)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, await_balance_1.awaitBalance)(sdk2, wethAsset, ethwallet2, "0")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(5, 2000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var value, _a, _b, _c;
                            var _d, _e;
                            return tslib_1.__generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _b = (_a = bidResponse).getConvertableValue;
                                        _d = {
                                            assetType: wethAsset,
                                            price: "0.000000000000001",
                                            amount: 5
                                        };
                                        _e = {};
                                        _c = common_1.convertEthereumToUnionAddress;
                                        return [4 /*yield*/, ethereum2.getFrom()];
                                    case 1: return [4 /*yield*/, _b.apply(_a, [(_d.originFees = [(_e.account = _c.apply(void 0, [_f.sent(), api_client_1.Blockchain.ETHEREUM]),
                                                    _e.value = 1000,
                                                    _e)],
                                                _d)])];
                                    case 2:
                                        value = _f.sent();
                                        if (!value)
                                            throw new Error("Convertable value must be non-undefined");
                                        expect(value.type).toBe("convertable");
                                        expect(new bignumber_js_1.default(value.value).isEqualTo("0.0000000000000055")).toBeTruthy();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("bid for collection", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ownerCollectionAddress, bidderAddress, tokenId, itemId, erc721Contract, bidResponse, erc20Contract, bidOrderId, acceptBidResponse, fillBidResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum1.getFrom()];
                case 1:
                    ownerCollectionAddress = _a.sent();
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc20.methods.mint(bidderAddress, "10000000000000"), {
                            from: ownerCollectionAddress,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    tokenId = "5";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc721.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc721.methods.mint(ownerCollectionAddress, tokenId, "0"), {
                            from: ownerCollectionAddress,
                            gas: 500000,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, itemId)];
                case 5:
                    _a.sent();
                    erc721Contract = (0, common_1.convertEthereumCollectionId)(it.testErc721.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, sdk2.order.bid({
                            collectionId: erc721Contract,
                        })];
                case 6:
                    bidResponse = _a.sent();
                    erc20Contract = (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, bidResponse.submit({
                            amount: 1,
                            price: "0.00000000000000001",
                            currency: {
                                "@type": "ERC20",
                                contract: erc20Contract,
                            },
                            expirationDate: new Date(Date.now() + 60000),
                        })];
                case 7:
                    bidOrderId = _a.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({
                            orderId: bidOrderId,
                        })];
                case 8:
                    acceptBidResponse = _a.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                            itemId: (0, types_1.toItemId)("".concat(erc721Contract, ":").concat(tokenId)),
                        })];
                case 9:
                    fillBidResult = _a.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("bid on erc721 <-> erc20 with CurrencyId", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemOwner, bidderAddress, bidderUnionAddress, tokenId, itemId, response, price, erc20Contract, orderId, order, takeAssetType, acceptBidResponse, acceptBidTx;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethwallet1.ethereum.getFrom()];
                case 1:
                    itemOwner = _a.sent();
                    return [4 /*yield*/, ethwallet2.ethereum.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    bidderUnionAddress = (0, common_1.convertEthereumToUnionAddress)(bidderAddress, api_client_1.Blockchain.ETHEREUM);
                    tokenId = "7";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc721.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc721.methods.mint(itemOwner, tokenId, "123"), {
                            from: itemOwner,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc20.methods.mint(bidderAddress, "10000000000000"), {
                            from: itemOwner,
                            gas: 500000,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, itemId)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, reset_weth_funds_1.resetWethFunds)(ethwallet2, ethSdk2, wethContractEthereum)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bid({ itemId: itemId })];
                case 7:
                    response = _a.sent();
                    price = "0.00000000000000002";
                    erc20Contract = (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, response.submit({
                            amount: 1,
                            price: price,
                            currency: (0, types_1.toCurrencyId)(erc20Contract),
                            originFees: [{
                                    account: bidderUnionAddress,
                                    value: 1000,
                                }],
                        })];
                case 8:
                    orderId = _a.sent();
                    return [4 /*yield*/, (0, await_stock_1.awaitStock)(sdk1, orderId, price)];
                case 9:
                    order = _a.sent();
                    expect(order.makeStock.toString()).toEqual(price);
                    takeAssetType = order.make.type;
                    expect(takeAssetType["@type"]).toEqual("ERC20");
                    expect(takeAssetType.contract.toLowerCase()).toEqual(erc20Contract.toLowerCase());
                    return [4 /*yield*/, sdk1.order.acceptBid({ orderId: orderId })];
                case 10:
                    acceptBidResponse = _a.sent();
                    return [4 /*yield*/, acceptBidResponse.submit({ amount: 1, infiniteApproval: true })];
                case 11:
                    acceptBidTx = _a.sent();
                    return [4 /*yield*/, acceptBidTx.wait()];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                return [2 /*return*/, sdk1.apis.ownership.getOwnershipById({
                                        ownershipId: "ETHEREUM:".concat(it.testErc721.options.address, ":").concat(tokenId, ":").concat(bidderAddress),
                                    })];
                            });
                        }); })];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("bid for collection with outdated expiration date", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ownerCollectionAddress, bidderAddress, tokenId, itemId, erc721Contract, bidResponse, erc20Contract, bidOrderId, acceptBidResponse, errorMessage, fillBidResult, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum1.getFrom()];
                case 1:
                    ownerCollectionAddress = _a.sent();
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc20.methods.mint(bidderAddress, "10000000000000"), {
                            from: ownerCollectionAddress,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    tokenId = "6";
                    itemId = (0, common_1.convertEthereumItemId)("".concat(it.testErc721.options.address, ":").concat(tokenId), api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc721.methods.mint(ownerCollectionAddress, tokenId, "1"), {
                            from: ownerCollectionAddress,
                            gas: 500000,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, itemId)];
                case 5:
                    _a.sent();
                    erc721Contract = (0, common_1.convertEthereumCollectionId)(it.testErc721.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, sdk2.order.bid({
                            collectionId: erc721Contract,
                        })];
                case 6:
                    bidResponse = _a.sent();
                    erc20Contract = (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, bidResponse.submit({
                            amount: 1,
                            price: "0.00000000000000001",
                            currency: {
                                "@type": "ERC20",
                                contract: erc20Contract,
                            },
                            expirationDate: new Date(),
                        })];
                case 7:
                    bidOrderId = _a.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({
                            orderId: bidOrderId,
                        })];
                case 8:
                    acceptBidResponse = _a.sent();
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 12, , 13]);
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 1,
                            infiniteApproval: true,
                            itemId: (0, types_1.toItemId)("".concat(erc721Contract, ":").concat(tokenId)),
                        })];
                case 10:
                    fillBidResult = _a.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_1 = _a.sent();
                    errorMessage = e_1.message;
                    return [3 /*break*/, 13];
                case 13:
                    expect(errorMessage).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test.skip("bid for collection and accept bid on lazy item", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var ownerCollectionAddress, bidderAddress, action, mintResult, bidResponse, erc20Contract, bidOrderId, acceptBidResponse, tokenId, fillBidResult;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum1.getFrom()];
                case 1:
                    ownerCollectionAddress = _a.sent();
                    return [4 /*yield*/, ethereum2.getFrom()];
                case 2:
                    bidderAddress = _a.sent();
                    return [4 /*yield*/, (0, send_transaction_1.sentTx)(it.testErc20.methods.mint(bidderAddress, "10000000000000"), {
                            from: ownerCollectionAddress,
                            gas: 500000,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, sdk1.nft.mint({ collectionId: e2eErc1155V2ContractAddress })];
                case 4:
                    action = _a.sent();
                    return [4 /*yield*/, action.submit({
                            uri: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                            creators: [{
                                    account: (0, common_1.convertEthereumToUnionAddress)(ownerCollectionAddress, api_client_1.Blockchain.ETHEREUM),
                                    value: 10000,
                                }],
                            royalties: [],
                            lazyMint: true,
                            supply: 10,
                        })];
                case 5:
                    mintResult = _a.sent();
                    if (!(mintResult.type === domain_2.MintType.ON_CHAIN)) return [3 /*break*/, 7];
                    return [4 /*yield*/, mintResult.transaction.wait()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk1, mintResult.itemId)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, sdk2.order.bid({
                            collectionId: e2eErc1155V2ContractAddress,
                        })];
                case 9:
                    bidResponse = _a.sent();
                    erc20Contract = (0, common_1.convertEthereumContractAddress)(it.testErc20.options.address, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, bidResponse.submit({
                            amount: 10,
                            price: "0.00000000000000001",
                            currency: {
                                "@type": "ERC20",
                                contract: erc20Contract,
                            },
                        })];
                case 10:
                    bidOrderId = _a.sent();
                    return [4 /*yield*/, sdk1.order.acceptBid({
                            orderId: bidOrderId,
                        })];
                case 11:
                    acceptBidResponse = _a.sent();
                    tokenId = (0, common_1.getEthereumItemId)(mintResult.itemId).tokenId;
                    return [4 /*yield*/, acceptBidResponse.submit({
                            amount: 10,
                            infiniteApproval: true,
                            itemId: (0, types_1.toItemId)("".concat(e2eErc1155V2ContractAddress, ":").concat(tokenId)),
                        })];
                case 12:
                    fillBidResult = _a.sent();
                    return [4 /*yield*/, fillBidResult.wait()];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 1000, function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var ownership;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sdk1.apis.ownership.getOwnershipById({
                                            ownershipId: "".concat(mintResult.itemId, ":").concat(bidderAddress),
                                        })];
                                    case 1:
                                        ownership = _a.sent();
                                        expect(ownership.value).toBe("10");
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 14:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
