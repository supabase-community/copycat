import { oneOf } from 'fictional'
import locales from './locales/en'

import { Input } from './types'

const maker = oneOf(locales.address.time_zone)

export const timezone = (input: Input): string => maker(input)
