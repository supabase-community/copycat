import { Input } from './types'
import faker from '@faker-js/faker'
import { oneOf } from 'fictional'

export const lastName = (input: Input): string =>
  oneOf(input, faker.locales.en!.name!.last_name!)
