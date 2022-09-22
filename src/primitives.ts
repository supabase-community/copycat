import fictional from 'fictional'
import { Input } from './types'

export const int = fictional.int.options({
  min: 0,
  max: Number.MAX_SAFE_INTEGER
})

export const float = fictional.float.options({
  min: 0,
  max: Number.MAX_SAFE_INTEGER
})

export const bool = fictional.bool

export const dateString = fictional.dateString

export const char = fictional.char

export const digit = fictional.char.digit

export const word = fictional.word.options({ unicode: false })

export const words = fictional.words.options({
  minSyllables: 2,
  unicode: false,
})

export const sentence = fictional.sentence.options({ unicode: false })

export const paragraph = fictional.paragraph.options({ unicode: false })

export const oneOf = fictional.oneOf

export const times = fictional.times

export const hex = (input: Input) =>
  int(input, {
    min: 0,
    max: 15,
  }).toString(16)
