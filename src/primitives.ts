import fictional from 'fictional'

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
