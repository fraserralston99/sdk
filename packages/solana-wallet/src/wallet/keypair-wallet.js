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
exports.SolanaKeypairWallet = void 0;
var web3 = require("@solana/web3.js");
var nacl = require("tweetnacl");
var bs58_1 = require("bs58");
var solana_common_1 = require("@rarible/solana-common");
/**
 * Abstraction over solana web3.Keypair
 */
var SolanaKeypairWallet = /** @class */ (function () {
    function SolanaKeypairWallet(keyPair) {
        this._keyPair = keyPair;
    }
    Object.defineProperty(SolanaKeypairWallet.prototype, "keyPair", {
        get: function () {
            return this._keyPair;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SolanaKeypairWallet.prototype, "publicKey", {
        get: function () {
            return this.keyPair.publicKey;
        },
        enumerable: false,
        configurable: true
    });
    SolanaKeypairWallet.prototype.signTransaction = function (tx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                tx.partialSign(this.keyPair);
                return [2 /*return*/, tx];
            });
        });
    };
    SolanaKeypairWallet.prototype.signAllTransactions = function (txs) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, txs.map(function (t) {
                        t.partialSign(_this.keyPair);
                        return t;
                    })];
            });
        });
    };
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    SolanaKeypairWallet.prototype.signMessage = function (message, display) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                if (typeof message === "string") {
                    data = new TextEncoder().encode(message);
                }
                else {
                    data = message;
                }
                return [2 /*return*/, nacl.sign(data, this._keyPair.secretKey).slice(0, nacl.sign.signatureLength)];
            });
        });
    };
    /**
     * Instantiate new SolanaWallet with provided keypair or from secret key
     * @param keyPair
     */
    SolanaKeypairWallet.createFrom = function (keyPair) {
        if ((0, solana_common_1.isPrivateKey)(keyPair)) {
            return new SolanaKeypairWallet(keyPair);
        }
        else if (ArrayBuffer.isView(keyPair)) {
            return new SolanaKeypairWallet(web3.Keypair.fromSecretKey(keyPair));
        }
        else if (typeof keyPair === "string") {
            return new SolanaKeypairWallet(web3.Keypair.fromSecretKey(Uint8Array.from(bs58_1.default.decode(keyPair))));
        }
        throw new Error("Unknown type of secret key");
    };
    /**
     * Instantiate new SolanaWallet with new generated keypair
     */
    SolanaKeypairWallet.generate = function (seed) {
        return SolanaKeypairWallet.createFrom(seed ? web3.Keypair.fromSeed(seed) : web3.Keypair.generate());
    };
    return SolanaKeypairWallet;
}());
exports.SolanaKeypairWallet = SolanaKeypairWallet;
