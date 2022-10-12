import faker from '@faker-js/faker'
import { int } from 'fictional'
import { firstName } from './firstName'
import { join } from './join'
import { lastName } from './lastName'
import { oneOfString } from './oneOfString'
import { oneOf } from './primitives'

import { Input } from './types'

interface EmailOptions {
  limit?: number
}

export const email = (input: Input, options: EmailOptions = {}): string =>
  join(
    input,
    '',
    [
      firstName,
      oneOfString(['_', '.']),
      lastName,
      int.options({
        min: 2,
        max: 9999,
      }),
      '@',
      oneOf([
        join('', [
          oneOfString(faker.locales.en!.word!.adjective!, ''),
          '-',
          oneOfString(faker.locales.en!.word!.noun!, ''),
        ]),
        join('', [
          oneOfString(faker.locales.en!.word!.verb!, ''),
          oneOfString(faker.locales.en!.word!.noun!, ''),
        ]),
      ]),
      '.',
      oneOfString(faker.locales.en!.internet!.domain_suffix!),
    ],
    options
  )
