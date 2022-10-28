"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveToIdentifiers = exports.pullPassword = exports.copyText = exports.getEntry = exports.readZellaFile = exports.validateInput = exports.appendToZellaFile = exports.outSepetarorError = exports.IOOptions = void 0;
const Option_1 = require("fp-ts/lib/Option");
const string_1 = require("fp-ts/lib/string");
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
const child_process_1 = __importDefault(require("child_process"));
const getId = (entry) => (0, string_1.split)(constants_1.SEPERATOR)(entry)[0];
exports.IOOptions = {
    encoding: 'utf-8',
};
function outSepetarorError() {
    console.log('Invalid identifier password combination, : not found');
}
exports.outSepetarorError = outSepetarorError;
function appendToZellaFile(str) {
    fs_1.default.appendFileSync(constants_1.ZELLA_FILE, str, exports.IOOptions);
}
exports.appendToZellaFile = appendToZellaFile;
function validateInput(input) {
    return !!input && input.includes(':') ? (0, Option_1.some)(input) : Option_1.none;
}
exports.validateInput = validateInput;
function readZellaFile() {
    const content = fs_1.default.readFileSync(constants_1.ZELLA_FILE, exports.IOOptions);
    return !!content ? (0, Option_1.some)(content) : Option_1.none;
}
exports.readZellaFile = readZellaFile;
function getEntry(id) {
    function worker(entries) {
        const finder = (entry) => getId(entry) === id;
        const entry = entries.find(finder);
        return !!entry ? (0, Option_1.some)(entry) : Option_1.none;
    }
    return worker;
}
exports.getEntry = getEntry;
function copyText(str) {
    const copyArgs = ['--clipboard', '--input'];
    child_process_1.default.spawnSync(constants_1.CLIPBOARD, copyArgs, { input: str });
}
exports.copyText = copyText;
function pullPassword(str) {
    return !!str ? (0, Option_1.some)((0, string_1.split)(constants_1.SEPERATOR)(str)[1]) : Option_1.none;
}
exports.pullPassword = pullPassword;
function resolveToIdentifiers(entries) {
    return entries.map((entry) => getId(entry));
}
exports.resolveToIdentifiers = resolveToIdentifiers;
//# sourceMappingURL=helpers.js.map