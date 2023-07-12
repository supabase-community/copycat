import { oneOf } from 'fictional'
import locales from './locales/en'

import { Input } from './types'

const maker = oneOf(locales.address.city_name)

export const city = (input: Input): string => maker(input)
