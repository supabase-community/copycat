import { oneOf } from 'fictional'
import { fakerEN_US as faker } from '@faker-js/faker'

import { Input } from './types'

const shortCountryCodes = faker.definitions.location.country_code.map(
  // alpha2 is "FR where alpha3 is "FRA"
  (code) => code.alpha2
)

const maker = oneOf(shortCountryCodes)

export const countryCode = (input: Input): string => maker(input)
