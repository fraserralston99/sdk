"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowMint = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var api_client_1 = require("@rarible/api-client");
var domain_1 = require("../../types/nft/mint/domain");
var mint_1 = require("../ethereum/mint");
var converters_1 = require("./common/converters");
var prepare_flow_royalties_1 = require("./common/prepare-flow-royalties");
var FlowMint = /** @class */ (function () {
    function FlowMint(sdk, apis, network) {
        this.sdk = sdk;
        this.apis = apis;
        this.network = network;
        this.prepare = this.prepare.bind(this);
    }
    FlowMint.prototype.prepare = function (prepareRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var collection, flowCollection_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, mint_1.getCollection)(this.apis.collection, prepareRequest)];
                    case 1:
                        collection = _a.sent();
                        if (collection.type === "FLOW") {
                            flowCollection_1 = (0, converters_1.getFlowCollection)(collection.id);
                            return [2 /*return*/, {
                                    multiple: false,
                                    supportsRoyalties: true,
                                    supportsLazyMint: false,
                                    submit: action_1.Action.create({
                                        id: "mint",
                                        run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var mintResponse;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.sdk.nft.mint(flowCollection_1, request.uri, (0, prepare_flow_royalties_1.prepareFlowRoyalties)(request.royalties))];
                                                    case 1:
                                                        mintResponse = _a.sent();
                                                        return [2 /*return*/, {
                                                                type: domain_1.MintType.ON_CHAIN,
                                                                itemId: (0, converters_1.convertFlowItemId)(mintResponse.tokenId),
                                                                transaction: new sdk_transaction_1.BlockchainFlowTransaction(mintResponse, this.network),
                                                            }];
                                                }
                                            });
                                        }); },
                                    }),
                                }];
                        }
                        throw new Error("Unsupported collection type");
                }
            });
        });
    };
    FlowMint.prototype.preprocessMeta = function (meta) {
        var _a, _b;
        if (meta.blockchain !== api_client_1.Blockchain.FLOW) {
            throw new Error("Wrong blockchain");
        }
        return {
            name: meta.name,
            description: meta.description,
            image: (_a = meta.image) === null || _a === void 0 ? void 0 : _a.url,
            animation_url: (_b = meta.animation) === null || _b === void 0 ? void 0 : _b.url,
            external_url: meta.external,
            attributes: meta.attributes,
        };
    };
    return FlowMint;
}());
exports.FlowMint = FlowMint;
