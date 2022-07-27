"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converters_1 = require("../converters");
var _1 = require(".");
describe("Test convert Royalty to FlowRoyalty", function () {
    test("Should convert basis points to string which contents number between 0 and 1", function () {
        var result = (0, _1.prepareFlowRoyalties)([{ account: (0, converters_1.convertFlowUnionAddress)("0xabcdef0123456789"), value: 5789 }]);
        expect(result[0].value).toEqual("0.5789");
        var result1 = (0, _1.prepareFlowRoyalties)([{ account: (0, converters_1.convertFlowUnionAddress)("0xabcdef0123456789"), value: 10000 }]);
        expect(result1[0].value).toEqual("1");
        var result2 = (0, _1.prepareFlowRoyalties)([{ account: (0, converters_1.convertFlowUnionAddress)("0xabcdef0123456789"), value: 0 }]);
        expect(result2[0].value).toEqual("0");
        var result3 = function () { return (0, _1.prepareFlowRoyalties)([{ account: (0, converters_1.convertFlowUnionAddress)("0xabcdef0123456789"), value: 999999 }]); };
        expect(result3).toThrow(Error);
        var dummy = undefined;
        var result4 = (0, _1.prepareFlowRoyalties)(dummy);
        expect(result4.length).toEqual(0);
    });
});
