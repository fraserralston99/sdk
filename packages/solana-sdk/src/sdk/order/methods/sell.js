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
exports.getAuctionHouseSellInstructions = void 0;
var bignumber_js_1 = require("bignumber.js");
var mpl_auction_house_1 = require("@metaplex-foundation/mpl-auction-house");
var helpers_1 = require("../../../common/helpers");
var auction_house_helpers_1 = require("../../../common/auction-house-helpers");
var utils_1 = require("../../../common/utils");
function getAuctionHouseSellInstructions(request) {
    return __awaiter(this, void 0, void 0, function () {
        var anchorProgram, auctionHouseObj, buyPriceAdjusted, tokenSizeAdjusted, tokenAccountKey, _a, programAsSigner, programAsSignerBump, _b, tradeState, tradeBump, _c, freeTradeState, freeTradeBump, signers, instruction, _d, _e;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, (0, auction_house_helpers_1.loadAuctionHouseProgram)(request.connection, request.signer)];
                case 1:
                    anchorProgram = _g.sent();
                    return [4 /*yield*/, anchorProgram.account.auctionHouse.fetch(request.auctionHouse)];
                case 2:
                    auctionHouseObj = _g.sent();
                    return [4 /*yield*/, (0, helpers_1.getPriceWithMantissa)(request.connection, new bignumber_js_1.default(request.price), auctionHouseObj.treasuryMint, request.signer)];
                case 3:
                    buyPriceAdjusted = _g.sent();
                    return [4 /*yield*/, (0, helpers_1.getPriceWithMantissa)(request.connection, new bignumber_js_1.default(request.tokensAmount), request.mint, request.signer)];
                case 4:
                    tokenSizeAdjusted = _g.sent();
                    return [4 /*yield*/, (0, helpers_1.getAssociatedTokenAccountForMint)(request.mint, request.signer.publicKey)];
                case 5:
                    tokenAccountKey = (_g.sent())[0];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseProgramAsSigner)()];
                case 6:
                    _a = _g.sent(), programAsSigner = _a[0], programAsSignerBump = _a[1];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseTradeState)(request.auctionHouse, request.signer.publicKey, tokenAccountKey, auctionHouseObj.treasuryMint, request.mint, tokenSizeAdjusted, buyPriceAdjusted)];
                case 7:
                    _b = _g.sent(), tradeState = _b[0], tradeBump = _b[1];
                    return [4 /*yield*/, (0, auction_house_helpers_1.getAuctionHouseTradeState)(request.auctionHouse, request.signer.publicKey, tokenAccountKey, auctionHouseObj.treasuryMint, request.mint, tokenSizeAdjusted, new bignumber_js_1.default(0))];
                case 8:
                    _c = _g.sent(), freeTradeState = _c[0], freeTradeBump = _c[1];
                    signers = [];
                    _e = (_d = mpl_auction_house_1.AuctionHouseProgram.instructions).createSellInstruction;
                    _f = {
                        wallet: request.signer.publicKey,
                        tokenAccount: tokenAccountKey
                    };
                    return [4 /*yield*/, (0, helpers_1.getMetadata)(request.mint)];
                case 9:
                    instruction = _e.apply(_d, [(_f.metadata = _g.sent(),
                            _f.authority = auctionHouseObj.authority,
                            _f.auctionHouse = request.auctionHouse,
                            _f.auctionHouseFeeAccount = auctionHouseObj.auctionHouseFeeAccount,
                            _f.sellerTradeState = tradeState,
                            _f.freeSellerTradeState = freeTradeState,
                            _f.programAsSigner = programAsSigner,
                            _f), {
                            tradeStateBump: tradeBump,
                            freeTradeStateBump: freeTradeBump,
                            programAsSignerBump: programAsSignerBump,
                            buyerPrice: (0, utils_1.bigNumToBn)(buyPriceAdjusted),
                            tokenSize: (0, utils_1.bigNumToBn)(tokenSizeAdjusted),
                        }]);
                    instruction.keys
                        .filter(function (k) { return k.pubkey.equals(request.signer.publicKey); })
                        .map(function (k) { return (k.isSigner = true); });
                    return [2 /*return*/, { instructions: [instruction], signers: signers }];
            }
        });
    });
}
exports.getAuctionHouseSellInstructions = getAuctionHouseSellInstructions;
