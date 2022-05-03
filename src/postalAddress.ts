import { int, join } from 'fictional'

import { Input } from './types'
import { streetAddress } from './streetAddress'
import { city } from './city'
import { country } from './country'

const zipCode = int.options({
  min: 1111,
  max: 9876,
})

const maker = join(', ', [streetAddress, join(' ', [city, zipCode]), country])

export const postalAddress = (input: Input): string => maker(input)
