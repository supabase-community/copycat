import { char, hash, Input, JSONPrimitive, PlainNested } from 'fictional'

interface ScrambleOptions {
  preserve?: string[]
  charMaps?: CharMapEntry[]
}

type ScrambleInput = PlainNested<Date | JSONPrimitive>

type CharMapEntry = [[number, number], (input: Input) => string]

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

export const scramble = <Value extends ScrambleInput>(
  input: Value,
  options?: ScrambleOptions
): Value => {
  if (input == null || typeof input === 'boolean') {
    return input
  }

  if (typeof input === 'string') {
    return scrambleString(input, options) as Value
  }

  if (typeof input === 'number') {
    return scrambleNumber(input, options) as Value
  }

  if (input instanceof Date) {
    return scrambleDate(input, options) as Value
  }

  if (Array.isArray(input)) {
    return input.map((value) => scramble(value, options)) as Value
  }

  if (typeof input === 'object') {
    return scrambleObject(input, options) as Value
  }

  const error = new TypeError(
    `copycat.scramble() received value of type ${typeof input}, this type cannot be scrambled`
  )

  error.name = 'ScrambleTypeError'

  throw error
}

const scrambleObject = <Value extends ScrambleInput>(
  input: { [k: string]: PlainNested<Value> },
  options?: ScrambleOptions
) => {
  const result: Partial<{ [k: string]: PlainNested<Value> }> = {}

  for (const k of Object.keys(input)) {
    result[k] = scramble(input[k], options)
  }

  return result
}

const scrambleString = (
  input: string,
  options: ScrambleOptions = {}
): string => {
  const { preserve = [' '] } = options
  const preserveSet = new Set(preserve)
  const charMaps = [...(options.charMaps ?? []), ...CHAR_RANGES_TO_MAKERS]
  const baseHash = hash(input)

  let result = ''
  let i = -1

  for (const char of input.split('')) {
    if (preserveSet.has(char)) {
      result += char
    } else {
      const maker = findMatchingMaker(char, charMaps)
      result += maker(baseHash + hash(++i) + hash(char))
    }
  }

  return result
}

const findMatchingMaker = (
  char: string,
  charMaps: CharMapEntry[]
): ((input: Input) => string) => {
  const code = char.charCodeAt(0)

  for (const [[start, end], maker] of charMaps) {
    if (start <= code && code <= end) {
      return maker
    }
  }

  return FALLBACK_MAKER
}

const digitRange = [codeOf('0'), codeOf('9')] as [number, number]
const nonZeroDigitRange = [codeOf('1'), codeOf('9')] as [number, number]

const scrambleDate = (input: Date, options?: ScrambleOptions): Date => {
  const year = scrambleNumber(input.getUTCFullYear(), options)
  const month = scrambleNumber(input.getUTCMonth(), options) % 12
  const day = (scrambleNumber(input.getUTCMonth(), options) % 27) + 1

  const hours = scrambleTimeSegment(input.getUTCHours())
  const mins = scrambleTimeSegment(input.getUTCMinutes())
  const seconds = scrambleTimeSegment(input.getUTCSeconds())

  const milliseconds = scrambleNumber(input.getUTCMilliseconds())

  return new Date(
    Date.UTC(year, month, day, hours, mins, seconds, milliseconds)
  )
}

const scrambleTimeSegment = (input: number) => scrambleNumber(input) % 60

const scrambleNumber = (input: number, options?: ScrambleOptions): number =>
  +scrambleString(input.toString(), {
    ...options,
    preserve: ['.'],
    charMaps: [[digitRange, char.inRanges([nonZeroDigitRange])]],
  })
