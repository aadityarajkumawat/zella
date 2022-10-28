#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("fp-ts/Option");
const fs_1 = __importDefault(require("fs"));
const add_1 = require("./add");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Incomplete command');
    args[0] = 'exit';
}
else {
    if (args[0] === 'add' && !args[1].includes(constants_1.SEPERATOR)) {
        (0, helpers_1.outSepetarorError)();
        args[0] = 'exit';
    }
}
const command = args[0];
const file = fs_1.default.existsSync(constants_1.ZELLA_FILE);
if (!file) {
    fs_1.default.writeFileSync(constants_1.ZELLA_FILE, '');
}
function nthArg(index) {
    return args.length > index ? (0, Option_1.some)(args[index]) : Option_1.none;
}
switch (command) {
    case 'add':
        const idPass = nthArg(1);
        (0, add_1.add)(idPass);
        break;
    case 'get':
        const identifier = args[1];
        (0, add_1.get)(identifier);
        break;
    case 'search':
        const query = args[1];
        (0, add_1.search)(query);
        break;
    case 'exit':
        console.log(`Use --help for more information`);
        break;
    default:
        console.log('No command found');
}
//# sourceMappingURL=main.js.map