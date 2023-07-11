import { oneOf } from 'fictional'
import { fakerEN_US as faker } from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.definitions.location.time_zone as string[])

export const timezone = (input: Input): string => maker(input)
