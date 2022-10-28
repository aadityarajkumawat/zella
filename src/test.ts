import { pipe } from 'fp-ts/lib/function'
import { chain, match, none, Option, some } from 'fp-ts/lib/Option'

const getInput = (str: string | null | undefined): Option<string> =>
    !!str ? some(str) : none

function validateInput(input: string): Option<string> {
    return !!input && input.includes(':') ? some(input) : none
}

function output(str: string | null | undefined) {
    return pipe(
        str,
        getInput,
        chain(validateInput),
        match(
            () => console.log('Invalid input'),
            (val) => console.log(`Valid input:\n${val}`),
        ),
    )
}

output('aditya:password')
