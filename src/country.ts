import { oneOf } from 'fictional'
import faker from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.locales.en!.address!.country!)

export const country = (input: Input): string => maker(input)
