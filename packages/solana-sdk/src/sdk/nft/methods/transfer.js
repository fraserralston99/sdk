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
exports.createTransferTokenInstruction = exports.getTokenTransferInstructions = void 0;
var web3_js_1 = require("@solana/web3.js");
var borsh_1 = require("borsh");
var spl_token_1 = require("@solana/spl-token");
var mpl_core_1 = require("@metaplex-foundation/mpl-core");
var helpers_1 = require("../../../common/helpers");
var utils_1 = require("../../../common/utils");
function getTokenTransferInstructions(request) {
    return __awaiter(this, void 0, void 0, function () {
        var instructions, signers, destinationTokenAccount, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    instructions = [];
                    signers = [request.signer];
                    return [4 /*yield*/, spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, request.mint, request.to)];
                case 1:
                    destinationTokenAccount = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, mpl_core_1.Account.load(request.connection, destinationTokenAccount)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    instructions.push((0, helpers_1.createAssociatedTokenAccountInstruction)(destinationTokenAccount, request.signer.publicKey, request.to, request.mint));
                    return [3 /*break*/, 5];
                case 5:
                    instructions.push(createTransferTokenInstruction(request.tokenAccount, destinationTokenAccount, request.signer.publicKey, (0, utils_1.alignBn)((0, utils_1.bigNumToBn)(request.amount), 8)));
                    return [2 /*return*/, { instructions: instructions, signers: signers }];
            }
        });
    });
}
exports.getTokenTransferInstructions = getTokenTransferInstructions;
function createTransferTokenInstruction(sourceTokenAccount, destinationTokenAccount, owner, amount) {
    var data = Buffer.from((0, borsh_1.serialize)(new Map([[
            Object,
            {
                kind: "struct",
                fields: [
                    ["instruction", "u8"],
                    ["amount", "u64"],
                ],
            },
        ]]), {
        instruction: 3,
        amount: (0, utils_1.bnToBuffer)(amount, "le", 8),
    }));
    var keys = [{
            pubkey: sourceTokenAccount,
            isSigner: false,
            isWritable: true,
        }, {
            pubkey: destinationTokenAccount,
            isSigner: false,
            isWritable: true,
        }];
    keys.push({
        pubkey: owner,
        isSigner: true,
        isWritable: false,
    });
    return new web3_js_1.TransactionInstruction({
        programId: spl_token_1.TOKEN_PROGRAM_ID,
        keys: keys,
        data: data,
    });
}
exports.createTransferTokenInstruction = createTransferTokenInstruction;