import {
  char,
  hash,
  Input,
  JSONPrimitive,
  PlainNested,
  expandRange,
  fromCodePoint,
} from 'fictional'
interface ScrambleOptions {
  preserve?: string[]
  charMaps?: CharMapEntry[]
}

type ScrambleInput = PlainNested<Date | JSONPrimitive>

type CharMapEntry = [[number, number], (input: Input) => string]

const codeOf = (x: string) => x.charCodeAt(0)

const safeSpecialChars = '-_+'.split('')
const digits: [number, number] = [0x30, 0x39]
const asciiLowers: [number, number] = [0x61, 0x7a]
const asciiUppers: [number, number] = [0x41, 0x5a]

const fallbackChars = [
  ...expandRange(...digits).map((v) => fromCodePoint(v)),
  ...expandRange(...asciiLowers).map((v) => fromCodePoint(v)),
  ...expandRange(...asciiUppers).map((v) => fromCodePoint(v)),
  ...safeSpecialChars,
]

const fallbackCharsLen = fallbackChars.length

const determineCharRange = (codePoint: number) => {
  if (digits[0] <= codePoint && codePoint <= digits[1]) {
    return digits
  } else if (asciiLowers[0] <= codePoint && codePoint <= asciiLowers[1]) {
    return asciiLowers
  } else if (asciiUppers[0] <= codePoint && codePoint <= asciiUppers[1]) {
    return asciiUppers
  } else {
    return null
  }
}

const scrambleChar = (char: string, offset: number) => {
  const sourceCodePoint = char.charCodeAt(0)
  const range = determineCharRange(sourceCodePoint)
  const rotatedCodePoint = sourceCodePoint + offset

  let resultCodePoint

  if (range !== null) {
    const [min, max] = range
    resultCodePoint = (rotatedCodePoint % (max + 1 - min)) + min
    return fromCodePoint(resultCodePoint)
  } else {
    return fallbackChars[rotatedCodePoint % fallbackCharsLen]
  }
}

const xorshift32 = (a: number) => {
  a ^= a << 13
  a ^= a >>> 17
  a ^= a << 5
  return a >>> 0
}

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

  let result = ''
  let i = -1
  const n = input.length
  let key = hash(input)

  while (++i < n) {
    const char = input[i]

    if (preserveSet.has(char)) {
      result += char
    } else {
      key = xorshift32(key + i)
      result += scrambleChar(char, key)
    }
  }

  return result
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
    preserve: ['.', '-'],
    charMaps: [[digitRange, char.inRanges([nonZeroDigitRange])]],
  })
