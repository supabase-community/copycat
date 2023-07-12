import { oneOf } from 'fictional'
import locales from './locales/en'

import { Input } from './types'

const maker = oneOf(locales.address.country_code)

export const countryCode = (input: Input): string => maker(input)
