"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.get = exports.add = void 0;
const function_1 = require("fp-ts/lib/function");
const Option_1 = require("fp-ts/lib/Option");
const string_1 = require("fp-ts/lib/string");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
function add(idPass) {
    (0, function_1.pipe)(idPass, (0, Option_1.chain)(helpers_1.validateInput), (0, Option_1.map)(helpers_1.appendToZellaFile));
    console.log('Password successfully added to zella');
}
exports.add = add;
function get(identifier) {
    (0, function_1.pipe)((0, helpers_1.readZellaFile)(), (0, Option_1.map)((0, string_1.split)(constants_1.NEW_LINE)), (0, Option_1.chain)((0, helpers_1.getEntry)(identifier)), (0, Option_1.chain)(helpers_1.pullPassword), (0, Option_1.map)(helpers_1.copyText), (0, Option_1.match)(() => console.log('Invalid Identifier'), () => console.log('Password copied to clipboard!')));
}
exports.get = get;
function search(query) {
    const matcher = new RegExp(query, 'ig');
    const matchesQuery = (s) => matcher.test(s);
    const resolveMatches = (s) => s.filter(matchesQuery);
    (0, function_1.pipe)((0, helpers_1.readZellaFile)(), (0, Option_1.map)((0, string_1.split)(constants_1.NEW_LINE)), (0, Option_1.map)(helpers_1.resolveToIdentifiers), (0, Option_1.map)(resolveMatches), (0, Option_1.match)(() => console.log('Unable to find matches!'), (results) => {
        console.log('Matches found:');
        results.map((res, i) => console.log(`${i + 1}.   ${res}`));
    }));
}
exports.search = search;
//# sourceMappingURL=add.js.map