import { oneOf, join } from 'fictional'
import { fakerEN_US as faker } from '@faker-js/faker'

import { firstName } from './firstName'
import { lastName } from './lastName'

import { Input } from './types'

const maker = join(' ', [
  oneOf([firstName, lastName]),
  oneOf(faker.definitions.location.city_name as string[]),
])

export const streetName = (input: Input): string => maker(input)
