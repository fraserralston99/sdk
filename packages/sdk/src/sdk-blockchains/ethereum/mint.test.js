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
var common_1 = require("./common");
var await_item_1 = require("./test/await-item");
var common_2 = require("./test/common");
describe.skip("mint", function () {
    var _a = (0, ethereum_sdk_test_common_1.createE2eProvider)(undefined, common_2.providerDevelopmentSettings), provider = _a.provider, wallet = _a.wallet;
    var ethereum = new web3_ethereum_1.Web3Ethereum({ web3: new web3_1.default(provider) });
    var ethereumWallet = new sdk_wallet_1.EthereumWallet(ethereum);
    var sdk = (0, index_1.createRaribleSdk)(ethereumWallet, "development", { logs: domain_2.LogsLevel.DISABLED });
    var erc721Address = (0, types_1.toAddress)("0x96CE5b00c75e28d7b15F25eA392Cbb513ce1DE9E");
    var erc1155Address = (0, types_1.toAddress)("0xda75B20cCFf4F86d2E8Ef00Da61A166edb7a233a");
    test("should mint ERC721 token", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, contract, collection, tokenId, action, result, transaction, item;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet.getAddressString();
                    sender = (0, common_1.convertEthereumToUnionAddress)(senderRaw, api_client_1.Blockchain.ETHEREUM);
                    contract = (0, common_1.convertEthereumContractAddress)(erc721Address, api_client_1.Blockchain.ETHEREUM);
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
                    return [4 /*yield*/, sdk.nft.mint({
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
                        })];
                case 4:
                    result = _a.sent();
                    if (!(result.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 7];
                    return [4 /*yield*/, result.transaction.wait()];
                case 5:
                    transaction = _a.sent();
                    expect(transaction.blockchain).toEqual("ETHEREUM");
                    expect(transaction.hash).toBeTruthy();
                    return [4 /*yield*/, (0, await_item_1.awaitItem)(sdk, result.itemId)];
                case 6:
                    item = _a.sent();
                    expect(item.tokenId).toEqual(tokenId === null || tokenId === void 0 ? void 0 : tokenId.tokenId);
                    return [3 /*break*/, 8];
                case 7: throw new Error("Must be on chain");
                case 8: return [2 /*return*/];
            }
        });
    }); });
    test("should mint ERC1155 token", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var senderRaw, sender, collection, action, result, transaction;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    senderRaw = wallet.getAddressString();
                    sender = (0, common_1.convertEthereumToUnionAddress)(senderRaw, api_client_1.Blockchain.ETHEREUM);
                    return [4 /*yield*/, sdk.apis.collection.getCollectionById({
                            collection: (0, common_1.convertEthereumContractAddress)(erc1155Address, api_client_1.Blockchain.ETHEREUM),
                        })];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, sdk.nft.mint({ collection: collection })];
                case 2:
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
                        })];
                case 3:
                    result = _a.sent();
                    if (!(result.type === domain_1.MintType.ON_CHAIN)) return [3 /*break*/, 5];
                    return [4 /*yield*/, result.transaction.wait()];
                case 4:
                    transaction = _a.sent();
                    expect(transaction.blockchain).toEqual("ETHEREUM");
                    expect(transaction.hash).toBeTruthy();
                    return [3 /*break*/, 6];
                case 5: throw new Error("Must be on chain");
                case 6: return [2 /*return*/];
            }
        });
    }); });
    test("test preprocess metadata", function () {
        var response = sdk.nft.preprocessMeta({
            blockchain: api_client_1.Blockchain.ETHEREUM,
            name: "1",
            description: "2",
            image: {
                url: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5",
                mimeType: "image/jpeg",
            },
            animation: {
                url: "ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG6",
                mimeType: "image/gif",
            },
            external: "https://rarible.com",
            attributes: [{
                    key: "eyes",
                    value: "1",
                }],
        });
        expect(response.name).toBe("1");
        expect(response.description).toBe("2");
        expect(response.image).toBe("ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG5");
        expect(response.animation_url).toBe("ipfs://ipfs/QmfVqzkQcKR1vCNqcZkeVVy94684hyLki7QcVzd9rmjuG6");
        expect(response.external_url).toBe("https://rarible.com");
        expect(response.attributes[0].key).toBe("eyes");
        expect(response.attributes[0].value).toBe("1");
    });
});
