import { int, join } from 'fictional'

import { Input } from './types'
import { streetName } from './streetName'

const maker = join(' ', [
  int.options({
    min: 1,
    max: 999,
  }),
  streetName,
])

export const streetAddress = (input: Input): string => maker(input)
