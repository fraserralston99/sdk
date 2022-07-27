"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fcl = tslib_1.__importStar(require("@onflow/fcl"));
var sdk_wallet_1 = require("@rarible/sdk-wallet");
var api_client_1 = require("@rarible/api-client");
var flow_sdk_1 = require("@rarible/flow-sdk");
var apis_1 = require("../../common/apis");
var retry_1 = require("../../common/retry");
var create_test_flow_auth_1 = require("./test/create-test-flow-auth");
var mint_1 = require("./mint");
var create_test_item_1 = require("./test/create-test-item");
describe("Flow mint", function () {
    var authUser1 = (0, create_test_flow_auth_1.createTestFlowAuth)(fcl).authUser1;
    var wallet = new sdk_wallet_1.FlowWallet(fcl);
    var sdk = (0, flow_sdk_1.createFlowSdk)(wallet.fcl, "testnet", {}, authUser1);
    var apis = (0, apis_1.createApisSdk)("testnet");
    var mint = new mint_1.FlowMint(sdk, apis, "testnet");
    test.skip("Should mint new NFT", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var itemId, nft;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_test_item_1.createTestItem)(mint)];
                case 1:
                    itemId = _a.sent();
                    return [4 /*yield*/, (0, retry_1.retry)(10, 4000, function () { return apis.item.getItemById({ itemId: itemId }); })];
                case 2:
                    nft = _a.sent();
                    expect(nft.id).toEqual(itemId);
                    return [2 /*return*/];
            }
        });
    }); });
    test("test preprocess metadata", function () {
        var response = mint.preprocessMeta({
            blockchain: api_client_1.Blockchain.FLOW,
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
