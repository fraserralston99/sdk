"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var flow_address_1 = require("@rarible/flow-sdk/build/common/flow-address");
var converters = tslib_1.__importStar(require("."));
var _1 = require(".");
describe("Test FLOW converter functions", function () {
    test("getFlowCollection: should success get collection if address with prefix", function () {
        var test0 = converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789.ContractName"));
        expect(typeof test0).toEqual("string");
    });
    test("getFlowCollection: should success get collection if address without prefix", function () {
        var test1 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:A.abcdef0123456789.ContractName")); };
        expect(typeof test1()).toEqual("string");
    });
    test("getFlowCollection: should success get collection with underscore", function () {
        var test1 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:A.abcdef0123456789.C_Name")); };
        expect(typeof test1()).toEqual("string");
    });
    test("getFlowCollection should throw error, blockchain not defined", function () {
        var test2 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("A.0xabcdef0123456789.ContractName")); };
        expect(test2).toThrow(Error);
    });
    test("getFlowCollection should throw error, incorrect address length", function () {
        var test3 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("Flow:A.0xabcdef0123.ContractName")); };
        expect(test3).toThrow(Error);
    });
    test("getFlowCollection should throw error, Blockchain not defined but colon is exist", function () {
        var test4 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)(":A.0xabcdef0123456789.ContractName")); };
        expect(test4).toThrow(Error);
    });
    test("getFlowCollection should throw error, Invalid contract name length", function () {
        var test5 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789.Co")); };
        expect(test5).toThrow(Error);
    });
    test("getFlowCollection should throw error, Without contract name", function () {
        var test6 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789")); };
        expect(test6).toThrow(Error);
    });
    test("getFlowCollection should throw error, Without collection 'A' prefix", function () {
        var test7 = function () { return converters.getFlowCollection((0, types_1.toContractAddress)("FLOW:0xabcdef0123456789.ContractName")); };
        expect(test7).toThrow(Error);
    });
    test("parseUnionItemId function, should parse if address with prefix", function () {
        var _a = converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:A.0xabcdef0123456789.ContractName:12345")), blockchain = _a.blockchain, contract = _a.contract, itemId = _a.itemId;
        expect(blockchain).toEqual("FLOW");
        expect(contract.length).toEqual(33);
        expect(itemId.length).toEqual(5);
    });
    test("parseUnionItemId function, should parse if address without prefix", function () {
        var _a = converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:A.abcdef0123456789.ContractName:123")), blockchain = _a.blockchain, contract = _a.contract, itemId = _a.itemId;
        expect(blockchain).toEqual("FLOW");
        expect(contract.length).toEqual(31);
        expect(itemId.length).toEqual(3);
    });
    test("parseUnionItemId function should throw error, blockchain not defined", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("0xabcdef0123456789.ContractName:0")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, Blockchain not defined but colon is exist", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)(":0xabcdef0123456789.ContractName:0")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, incorrect address", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:bcdef0123456789.ContractName:0")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, incorrect contract name(with digit)", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:0xabcdef0123456789.ContractName1:0")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, incorrect contract name length", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:0xabcdef0123456789.Co:0")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, token id not defined", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:0xabcdef0123456789.Co:")); };
        expect(test1).toThrow(Error);
    });
    test("parseUnionItemId function should throw error, colon and token id not defined", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:0xabcdef0123456789.Co")); };
        expect(test1).toThrow(Error);
    });
    test("parseFlowMaker function, should parse address with prefix", function () {
        var test1 = converters.parseFlowAddressFromUnionAddress((0, types_1.toUnionAddress)("FLOW:0xabcdef0123456789"));
        expect(test1 === null || test1 === void 0 ? void 0 : test1.length).toEqual(18);
    });
    test("parseFlowMaker function, should parse address without prefix", function () {
        var test1 = converters.parseFlowAddressFromUnionAddress((0, types_1.toUnionAddress)("FLOW:abcdef0123456789"));
        expect(test1 === null || test1 === void 0 ? void 0 : test1.length).toEqual(18);
    });
    test("parseFlowMaker function should throw error, blockchain is not defined", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("0xabcdef0123456789")); };
        expect(test1).toThrow(Error);
    });
    test("parseFlowMaker function should throw error, blockchain is not defined but colon is exist", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)(":0xabcdef0123456789")); };
        expect(test1).toThrow(Error);
    });
    test("parseFlowMaker function should throw error, incorrect address with prefix", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:0xzbcdef0123456789")); };
        expect(test1).toThrow(Error);
    });
    test("parseFlowMaker function should throw error, incorrect address without prefix", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:abcdef012345678z")); };
        expect(test1).toThrow(Error);
    });
    test("parseFlowMaker function should throw error, incorrect address length", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("FLOW:abcdef012345678")); };
        expect(test1).toThrow(Error);
    });
    test("parseOrderId function, should return flow item id", function () {
        var test1 = converters.parseOrderId("FLOW:1298749123846712");
        expect(test1.toString().length).toEqual(16);
    });
    test("parseOrderId function, should return flow item id", function () {
        var test1 = converters.parseOrderId("FLOW:0");
        expect(test1.toString().length).toEqual(1);
    });
    test("parseOrderId function, should throw error, blockchain part not exist", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)("13123412")); };
        expect(test1).toThrow(Error);
    });
    test("parseOrderId function, should throw error, blockchain part not exist but colon is exist", function () {
        var test1 = function () { return converters.parseFlowItemIdFromUnionItemId((0, types_1.toItemId)(":13123412")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should return FLOW", function () {
        var test1 = converters.getFungibleTokenName((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789.FlowToken"));
        expect(test1).toEqual("FLOW");
    });
    test("getFungibleTokenName function, should return FUSD", function () {
        var test1 = converters.getFungibleTokenName((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789.FUSD"));
        expect(test1).toEqual("FUSD");
    });
    test("getFungibleTokenName function, should throw error, incorrest contract name", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)("FLOW:A.0xabcdef0123456789.CustomName")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, blockchain part is not exist", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)("A.0xabcdef0123456789.CustomName")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, blockchain part is not exist, but colon is exist", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xabcdef0123456789.CustomName")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, incorrect address", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xzbcdef0123456789.CustomName")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, contract name is empty", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xzbcdef0123456789.")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, contract name is not exist", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xzbcdef0123456789")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, incorrect contract name length", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xzbcdef0123456789.C")); };
        expect(test1).toThrow(Error);
    });
    test("getFungibleTokenName function, should throw error, incorrect contract name format", function () {
        var test1 = function () { return converters.getFungibleTokenName((0, types_1.toContractAddress)(":A.0xzbcdef0123456789.C3")); };
        expect(test1).toThrow(Error);
    });
    test("toFlowParts function, should convert union address to flow address", function () {
        var test1 = (0, _1.toFlowParts)([{
                account: (0, types_1.toUnionAddress)("FLOW:".concat(types_1.FLOW_ZERO_ADDRESS)),
                value: 500,
            }]);
        expect((0, flow_address_1.isFlowAddress)(test1[0].account)).toBeTruthy();
    });
    test("toFlowParts function, should throw error, invalid union address", function () {
        var test1 = function () { return (0, _1.toFlowParts)([{
                account: (0, types_1.toUnionAddress)("FLOW_ZERO_ADDRESS"),
                value: 500,
            }]); };
        expect(test1).toThrow(Error);
    });
});
