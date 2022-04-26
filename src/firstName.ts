import { Input } from './types'
import faker from '@faker-js/faker'
import { oneOf } from 'fictional'

export const firstName = (input: Input): string => oneOf(input, faker.locales.en!.name!.first_name!)
