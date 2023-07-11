import { oneOf } from 'fictional'
import { fakerEN_US as faker } from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.definitions.location.city_name as string[])

export const city = (input: Input): string => maker(input)
