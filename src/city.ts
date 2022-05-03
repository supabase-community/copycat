import { oneOf } from 'fictional'
import faker from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.locales.en!.address!.city_name!)

export const city = (input: Input): string => maker(input)
