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
exports.getMintNftInstructions = exports.createMetadata = void 0;
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var anchor_1 = require("@project-serum/anchor");
var mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var node_fetch_1 = require("node-fetch");
var solana_wallet_1 = require("@rarible/solana-wallet");
var helpers_1 = require("../../../common/helpers");
function fetchMetadata(url) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1.default)(url, { method: "GET" })];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    throw new Error("Metadata fetch failed ".concat(url));
                case 4: return [2 /*return*/];
            }
        });
    });
}
function validateMetadata(metadata) {
    if (!metadata.name ||
        !metadata.image ||
        isNaN(metadata.seller_fee_basis_points) ||
        !metadata.properties ||
        !Array.isArray(metadata.properties.creators)) {
        throw new Error("Invalid metadata file");
    }
    // Validate creators
    var metaCreators = metadata.properties.creators;
    if (metaCreators.some(function (creator) { return !creator.address; }) ||
        metaCreators.reduce(function (sum, creator) { return creator.share + sum; }, 0) !== 100) {
        throw new Error("Invalid creators");
    }
}
function createMetadata(metadataLink, collection, verifyCreators, uses) {
    if (verifyCreators === void 0) { verifyCreators = {}; }
    if (uses === void 0) { uses = null; }
    return __awaiter(this, void 0, void 0, function () {
        var metadata, metaCreators, creators;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchMetadata(metadataLink)
                    // Validate metadata
                ];
                case 1:
                    metadata = _a.sent();
                    // Validate metadata
                    validateMetadata(metadata);
                    metaCreators = metadata.properties.creators;
                    creators = metaCreators.map(function (creator) {
                        var _a;
                        return new mpl_token_metadata_1.Creator({
                            address: creator.address,
                            share: creator.share,
                            verified: (_a = verifyCreators === null || verifyCreators === void 0 ? void 0 : verifyCreators[creator.address]) !== null && _a !== void 0 ? _a : false,
                        });
                    });
                    return [2 /*return*/, new mpl_token_metadata_1.DataV2({
                            symbol: metadata.symbol,
                            name: metadata.name,
                            uri: metadataLink,
                            sellerFeeBasisPoints: metadata.seller_fee_basis_points,
                            creators: creators,
                            collection: collection
                                ? new mpl_token_metadata_1.Collection({ key: collection.toBase58(), verified: false })
                                : null,
                            uses: uses,
                        })];
            }
        });
    });
}
exports.createMetadata = createMetadata;
function getMintNftInstructions(connection, signer, params) {
    return __awaiter(this, void 0, void 0, function () {
        var data, mintRent, mint, instructions, signers, userTokenAccoutAddress, metadataAccount, editionAccount;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createMetadata(params.metadataLink, params.collection, params.verifyCreators ? (_a = {}, _a[signer.publicKey.toString()] = true, _a) : undefined, params.use)];
                case 1:
                    data = _b.sent();
                    if (!data) {
                        throw new Error("Empty metadata");
                    }
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)
                        // Generate a mint
                    ];
                case 2:
                    mintRent = _b.sent();
                    mint = solana_wallet_1.SolanaKeypairWallet.generate();
                    instructions = [];
                    signers = [mint, signer];
                    instructions.push(web3_js_1.SystemProgram.createAccount({
                        fromPubkey: signer.publicKey,
                        // eslint-disable-next-line unicorn/no-keyword-prefix
                        newAccountPubkey: mint.publicKey,
                        lamports: mintRent,
                        space: spl_token_1.MintLayout.span,
                        programId: spl_token_1.TOKEN_PROGRAM_ID,
                    }));
                    instructions.push(spl_token_1.Token.createInitMintInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, signer.publicKey, signer.publicKey));
                    return [4 /*yield*/, (0, helpers_1.getTokenWallet)(signer.publicKey, mint.publicKey)];
                case 3:
                    userTokenAccoutAddress = _b.sent();
                    instructions.push((0, helpers_1.createAssociatedTokenAccountInstruction)(userTokenAccoutAddress, signer.publicKey, signer.publicKey, mint.publicKey));
                    return [4 /*yield*/, (0, helpers_1.getMetadata)(mint.publicKey)];
                case 4:
                    metadataAccount = _b.sent();
                    instructions.push.apply(instructions, new mpl_token_metadata_1.CreateMetadataV2({ feePayer: signer.publicKey }, {
                        metadata: metadataAccount,
                        metadataData: data,
                        updateAuthority: signer.publicKey,
                        mint: mint.publicKey,
                        mintAuthority: signer.publicKey,
                    }).instructions);
                    instructions.push(spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccoutAddress, signer.publicKey, [], params.amount));
                    if (!(params.masterEditionSupply !== undefined)) return [3 /*break*/, 6];
                    if (params.amount !== 1) {
                        throw new Error("For create master edition token amount of tokens should be equal 1");
                    }
                    return [4 /*yield*/, (0, helpers_1.getMasterEdition)(mint.publicKey)];
                case 5:
                    editionAccount = _b.sent();
                    instructions.push.apply(instructions, new mpl_token_metadata_1.CreateMasterEditionV3({
                        feePayer: signer.publicKey,
                    }, {
                        edition: editionAccount,
                        metadata: metadataAccount,
                        mint: mint.publicKey,
                        mintAuthority: signer.publicKey,
                        updateAuthority: signer.publicKey,
                        maxSupply: new anchor_1.BN(params.masterEditionSupply),
                    }).instructions);
                    _b.label = 6;
                case 6: 
                /*
                // not working with current mpl-token-metadata version
            
                if (params.mutableMetadata === false) {
                    instructions.push(
                        ...new UpdateMetadataV2(
                            {},
                            {
                                metadata: metadataAccount,
                                metadataData: data,
                                updateAuthority: signer.publicKey,
                                primarySaleHappened: null,
                                isMutable: false,
                            },
                        ).instructions,
                    )
                }*/
                return [2 /*return*/, { instructions: instructions, signers: signers, mint: mint.publicKey }];
            }
        });
    });
}
exports.getMintNftInstructions = getMintNftInstructions;
