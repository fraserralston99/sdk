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
exports.getAuctionHouseExecuteSellInstructions = void 0;
var bignumber_js_1 = require("bignumber.js");
var web3 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var schema_1 = require("../../../common/schema");
var contracts_1 = require("../../../common/contracts");
var helpers_1 = require("../../../common/helpers");
var auction_house_helpers_1 = require("../../../common/auction-house-helpers");
var utils_1 = require("../../../common/utils");
function getAuctionHouseExecuteSellInstructions(request) {
    return __awaiter(this, void 0, void 0, function () {
        var anchorProgram, auctionHouseObj, isNative, buyPriceAdjusted, tokenSizeAdjusted, tokenAccountKey, buyerTradeState, sellerTradeState, _a, freeTradeState, freeTradeStateBump, _b, escrowPaymentAccount, escrowBump, _c, programAsSigner, programAsSignerBump, metadata, metadataObj, metadataDecoded, remainingAccounts, i, _d, _e, signers, tMint, instruction, _f, _g, _h, _j;
        var _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0: return [4 /*yield*/, (0, auction_house_helpers_1.loadAuctionHouseProgram)(request.connection, request.signer)];
                case 1:
                    anchorProgram = _o.sent();
                    return [4 /*yield*/, anchorProgram.account.auctionHouse.fetch(request.auctionHouse)];
                case 2:
                    auctionHouseObj = _o.sent();
                    isNative = auctionHouseObj.treasuryMint.equals(contracts_1.WRAPPED_SOL_MINT);
                    return [4 /*yield*/, (0, helpers_1.getPriceWithMantissa)(request.connection, new bignumber_js_1.default(request.price), auctionHouseObj.treasuryMint, request.signer)];
                case 3:
                    buyPriceAdjusted = _o.sent();
                    return [4 /*yield*/, (0, helpers_1.getPriceWithMantissa)(request.connection, new bignumber_js_1.default(request.tokensAmount), request.mint, request.signer)];
                case 4:
                    tokenSizeAdjusted = _o.sent();
                    return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(request.mint, request.sellerWallet)];
                case 5:
                    tokenAccountKey = (_o.sent())[0];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseTradeState)(request.auctionHouse, request.buyerWallet, tokenAccountKey, 
                        //@ts-ignore
                        auctionHouseObj.treasuryMint, request.mint, tokenSizeAdjusted, buyPriceAdjusted)];
                case 6:
                    buyerTradeState = (_o.sent())[0];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseTradeState)(request.auctionHouse, request.sellerWallet, tokenAccountKey, 
                        //@ts-ignore
                        auctionHouseObj.treasuryMint, request.mint, tokenSizeAdjusted, buyPriceAdjusted)];
                case 7:
                    sellerTradeState = (_o.sent())[0];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseTradeState)(request.auctionHouse, request.sellerWallet, tokenAccountKey, 
                        //@ts-ignore
                        auctionHouseObj.treasuryMint, request.mint, tokenSizeAdjusted, new bignumber_js_1.default(0))];
                case 8:
                    _a = _o.sent(), freeTradeState = _a[0], freeTradeStateBump = _a[1];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseBuyerEscrow)(request.auctionHouse, request.buyerWallet)];
                case 9:
                    _b = _o.sent(), escrowPaymentAccount = _b[0], escrowBump = _b[1];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseProgramAsSigner)()];
                case 10:
                    _c = _o.sent(), programAsSigner = _c[0], programAsSignerBump = _c[1];
                    return [4 /*yield*/, (0, helpers_1.getMetadata)(request.mint)];
                case 11:
                    metadata = _o.sent();
                    return [4 /*yield*/, anchorProgram.provider.connection.getAccountInfo(metadata)];
                case 12:
                    metadataObj = _o.sent();
                    if (!metadataObj) {
                        throw new Error("Account info doesn't fetched");
                    }
                    metadataDecoded = (0, schema_1.decodeMetadata)(Buffer.from(metadataObj.data));
                    remainingAccounts = [];
                    if (!metadataDecoded.data.creators) return [3 /*break*/, 16];
                    i = 0;
                    _o.label = 13;
                case 13:
                    if (!(i < metadataDecoded.data.creators.length)) return [3 /*break*/, 16];
                    remainingAccounts.push({
                        pubkey: new web3.PublicKey(metadataDecoded.data.creators[i].address),
                        isWritable: true,
                        isSigner: false,
                    });
                    if (!!isNative) return [3 /*break*/, 15];
                    _e = (_d = remainingAccounts).push;
                    _k = {};
                    return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(
                        //@ts-ignore
                        auctionHouseObj.treasuryMint, remainingAccounts[remainingAccounts.length - 1].pubkey)];
                case 14:
                    _e.apply(_d, [(_k.pubkey = (_o.sent())[0],
                            _k.isWritable = true,
                            _k.isSigner = false,
                            _k)]);
                    _o.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 13];
                case 16:
                    signers = [];
                    tMint = auctionHouseObj.treasuryMint;
                    _g = (_f = anchorProgram.instruction).executeSale;
                    _h = [escrowBump,
                        freeTradeStateBump,
                        programAsSignerBump,
                        (0, utils_1.bigNumToBn)(buyPriceAdjusted),
                        (0, utils_1.bigNumToBn)(tokenSizeAdjusted)];
                    _l = {};
                    _m = {
                        buyer: request.buyerWallet,
                        seller: request.sellerWallet,
                        metadata: metadata,
                        tokenAccount: tokenAccountKey,
                        tokenMint: request.mint,
                        escrowPaymentAccount: escrowPaymentAccount,
                        treasuryMint: tMint
                    };
                    if (!isNative) return [3 /*break*/, 17];
                    _j = request.sellerWallet;
                    return [3 /*break*/, 19];
                case 17: return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(tMint, request.sellerWallet)];
                case 18:
                    _j = (_o.sent())[0];
                    _o.label = 19;
                case 19:
                    _m.sellerPaymentReceiptAccount = _j;
                    return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(request.mint, request.buyerWallet)];
                case 20: return [4 /*yield*/, _g.apply(_f, _h.concat([(_l.accounts = (_m.buyerReceiptTokenAccount = (_o.sent())[0],
                            _m.authority = auctionHouseObj.authority,
                            _m.auctionHouse = request.auctionHouse,
                            _m.auctionHouseFeeAccount = auctionHouseObj.auctionHouseFeeAccount,
                            _m.auctionHouseTreasury = auctionHouseObj.auctionHouseTreasury,
                            _m.sellerTradeState = sellerTradeState,
                            _m.buyerTradeState = buyerTradeState,
                            _m.tokenProgram = spl_token_1.TOKEN_PROGRAM_ID,
                            _m.systemProgram = web3.SystemProgram.programId,
                            _m.ataProgram = spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                            _m.programAsSigner = programAsSigner,
                            _m.rent = web3.SYSVAR_RENT_PUBKEY,
                            _m.freeTradeState = freeTradeState,
                            _m),
                            _l.remainingAccounts = remainingAccounts,
                            _l.signers = signers,
                            _l)]))];
                case 21:
                    instruction = _o.sent();
                    instruction.keys
                        .filter(function (k) { return k.pubkey.equals(request.signer.publicKey); })
                        .map(function (k) { return (k.isSigner = true); });
                    return [2 /*return*/, { instructions: [instruction], signers: signers }];
            }
        });
    });
}
exports.getAuctionHouseExecuteSellInstructions = getAuctionHouseExecuteSellInstructions;
