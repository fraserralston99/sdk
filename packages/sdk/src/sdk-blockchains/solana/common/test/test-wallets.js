"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = void 0;
var solana_wallet_1 = require("@rarible/solana-wallet");
var pks = [
    [
        99, 87, 171, 135, 138, 126, 92, 128, 190, 64, 22,
        156, 36, 13, 155, 14, 214, 77, 78, 101, 109, 150,
        94, 234, 196, 21, 218, 230, 47, 10, 188, 156, 22,
        203, 117, 122, 86, 152, 247, 27, 69, 100, 69, 12,
        18, 49, 12, 192, 255, 53, 207, 73, 136, 97, 31,
        162, 159, 106, 115, 88, 189, 176, 183, 218,
    ],
    [
        95, 7, 178, 206, 40, 211, 26, 11, 231, 5, 170,
        238, 66, 255, 253, 120, 206, 37, 238, 179, 226, 149,
        152, 249, 70, 149, 165, 216, 57, 48, 186, 183, 37,
        133, 254, 50, 205, 43, 152, 131, 54, 75, 66, 244,
        110, 229, 101, 18, 38, 62, 201, 39, 245, 109, 226,
        73, 236, 37, 143, 180, 126, 229, 117, 206,
    ],
];
function getWallet(index) {
    if (index === void 0) { index = 0; }
    if (index >= pks.length) {
        throw new Error("No wallet index available");
    }
    return solana_wallet_1.SolanaKeypairWallet.createFrom(Uint8Array.from(pks[index]));
}
exports.getWallet = getWallet;
