"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnixTs = exports.sleep = exports.toPublicKey = exports.isPrivateKey = exports.isPublicKey = void 0;
var tslib_1 = require("tslib");
var web3 = tslib_1.__importStar(require("@solana/web3.js"));
function isPublicKey(x) {
    return x instanceof web3.PublicKey;
}
exports.isPublicKey = isPublicKey;
function isPrivateKey(x) {
    return x instanceof web3.Keypair;
}
exports.isPrivateKey = isPrivateKey;
function toPublicKey(key) {
    return new web3.PublicKey(key);
}
exports.toPublicKey = toPublicKey;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function getUnixTs() {
    return new Date().getTime() / 1000;
}
exports.getUnixTs = getUnixTs;
