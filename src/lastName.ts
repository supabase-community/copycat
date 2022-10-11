import faker from '@faker-js/faker'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const lastName = oneOfString(
  faker.locales.en!.name!.last_name!,
  word.options({ capitalize: true })
)
