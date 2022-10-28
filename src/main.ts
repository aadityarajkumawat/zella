#! /usr/bin/env node
import { pipe } from 'fp-ts/function'
import { getOrElse, getOrElseW, match, none, Option, some } from 'fp-ts/Option'
import fs from 'fs'
import { add, get, search } from './add'
import { SEPERATOR, ZELLA_FILE } from './constants'
import { outSepetarorError } from './helpers'

const args = process.argv.slice(2)

if (args.length < 2) {
    console.log('Incomplete command')
    args[0] = 'exit'
} else {
    if (args[0] === 'add' && !args[1].includes(SEPERATOR)) {
        outSepetarorError()
        args[0] = 'exit'
    }
}

const command = args[0]

// check if ZELLA_FILE exists
const file = fs.existsSync(ZELLA_FILE)
if (!file) {
    fs.writeFileSync(ZELLA_FILE, '')
}

function nthArg(index: number): Option<string> {
    return args.length > index ? some(args[index]) : none
}

switch (command) {
    case 'add':
        const idPass = nthArg(1)
        add(idPass)
        break
    case 'get':
        const identifier = args[1]
        get(identifier)
        break
    case 'search':
        const query = args[1]
        search(query)
        break
    case 'exit':
        console.log(`Use --help for more information`)
        break
    default:
        console.log('No command found')
}
