import { oneOf } from 'fictional'
import faker from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.locales.en!.address!.time_zone!)

export const timezone = (input: Input): string => maker(input)
