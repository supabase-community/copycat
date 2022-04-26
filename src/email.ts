import faker from '@faker-js/faker'
import { int, oneOf, join } from 'fictional'
import { firstName } from './firstName'
import { lastName } from './lastName'

import { Input } from './types'

const maker = join('', [
  firstName,
  oneOf(['_', '.']),
  lastName,
  int.options({
    min: 2,
    max: 999
  }),
  '@',
  oneOf(faker.locales.en!.internet!.free_email!)
])

export const email = (input: Input): string => maker(input)