"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestContract = void 0;
var common_1 = require("../common");
function getTestContract(env, type) {
    switch (env) {
        case "development": {
            var contracts = {
                eurTzContract: "KT1HvTfYG7DgeujAQ1LDvCHiQc29VMycoJh5",
                fa12Contract: "KT1X9S5Z69r36kToUx2xSi32gmhRjEW64dMS",
                nftContract: "KT1PuABq2ReD789KtKetktvVKJcCMpyDgwUx",
                mtContract: "KT1DqmzJCkUQ8xAqeKzz9L4g4owLiQj87XaC",
            };
            return (0, common_1.convertTezosToContractAddress)(contracts[type]);
        }
        case "testnet": {
            var contracts = {
                eurTzContract: "KT1PEBh9oKkQosYuw4tvzigps5p7uqXMgdez",
                fa12Contract: "KT1WsXMAzcre2MNUjNkGtVQLpsTnNFhBJhLv",
                nftContract: "KT1DtQV5qTnxdG49GbMRdKC8fg7bpvPLNcpm",
                mtContract: "KT1Uke8qc4YTfP41dGuoGC8UsgRyCtyvKPLA",
            };
            return (0, common_1.convertTezosToContractAddress)(contracts[type]);
        }
        case "dev":
        case "staging": {
            var contracts = {
                eurTzContract: "KT1PEBh9oKkQosYuw4tvzigps5p7uqXMgdez",
                fa12Contract: "KT1WsXMAzcre2MNUjNkGtVQLpsTnNFhBJhLv",
                nftContract: "KT1UiWhFgLBbTRPd9h9Zym34sFhTiuwDayqH",
                mtContract: "KT1Uke8qc4YTfP41dGuoGC8UsgRyCtyvKPLA",
            };
            return (0, common_1.convertTezosToContractAddress)(contracts[type]);
        }
        case "prod": {
            var contracts = {
                eurTzContract: "",
                fa12Contract: "KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW",
                nftContract: "",
                mtContract: "KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS",
            };
            return (0, common_1.convertTezosToContractAddress)(contracts[type]);
        }
        default: throw new Error("Unrecognized env");
    }
}
exports.getTestContract = getTestContract;
