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

const computeCharSet = (from: number, to: number) => {
  const values = expandRange(from, to).map((v) => fromCodePoint(v))
  return {
    values,
    set: new Set(values),
    from,
    to,
  }
}

const DIGITS = computeCharSet(0x30, 0x39)
const ASCII_LOWERS = computeCharSet(0x61, 0x7a)
const ASCII_UPPERS = computeCharSet(0x41, 0x5a)

const FALLBACK_CHARS = [
  ...DIGITS.values,
  ...ASCII_LOWERS.values,
  ...ASCII_UPPERS.values,
  ...'-_+'.split(''),
]

const determineCharSet = (char: string) => {
  const codePoint = char.codePointAt(0) as number

  if (DIGITS.from <= codePoint && codePoint <= DIGITS.to) {
    return DIGITS.values
  } else if (ASCII_LOWERS.from <= codePoint && codePoint <= ASCII_LOWERS.to) {
    return ASCII_LOWERS.values
  } else if (ASCII_UPPERS.from <= codePoint && codePoint <= ASCII_UPPERS.to) {
    return ASCII_UPPERS.values
  } else {
    return FALLBACK_CHARS
  }
}

const scrambleChar = (char: string, key: number) => {
  const charSetValues = determineCharSet(char)
  return charSetValues[key % charSetValues.length]
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
      key = hash.sequenceNext(key)
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
