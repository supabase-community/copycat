import { oneOf, join } from 'fictional'
import faker from '@faker-js/faker'

import { firstName } from './firstName'
import { lastName } from './lastName'

import { Input } from './types'

const maker = join(' ', [
  oneOf([firstName, lastName]),
  oneOf(faker.locales.en!.address!.street_suffix!),
])

export const streetName = (input: Input): string => maker(input)
