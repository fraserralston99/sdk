"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alignBn = exports.bigNumToBn = exports.bigNumToBuffer = exports.bnToBuffer = void 0;
var anchor_1 = require("@project-serum/anchor");
function bnToBuffer(value, endian, length) {
    return value.toArrayLike(Buffer, endian, length);
}
exports.bnToBuffer = bnToBuffer;
function bigNumToBuffer(value, endian, length) {
    return bnToBuffer(bigNumToBn(value), endian, length);
}
exports.bigNumToBuffer = bigNumToBuffer;
function bigNumToBn(value) {
    return new anchor_1.BN(value.toString());
}
exports.bigNumToBn = bigNumToBn;
/**
 * align BN internal representation to minimum len size
 * @param value
 * @param len
 */
function alignBn(value, len) {
    return new anchor_1.BN(bnToBuffer(value, "le", len));
}
exports.alignBn = alignBn;
