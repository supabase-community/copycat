import { fakerEN_US as faker } from '@faker-js/faker'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const lastName = oneOfString(
  faker.definitions.person.last_name as string[],
  word.options({ capitalize: true })
)
