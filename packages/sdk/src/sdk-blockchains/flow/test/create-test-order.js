"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestOrder = void 0;
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var converters_1 = require("../common/converters");
function createTestOrder(orderId) {
    return {
        id: (0, types_1.toOrderId)("".concat(api_client_1.Blockchain.FLOW, ":").concat(orderId)),
        fill: (0, types_1.toBigNumber)("0"),
        platform: api_client_1.Platform.RARIBLE,
        makeStock: (0, types_1.toBigNumber)("1"),
        cancelled: true,
        createdAt: "2021-10-26T18:21:01.612Z",
        lastUpdatedAt: "2021-10-26T18:20:52.255Z",
        makePrice: (0, types_1.toBigNumber)("1.025"),
        maker: (0, converters_1.convertFlowUnionAddress)("0x285b7909b8ed1652"),
        make: {
            type: {
                "@type": "FLOW_NFT",
                contract: (0, converters_1.convertFlowContractAddress)("A.ebf4ae01d1284af8.RaribleNFT"),
                tokenId: (0, types_1.toBigNumber)("617"),
            },
            value: (0, types_1.toBigNumber)("1"),
        },
        take: {
            type: {
                "@type": "FLOW_FT",
                contract: (0, converters_1.convertFlowContractAddress)("A.7e60df042a9c0868.FlowToken"),
            },
            value: (0, types_1.toBigNumber)("1.025"),
        },
        salt: "",
        pending: [],
        status: api_client_1.OrderStatus.ACTIVE,
        data: {
            "@type": "FLOW_RARIBLE_V1",
            payouts: [],
            originFees: [],
        },
    };
}
exports.createTestOrder = createTestOrder;
