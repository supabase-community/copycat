import locales from './locales/en'
import { int, oneOf } from 'fictional'
import { despace } from './despace'
import { firstName } from './firstName'
import { join } from './join'
import { lastName } from './lastName'
import { oneOfString } from './oneOfString'
import { char } from './primitives'

import { Input } from './types'

interface UsernameOptions {
  limit?: number
}

const nameSegments = ['-', '.', '_']
  .map((joiner) => [
    join(joiner, [firstName, lastName]),
    join(joiner, [
      oneOfString(locales.word.adjective.map(despace), char.letter),
      oneOfString(locales.word.noun.map(despace), ''),
    ]),
    join(joiner, [
      oneOfString(locales.word.verb.map(despace), char.letter),
      oneOfString(locales.word.noun.map(despace), ''),
    ]),
  ])
  .flat()

export const username = (input: Input, options: UsernameOptions = {}): string =>
  join(
    input,
    '',
    [
      oneOf(nameSegments),
      int.options({
        min: 2,
        max: 99999,
      }),
    ],
    options
  )
