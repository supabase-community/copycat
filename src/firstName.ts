import faker from '@faker-js/faker'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const firstName = oneOfString(
  faker.locales.en!.name!.first_name!,
  word.options({ capitalize: true })
)
