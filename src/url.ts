import { join } from './join'
import { Input } from './types'
import { char, oneOf } from './primitives'
import locales from './locales/en'
import { oneOfString } from './oneOfString'
import { slugify } from './slugify'

interface UrlOptions {
  limit?: number
}

const domainNameSegments = ['', '-']
  .map((joiner: string) => [
    join(joiner, [
      oneOfString(locales.word.adjective.map(slugify), char.lower),
      oneOfString(locales.word.noun.map(slugify), char.lower),
    ]),
    join(joiner, [
      oneOfString(locales.word.verb.map(slugify), char.lower),
      oneOfString(locales.word.noun.map(slugify), char.lower),
    ]),
  ])
  .flat()

export const url = (input: Input, options: UrlOptions = {}): string =>
  join(
    input,
    '',
    [
      'https://',
      oneOf(domainNameSegments),
      '.',
      oneOfString(locales.internet.domain_suffix),
    ],
    {
      ...options,
      ...(options.limit
        ? { limit: Math.max(options.limit - 'https://'.length, 0) }
        : {}),
    }
  )
