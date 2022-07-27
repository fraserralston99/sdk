"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaUploader = void 0;
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var mime_types_1 = tslib_1.__importDefault(require("mime-types"));
var uuid_1 = require("uuid");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var config_1 = require("../../../config");
var FILE = "file";
var FOLDER_PREFIX = "/folder/";
var IPFS_GATEWAY_URL = "https://ipfs.rarible.com/ipfs";
var MetaUploader = /** @class */ (function () {
    function MetaUploader(blockchain, preprocessMeta) {
        this.blockchain = blockchain;
        this.preprocessMeta = preprocessMeta;
        this.preprocessMeta = preprocessMeta;
        this.uploadMeta = this.uploadMeta.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.uploadFolder = this.uploadFolder.bind(this);
    }
    MetaUploader.prototype.getRoyalties = function (royalty, account) {
        var value = parseFloat(royalty);
        return !isNaN(value) ? { account: account, value: value } : undefined;
    };
    MetaUploader.prototype.uploadMeta = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nftStorageApiKey, properties, royalty, accountAddress, files, blockchain, metadataRequest, metadata, file;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nftStorageApiKey = request.nftStorageApiKey, properties = request.properties, royalty = request.royalty, accountAddress = request.accountAddress;
                        return [4 /*yield*/, this.uploadFolder(nftStorageApiKey, {
                                image: properties.image,
                                animation: properties.animationUrl,
                            })];
                    case 1:
                        files = (_a.sent()).files;
                        blockchain = accountAddress.split(":")[0];
                        if (!(blockchain in api_client_1.Blockchain)) {
                            throw new Error("Value: \"".concat(blockchain, "\" is not a supported blockchain type"));
                        }
                        metadataRequest = {
                            blockchain: this.blockchain,
                            name: properties.name,
                            description: properties.description,
                            image: files.image && mapToCommonTokenContent(files.image),
                            animation: files.animation && mapToCommonTokenContent(files.animation),
                            external: undefined,
                            attributes: properties.attributes.map(function (prop) { return ({
                                key: prop.key,
                                trait_type: prop.key,
                                value: prop.value,
                            }); }),
                        };
                        if (metadataRequest.blockchain === "SOLANA") {
                            metadataRequest.royalties = this.getRoyalties(royalty, (0, types_1.toUnionAddress)(accountAddress));
                        }
                        metadata = this.preprocessMeta(metadataRequest);
                        file = createJson("properties.json", metadata);
                        return [2 /*return*/, this.uploadFile(nftStorageApiKey, file)];
                }
            });
        });
    };
    MetaUploader.prototype.uploadFile = function (nftStorageApiKey, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formData, name, ipfsHash;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        name = createFilename(file);
                        formData.append("file", file, name);
                        return [4 /*yield*/, uploadDataToProvider(nftStorageApiKey, formData)];
                    case 1:
                        ipfsHash = (_a.sent()).ipfsHash;
                        return [2 /*return*/, {
                                originalFile: file,
                                URL: resolveRealUrl(ipfsHash),
                                IPFSURL: toNodeAgnosticURL(ipfsHash),
                            }];
                }
            });
        });
    };
    MetaUploader.prototype.uploadFolder = function (nftStorageApiKey, upload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formData, keys, ipfsHash, files;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        keys = Object.keys(upload).filter(function (x) { return Boolean(upload[x]); });
                        keys.forEach(function (key) {
                            var file = upload[key];
                            var name = "/folder/".concat(key, ".").concat(mime_types_1.default.extension(file.type));
                            formData.append("file", file, name);
                        });
                        return [4 /*yield*/, uploadDataToProvider(nftStorageApiKey, formData)];
                    case 1:
                        ipfsHash = (_a.sent()).ipfsHash;
                        files = keys.reduce(function (prev, key) {
                            var _a;
                            var file = upload[key];
                            var name = "".concat(key, ".").concat(mime_types_1.default.extension(file.type));
                            var suffix = "".concat(ipfsHash, "/").concat(name);
                            var ipfsUrl = toNodeAgnosticURL(suffix);
                            return tslib_1.__assign(tslib_1.__assign({}, prev), (_a = {}, _a[key] = {
                                URL: resolveRealUrl(ipfsUrl),
                                IPFSURL: ipfsUrl,
                                originalFile: file,
                            }, _a));
                        }, {});
                        return [2 /*return*/, { files: files, hash: ipfsHash }];
                }
            });
        });
    };
    return MetaUploader;
}());
exports.MetaUploader = MetaUploader;
function toNodeAgnosticURL(suffix) {
    return "ipfs://ipfs/".concat(suffix);
}
function uploadDataToProvider(nftStorageApiKey, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var req, nftStorageResponse;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (nftStorageApiKey === undefined) {
                        throw new Error("Provide NFT_STORAGE_API_KEY as environment variables!");
                    }
                    req = transformNftStorageFormData(data);
                    return [4 /*yield*/, axios_1.default.create().post(config_1.NFT_STORAGE_URL, req, {
                            headers: { Authorization: "Bearer ".concat(nftStorageApiKey) },
                        })];
                case 1:
                    nftStorageResponse = (_a.sent()).data;
                    return [2 /*return*/, {
                            ipfsHash: nftStorageResponse.value.cid,
                            size: nftStorageResponse.value.size,
                        }];
            }
        });
    });
}
function transformNftStorageFormData(data) {
    var files = data.getAll(FILE).filter(function (f) { return f instanceof File; }).map(function (f) { return f; });
    var isFolder = files.some(function (f) { return f.name.startsWith(FOLDER_PREFIX); });
    if (files.length === 1 && !isFolder)
        return files[0];
    var transformFiles = files.map(function (f) { return new File([f], f.name.replace(FOLDER_PREFIX, ""), { type: f.type }); });
    var transformFormData = new FormData();
    transformFiles.forEach(function (file) { return transformFormData.append(FILE, file, file.name); });
    return transformFormData;
}
function resolveRealUrl(urlOrSuffix) {
    if (["http", "blob", "data"].some(function (x) { return urlOrSuffix.startsWith(x); })) {
        return urlOrSuffix;
    }
    try {
        var suffix = extractIpfsSuffix(urlOrSuffix);
        return "".concat(IPFS_GATEWAY_URL, "/").concat(suffix);
    }
    catch (_) {
        return "".concat(IPFS_GATEWAY_URL, "/").concat(urlOrSuffix);
    }
}
function extractIpfsSuffix(str) {
    if (str.startsWith("ipfs://ipfs/")) {
        return str.substring("ipfs://ipfs/".length);
    }
    if (str.startsWith("ipfs:///ipfs/")) {
        return str.substring("ipfs:///ipfs/".length);
    }
    if (str.indexOf("/ipfs/") !== -1) {
        var offset = str.indexOf("/ipfs/");
        return str.substring(offset + "/ipfs/".length);
    }
    if (str.startsWith("ipfs://")) {
        return str.substring("ipfs://".length);
    }
    throw new Error("Cannot extract IPFS hash");
}
var createFilename = function (file) {
    var extension = mime_types_1.default.extension(file.type);
    if (!extension) {
        throw new Error("Can't determine file type");
    }
    var hash = (0, uuid_1.v4)();
    return "".concat(hash, ".").concat(extension);
};
function mapToCommonTokenContent(file) {
    if (!file.originalFile.type) {
        throw new Error("Unknown file type or your browser can't detect correct file type. Make sure your file have valid extension");
    }
    return {
        url: file.IPFSURL,
        mimeType: file.originalFile.type,
        fileSize: file.originalFile.size,
        fileName: file.originalFile.name,
    };
}
function createFile(blobs, mime, name) {
    return new File(blobs, name, {
        type: mime,
    });
}
function createJson(name, data) {
    return createFile([JSON.stringify(data)], "application/json", name);
}
