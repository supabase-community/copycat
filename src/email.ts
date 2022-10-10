import faker from '@faker-js/faker'
import { int } from 'fictional'
import { firstName } from './firstName'
import { join } from './join'
import { lastName } from './lastName'
import { oneOfString } from './oneOfString'

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
        max: 999,
      }),
      '@',
      oneOfString(['gmail', 'yahoo', 'hotmail']),
      '.',
      oneOfString(faker.locales.en!.internet!.domain_suffix!),
    ],
    options
  )
