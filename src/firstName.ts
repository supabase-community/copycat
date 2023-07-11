import { fakerEN_US as faker } from '@faker-js/faker'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const firstName = oneOfString(
  faker.definitions.person.first_name as string[],
  word.options({ capitalize: true })
)
