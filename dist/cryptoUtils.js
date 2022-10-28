"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoUtils = exports.CryptoUtils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("./constants");
function CryptoUtils() {
    const iv = crypto_1.default.randomBytes(16);
    function encryptString(str) {
        const cipher = crypto_1.default.createCipheriv('aes-256-ccm', constants_1.ENCRYPTION_KEY, iv);
        const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);
        console.log({
            iv: iv.toString('hex'),
            content: encrypted.toString('hex'),
        });
        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex'),
        };
    }
    return { encryptString };
}
exports.CryptoUtils = CryptoUtils;
exports.cryptoUtils = CryptoUtils();
//# sourceMappingURL=cryptoUtils.js.map