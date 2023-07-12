import { oneOf } from 'fictional'
import locales from './locales/en'

import { Input } from './types'

const maker = oneOf(locales.address.state)

export const state = (input: Input): string => maker(input)
