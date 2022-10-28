import { none, Option, some } from 'fp-ts/lib/Option'
import { ReadonlyNonEmptyArray } from 'fp-ts/lib/ReadonlyNonEmptyArray'
import { split } from 'fp-ts/lib/string'
import fs from 'fs'
import { CLIPBOARD, SEPERATOR, ZELLA_FILE } from './constants'
import childProcess from 'child_process'

type RONEArray<T> = ReadonlyNonEmptyArray<T>
const getId = (entry: string) => split(SEPERATOR)(entry)[0]

export const IOOptions: { encoding: BufferEncoding } = {
    encoding: 'utf-8',
}
export function outSepetarorError() {
    console.log('Invalid identifier password combination, : not found')
}

export function appendToZellaFile(str: string) {
    fs.appendFileSync(ZELLA_FILE, str, IOOptions)
}

export function validateInput(input: string): Option<string> {
    return !!input && input.includes(':') ? some(input) : none
}

export function readZellaFile(): Option<string> {
    const content = fs.readFileSync(ZELLA_FILE, IOOptions)
    return !!content ? some(content) : none
}

export function getEntry(
    id: string,
): (entries: RONEArray<string>) => Option<string> {
    function worker(entries: RONEArray<string>) {
        const finder = (entry: string) => getId(entry) === id
        const entry = entries.find(finder)
        return !!entry ? some(entry) : none
    }

    return worker
}

export function copyText(str: string) {
    const copyArgs = ['--clipboard', '--input']
    childProcess.spawnSync(CLIPBOARD, copyArgs, { input: str })
}

export function pullPassword(str: string): Option<string> {
    return !!str ? some(split(SEPERATOR)(str)[1]) : none
}

export function resolveToIdentifiers(
    entries: RONEArray<string>,
): Array<string> {
    return entries.map((entry) => getId(entry))
}
