import fictional from 'fictional'
import { Input } from './types'

export const int = fictional.int
export const bool = fictional.bool
export const float = fictional.float
export const dateString = fictional.dateString

export const char = fictional.char

export const word = fictional.word.options({ unicode: false })

export const words = fictional.words.options({
  minSyllables: 2,
  unicode: false,
})

export const sentence = fictional.sentence.options({ unicode: false })

export const paragraph = fictional.paragraph.options({ unicode: false })

export const oneOf = fictional.oneOf

export const hex = (input: Input) =>
  int(input, {
    min: 0,
    max: 15,
  }).toString(16)
