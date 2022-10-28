import { pipe } from 'fp-ts/lib/function'
import { chain, map, match, Option } from 'fp-ts/lib/Option'
import { split } from 'fp-ts/lib/string'
import { NEW_LINE } from './constants'
import {
    appendToZellaFile,
    copyText,
    getEntry,
    pullPassword,
    readZellaFile,
    resolveToIdentifiers,
    validateInput,
} from './helpers'

export function add(idPass: Option<string>) {
    pipe(idPass, chain(validateInput), map(appendToZellaFile))
    console.log('Password successfully added to zella')
}

export function get(identifier: string) {
    pipe(
        readZellaFile(),
        map(split(NEW_LINE)),
        chain(getEntry(identifier)),
        chain(pullPassword),
        map(copyText),
        match(
            () => console.log('Invalid Identifier'),
            () => console.log('Password copied to clipboard!'),
        ),
    )
}

export function search(query: string) {
    const matcher = new RegExp(query, 'ig')

    const matchesQuery = (s: string) => matcher.test(s)
    const resolveMatches = (s: Array<string>) => s.filter(matchesQuery)

    pipe(
        readZellaFile(),
        map(split(NEW_LINE)),
        map(resolveToIdentifiers),
        map(resolveMatches),
        match(
            () => console.log('Unable to find matches!'),
            (results) => {
                console.log('Matches found:')
                results.map((res, i) => console.log(`${i + 1}.   ${res}`))
            },
        ),
    )
}
