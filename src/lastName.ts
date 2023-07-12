import locales from './locales/en'
import { oneOfString } from './oneOfString'
import { word } from './primitives'

export const lastName = oneOfString(
  locales.name.last_name,
  word.options({ capitalize: true })
)
