"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("fp-ts/lib/function");
const Option_1 = require("fp-ts/lib/Option");
const getInput = (str) => !!str ? (0, Option_1.some)(str) : Option_1.none;
function validateInput(input) {
    return !!input && input.includes(':') ? (0, Option_1.some)(input) : Option_1.none;
}
function output(str) {
    return (0, function_1.pipe)(str, getInput, (0, Option_1.chain)(validateInput), (0, Option_1.match)(() => console.log('Invalid input'), (val) => console.log(`Valid input:\n${val}`)));
}
output('aditya:password');
//# sourceMappingURL=test.js.map