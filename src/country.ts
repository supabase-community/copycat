import { oneOf } from 'fictional'
import { fakerEN_US as faker } from '@faker-js/faker'

import { Input } from './types'

const maker = oneOf(faker.definitions.location.country as string[])

export const country = (input: Input): string => maker(input)
