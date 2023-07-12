import { oneOf } from 'fictional'
import locales from './locales/en'

import { Input } from './types'

const maker = oneOf(locales.address.country)

export const country = (input: Input): string => maker(input)
