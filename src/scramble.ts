import { char, Input } from 'fictional'

interface ScrambleOptions {
  preserve?: string[]
}

const codeOf = (x: string) => x.charCodeAt(0)

const safeSpecialChars = '-_+'.split('').map(codeOf)

const safeAscii = char.inRanges([
  char.lower,
  char.upper,
  char.digit,
  ...safeSpecialChars.map((code): [number, number] => [code, code]),
])

const CHAR_RANGES_TO_MAKERS: [[number, number], (input: Input) => string][] = [
  [[codeOf('a'), codeOf('z')], char.lower],
  [[codeOf('A'), codeOf('Z')], char.upper],
  [[codeOf('0'), codeOf('9')], char.digit],
  [[0x20, 0x7e], safeAscii],
]

const FALLBACK_MAKER = char.inRanges([char.ascii, char.latin1])

export const scramble = (
  input: string,
  options: ScrambleOptions = {}
): string => {
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

  return result
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
