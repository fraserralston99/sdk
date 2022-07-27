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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionHouseEscrowDepositInstructions = void 0;
var bignumber_js_1 = require("bignumber.js");
var web3 = require("@solana/web3.js");
var solana_wallet_1 = require("@rarible/solana-wallet");
var spl_token_1 = require("@solana/spl-token");
var contracts_1 = require("../../../common/contracts");
var helpers_1 = require("../../../common/helpers");
var auction_house_helpers_1 = require("../../../common/auction-house-helpers");
var utils_1 = require("../../../common/utils");
function getActionHouseEscrowDepositInstructions(request) {
    return __awaiter(this, void 0, void 0, function () {
        var walletKeyPair, anchorProgram, auctionHouseObj, amountAdjusted, _a, _b, escrowPaymentAccount, escrowBump, isNative, ata, transferAuthority, signers, instruction, instructions;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    walletKeyPair = request.signer;
                    return [4 /*yield*/, (0, auction_house_helpers_1.loadAuctionHouseProgram)(request.connection, request.signer)];
                case 1:
                    anchorProgram = _c.sent();
                    return [4 /*yield*/, anchorProgram.account.auctionHouse.fetch(request.auctionHouse)];
                case 2:
                    auctionHouseObj = _c.sent();
                    _a = utils_1.bigNumToBn;
                    return [4 /*yield*/, (0, helpers_1.getPriceWithMantissa)(request.connection, new bignumber_js_1.default(request.amount), auctionHouseObj.treasuryMint, walletKeyPair)];
                case 3:
                    amountAdjusted = _a.apply(void 0, [_c.sent()]);
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseBuyerEscrow)(request.auctionHouse, walletKeyPair.publicKey)];
                case 4:
                    _b = _c.sent(), escrowPaymentAccount = _b[0], escrowBump = _b[1];
                    isNative = auctionHouseObj.treasuryMint.equals(contracts_1.WRAPPED_SOL_MINT);
                    return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(auctionHouseObj.treasuryMint, walletKeyPair.publicKey)];
                case 5:
                    ata = (_c.sent())[0];
                    transferAuthority = solana_wallet_1.SolanaKeypairWallet.generate();
                    signers = isNative ? [] : [transferAuthority];
                    return [4 /*yield*/, anchorProgram.instruction.deposit(escrowBump, amountAdjusted, {
                            accounts: {
                                wallet: walletKeyPair.publicKey,
                                paymentAccount: isNative ? walletKeyPair.publicKey : ata,
                                transferAuthority: isNative
                                    ? web3.SystemProgram.programId
                                    : transferAuthority.publicKey,
                                escrowPaymentAccount: escrowPaymentAccount,
                                //@ts-ignore
                                treasuryMint: auctionHouseObj.treasuryMint,
                                //@ts-ignore
                                authority: auctionHouseObj.authority,
                                auctionHouse: request.auctionHouse,
                                //@ts-ignore
                                auctionHouseFeeAccount: auctionHouseObj.auctionHouseFeeAccount,
                                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                                systemProgram: web3.SystemProgram.programId,
                                rent: web3.SYSVAR_RENT_PUBKEY,
                            },
                        })];
                case 6:
                    instruction = _c.sent();
                    if (!isNative) {
                        instruction.keys
                            .filter(function (k) { return k.pubkey.equals(transferAuthority.publicKey); })
                            .map(function (k) { return (k.isSigner = true); });
                    }
                    instructions = __spreadArray(__spreadArray(__spreadArray([], (isNative
                        ? []
                        : [
                            spl_token_1.Token.createApproveInstruction(spl_token_1.TOKEN_PROGRAM_ID, ata, transferAuthority.publicKey, walletKeyPair.publicKey, [], amountAdjusted),
                        ]), true), [
                        instruction
                    ], false), (isNative
                        ? []
                        : [
                            spl_token_1.Token.createRevokeInstruction(spl_token_1.TOKEN_PROGRAM_ID, ata, walletKeyPair.publicKey, []),
                        ]), true);
                    return [2 /*return*/, { instructions: instructions, signers: signers }];
            }
        });
    });
}
exports.getActionHouseEscrowDepositInstructions = getActionHouseEscrowDepositInstructions;
