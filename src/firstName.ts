import locales from './locales/en'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const firstName = oneOfString(
  locales.name.first_name,
  word.options({ capitalize: true })
)
