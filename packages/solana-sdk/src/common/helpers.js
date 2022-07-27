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
exports.getTokenAmount = exports.getAssociatedTokenAccountForMint = exports.getAccountInfo = exports.getPriceWithMantissa = exports.getMasterEdition = exports.getMetadata = exports.createAssociatedTokenAccountInstruction = exports.getTokenWallet = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var bignumber_js_1 = require("bignumber.js");
var contracts_1 = require("./contracts");
function getTokenWallet(wallet, mint) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([wallet.toBuffer(), spl_token_1.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], contracts_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getTokenWallet = getTokenWallet;
function createAssociatedTokenAccountInstruction(associatedTokenAddress, payer, walletAddress, splTokenMintAddress) {
    var keys = [
        {
            pubkey: payer,
            isSigner: true,
            isWritable: true,
        },
        {
            pubkey: associatedTokenAddress,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: walletAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: splTokenMintAddress,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: spl_token_1.TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
    ];
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: contracts_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        data: Buffer.from([]),
    });
}
exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
function getMetadata(mint) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                        Buffer.from("metadata"),
                        contracts_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                        mint.toBuffer(),
                    ], contracts_1.TOKEN_METADATA_PROGRAM_ID)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getMetadata = getMetadata;
function getMasterEdition(mint) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                        Buffer.from("metadata"),
                        contracts_1.TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                        mint.toBuffer(),
                        Buffer.from("edition"),
                    ], contracts_1.TOKEN_METADATA_PROGRAM_ID)];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
exports.getMasterEdition = getMasterEdition;
function getPriceWithMantissa(connection, price, mint, walletKeyPair) {
    return __awaiter(this, void 0, void 0, function () {
        var token, mintInfo, mantissa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = new spl_token_1.Token(connection, mint, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                    return [4 /*yield*/, token.getMintInfo()];
                case 1:
                    mintInfo = _a.sent();
                    mantissa = Math.pow(10, mintInfo.decimals);
                    return [2 /*return*/, price.multipliedBy(mantissa).integerValue(bignumber_js_1.default.ROUND_CEIL)];
            }
        });
    });
}
exports.getPriceWithMantissa = getPriceWithMantissa;
function getAccountInfo(connection, mint, walletKeyPair, tokenAccount) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = new spl_token_1.Token(connection, mint, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                    return [4 /*yield*/, token.getAccountInfo(tokenAccount)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAccountInfo = getAccountInfo;
function getAssociatedTokenAccountForMint(mint, publicKey) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([
                        publicKey.toBuffer(),
                        spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
                        mint.toBuffer(),
                    ], contracts_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getAssociatedTokenAccountForMint = getAssociatedTokenAccountForMint;
function getTokenAmount(connection, anchorProgram, account, mint, integer) {
    var _a;
    if (integer === void 0) { integer = false; }
    return __awaiter(this, void 0, void 0, function () {
        var amount, token, e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    amount = new bignumber_js_1.default(0);
                    if (!!mint.equals(contracts_1.WRAPPED_SOL_MINT)) return [3 /*break*/, 5];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connection.getTokenAccountBalance(account, "confirmed")];
                case 2:
                    token = _c.sent();
                    if ((_a = token === null || token === void 0 ? void 0 : token.value) === null || _a === void 0 ? void 0 : _a.uiAmount) {
                        amount = integer ?
                            new bignumber_js_1.default(token.value.uiAmount).multipliedBy(Math.pow(10, token.value.decimals)) :
                            new bignumber_js_1.default(token.value.uiAmount);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    console.error(e_1);
                    console.info("Account ", account.toBase58(), "didnt return value. Assuming 0 tokens.");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = bignumber_js_1.default.bind;
                    return [4 /*yield*/, connection.getBalance(account, "confirmed")];
                case 6:
                    amount = new (_b.apply(bignumber_js_1.default, [void 0, _c.sent()]))();
                    amount = integer ? amount : amount.dividedBy(web3_js_1.LAMPORTS_PER_SOL);
                    _c.label = 7;
                case 7: return [2 /*return*/, amount];
            }
        });
    });
}
exports.getTokenAmount = getTokenAmount;
