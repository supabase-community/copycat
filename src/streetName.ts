import { oneOf, join } from 'fictional'
import locales from './locales/en'

import { firstName } from './firstName'
import { lastName } from './lastName'

import { Input } from './types'

const maker = join(' ', [
  oneOf([firstName, lastName]),
  oneOf(locales.address.street_suffix),
])

export const streetName = (input: Input): string => maker(input)
