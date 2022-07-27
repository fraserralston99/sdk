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
exports.delay = exports.retry = exports.mintToken = exports.getTokenAccounts = exports.requestSol = exports.genTestWallet = exports.getTestWallet = exports.createSdk = exports.testWallets = exports.TEST_AUCTION_HOUSE = void 0;
var web3_js_1 = require("@solana/web3.js");
var solana_wallet_1 = require("@rarible/solana-wallet");
var sdk_1 = require("../sdk/sdk");
exports.TEST_AUCTION_HOUSE = "8Qu3azqi31VpgPwVW99AyiBGnLSpookWQiwLMvFn4NFm";
exports.testWallets = [{
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
    }, {
        privateKeyString: "2uCT82XZqTxbpVL7AoQCPi4jPxQD5zNU7PT9dYdXGeTbyzrgTRPnCKFXTSUfgMRk3Sahyhwd29YggDQHEdkWve61",
        privateKeyArray: Uint8Array.from([
            95, 7, 178, 206, 40, 211, 26, 11, 231, 5, 170,
            238, 66, 255, 253, 120, 206, 37, 238, 179, 226, 149,
            152, 249, 70, 149, 165, 216, 57, 48, 186, 183, 37,
            133, 254, 50, 205, 43, 152, 131, 54, 75, 66, 244,
            110, 229, 101, 18, 38, 62, 201, 39, 245, 109, 226,
            73, 236, 37, 143, 180, 126, 229, 117, 206,
        ]),
        publicKeyString: "3XUb9y7Z3ADxptxgfMJHcBTxxyCpfcuLDkaTfvW2DGwf",
    }];
function createSdk() {
    var endpoint = process.env.SOLANA_CUSTOM_ENDPOINT !== "" ? process.env.SOLANA_CUSTOM_ENDPOINT : undefined;
    console.debug("solana endpoint:", endpoint);
    return sdk_1.SolanaSdk.create({
        connection: {
            cluster: "devnet",
            endpoint: endpoint,
            commitmentOrConfig: "confirmed",
        },
        debug: true,
    });
}
exports.createSdk = createSdk;
function getTestWallet(walletIndex) {
    if (walletIndex === void 0) { walletIndex = 0; }
    return solana_wallet_1.SolanaKeypairWallet.createFrom(exports.testWallets[walletIndex].privateKeyString);
}
exports.getTestWallet = getTestWallet;
function genTestWallet(seed) {
    return solana_wallet_1.SolanaKeypairWallet.generate(seed);
}
exports.genTestWallet = genTestWallet;
function requestSol(connection, publicKey, sol) {
    if (sol === void 0) { sol = 2; }
    return __awaiter(this, void 0, void 0, function () {
        var fromAirdropSignature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.requestAirdrop(publicKey, sol * web3_js_1.LAMPORTS_PER_SOL)];
                case 1:
                    fromAirdropSignature = _a.sent();
                    return [4 /*yield*/, connection.confirmTransaction(fromAirdropSignature)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.getBalance(publicKey)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.requestSol = requestSol;
function getTokenAccounts(connection, owner, mint) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getTokenAccountsByOwner(owner, { mint: mint })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTokenAccounts = getTokenAccounts;
function mintToken(_a) {
    var sdk = _a.sdk, wallet = _a.wallet, _b = _a.tokensAmount, tokensAmount = _b === void 0 ? 1 : _b;
    return __awaiter(this, void 0, void 0, function () {
        var mintPrepare, mintTx, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, sdk.nft.mint({
                        signer: wallet,
                        metadataUrl: "https://arweave.net/Vt0uj2ql0ck-U5dLWDWJnwQaZPrvqkfxils8agrTiOc",
                        amount: tokensAmount,
                        masterEditionSupply: tokensAmount !== 1 ? 0 : undefined,
                        collection: null,
                    })];
                case 1:
                    mintPrepare = _d.sent();
                    return [4 /*yield*/, mintPrepare.tx.submit("max")];
                case 2:
                    mintTx = _d.sent();
                    expect(mintTx.txId).toBeTruthy();
                    expect(mintPrepare.mint).toBeTruthy();
                    // required confirmation
                    return [4 /*yield*/, sdk.connection.confirmTransaction(mintTx.txId, "finalized")];
                case 3:
                    // required confirmation
                    _d.sent();
                    _c = expect;
                    return [4 /*yield*/, sdk.balances.getTokenBalance(wallet.publicKey, mintPrepare.mint)];
                case 4:
                    _c.apply(void 0, [(_d.sent()).toString()])
                        .toEqual(tokensAmount.toString());
                    return [2 /*return*/, { mintTx: mintTx, mint: mintPrepare.mint }];
            }
        });
    });
}
exports.mintToken = mintToken;
function retry(num, del, thunk) {
    return thunk().catch(function (error) {
        if (num === 0) {
            throw error;
        }
        return delay(del).then(function () { return retry(num - 1, del, thunk); });
    });
}
exports.retry = retry;
function delay(num) {
    return new Promise(function (r) { return setTimeout(r, num); });
}
exports.delay = delay;
