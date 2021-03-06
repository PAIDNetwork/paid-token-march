"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashBytecodeWithoutMetadata = exports.hashBytecode = exports.getVersion = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const cbor_1 = __importDefault(require("cbor"));
function getVersion(bytecode, linkedBytecode) {
    if (bytecode !== '') {
        return {
            withMetadata: hashBytecode(bytecode),
            withoutMetadata: hashBytecodeWithoutMetadata(bytecode),
            linkedWithoutMetadata: hashBytecodeWithoutMetadata(linkedBytecode !== null && linkedBytecode !== void 0 ? linkedBytecode : bytecode),
        };
    }
    else {
        throw new Error('Abstract contract not allowed here');
    }
}
exports.getVersion = getVersion;
function hashBytecode(bytecode) {
    const buf = Buffer.from(bytecode.replace(/^0x/, ''), 'hex');
    return ethereumjs_util_1.keccak256(buf).toString('hex');
}
exports.hashBytecode = hashBytecode;
function hashBytecodeWithoutMetadata(bytecode) {
    return hashBytecode(trimBytecodeMetadata(bytecode));
}
exports.hashBytecodeWithoutMetadata = hashBytecodeWithoutMetadata;
function trimBytecodeMetadata(bytecode) {
    // Bail on empty bytecode
    if (bytecode.length <= 4) {
        return bytecode;
    }
    // Gather length of CBOR metadata from the end of the file
    const rawLength = bytecode.slice(bytecode.length - 4);
    const metadataLength = parseInt(rawLength, 16) * 2;
    // Bail on unreasonable values for length
    if (metadataLength > bytecode.length - 4) {
        return bytecode;
    }
    // Gather what we assume is the CBOR encoded metadata, and try to parse it
    const metadataStart = bytecode.length - metadataLength - 4;
    const metadata = bytecode.slice(metadataStart, bytecode.length - 4);
    // Parse it to see if it is indeed valid metadata
    try {
        cbor_1.default.decode(Buffer.from(metadata, 'hex'));
    }
    catch (err) {
        // to do: log lack metadata to the user
        return bytecode;
    }
    // Return bytecode without it
    return bytecode.slice(0, metadataStart);
}
//# sourceMappingURL=version.js.map