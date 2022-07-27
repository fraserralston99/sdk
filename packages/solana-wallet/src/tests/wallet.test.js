"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolanaTestWallet = exports.testWallet = void 0;
var bs58_1 = require("bs58");
var keypair_wallet_1 = require("../wallet/keypair-wallet");
exports.testWallet = {
    privateKeyString: "2zCVNyb3KhunreVgamvMPDiFZpkHKHnhNeuyoanQcPaN5yHzKBM8f9PF2h6zSaBm2UUDYf98yBGNS7iRbRHGvYrm",
    privateKeyArray: Uint8Array.from([
        99, 87, 171, 135, 138, 126, 92, 128, 190, 64, 22,
        156, 36, 13, 155, 14, 214, 77, 78, 101, 109, 150,
        94, 234, 196, 21, 218, 230, 47, 10, 188, 156, 22,
        203, 117, 122, 86, 152, 247, 27, 69, 100, 69, 12,
        18, 49, 12, 192, 255, 53, 207, 73, 136, 97, 31,
        162, 159, 106, 115, 88, 189, 176, 183, 218,
    ]),
    publicKeyString: "2XyukL1KvwDkfNcdBpfXbj6UtPqF7zcUdTDURNjLFAMo",
};
function getSolanaTestWallet() {
    return keypair_wallet_1.SolanaKeypairWallet.createFrom(exports.testWallet.privateKeyString);
}
exports.getSolanaTestWallet = getSolanaTestWallet;
describe("solana wallet", function () {
    test("should generate new keypair", function () {
        var wallet = keypair_wallet_1.SolanaKeypairWallet.generate();
        expect(wallet.keyPair.secretKey).toBeTruthy();
    });
    test("Should create wallet from string private key", function () {
        var wallet = getSolanaTestWallet();
        expect(wallet.keyPair.secretKey).toEqual(exports.testWallet.privateKeyArray);
        expect(wallet.keyPair.publicKey.toBase58()).toEqual(exports.testWallet.publicKeyString);
    });
    test("Should create wallet from array private key", function () {
        var wallet = getSolanaTestWallet();
        expect(bs58_1.default.encode(wallet.keyPair.secretKey)).toEqual(exports.testWallet.privateKeyString);
        expect(wallet.keyPair.publicKey.toBase58()).toEqual(exports.testWallet.publicKeyString);
    });
    test("Should sign message", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    wallet = getSolanaTestWallet();
                    _b = (_a = console).log;
                    return [4 /*yield*/, wallet.signMessage("Hello")];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
});
