import faker from '@faker-js/faker'
import { oneOf } from 'fictional'

import { Input } from './types'

export const firstName = (input: Input): string =>
  oneOf(input, faker.locales.en!.name!.first_name!)
