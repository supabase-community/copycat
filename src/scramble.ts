import { char, Input } from 'fictional'

interface ScrambleOptions {
  preserve?: string[]
}

const codeOf = (x: string) => x.charCodeAt(0)

const CHAR_RANGES_TO_MAKERS: [[number, number], (input: Input) => string][] = [
  [[codeOf('a'), codeOf('z')], char.lower],
  [[codeOf('A'), codeOf('Z')], char.upper],
  [[codeOf('0'), codeOf('9')], char.digit],
  [[0x20, 0x7e], char.ascii],
]

const FALLBACK_MAKER = char.inRanges([char.ascii, char.latin1])

export const scramble = <Input extends string | null>(
  input: Input,
  options: ScrambleOptions = {}
): Input => {
  if (typeof input !== 'string') {
    return input
  }

  const { preserve = [' '] } = options
  const preserveSet = new Set(preserve)

  let i = -1
  let result = ''

  for (const char of input.split('')) {
    ++i

    if (preserveSet.has(char)) {
      result += char
    } else {
      const maker = findMatchingMaker(char)
      result += maker([input, i])
    }
  }

  return result as Input
}

const findMatchingMaker = (char: string): ((input: Input) => string) => {
  const code = char.charCodeAt(0)

  for (const [[start, end], maker] of CHAR_RANGES_TO_MAKERS) {
    if (start <= code && code <= end) {
      return maker
    }
  }

  return FALLBACK_MAKER
}
