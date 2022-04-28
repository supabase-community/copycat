import { int, oneOf, join } from 'fictional'
import { firstName } from './firstName'
import { lastName } from './lastName'

import { Input } from './types'

const maker = join('', [
  firstName,
  oneOf(['_', '.']),
  lastName,
  int.options({
    min: 2,
    max: 999,
  }),
])

export const username = (input: Input): string => maker(input)
