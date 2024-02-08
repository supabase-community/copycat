import { Input, JSONSerializable, oneOf } from 'fictional'
import { word } from './primitives'
import { Transform } from './types'

type Fallback = string | Transform

export interface OneOfStringOptions {
  limit?: number
  fallback?: Fallback
}

export interface OneOfString {
  (choices: string[], fallback?: Fallback): (
    input: Input,
    options?: OneOfStringOptions
  ) => string
  (input: Input, choices: string[], options?: OneOfStringOptions): string
}

export const oneOfString: OneOfString = (...args: unknown[]) => {
  if (Array.isArray(args[1])) {
    const input = args[0] as Input
    const choices = args[1] as string[]
    const options = args[2] as OneOfStringOptions | undefined

    if (options?.limit == null) {
      return oneOf(input, choices)
    } else {
      return oneOfStringImplementation(choices)(input, options)
    }
  } else {
    const choices = args[0] as string[]
    const fallback = args[0] as string[]
    return oneOfStringImplementation(choices, fallback)
  }
}

const defaultFallback = word.options({ capitalize: false })

const oneOfStringImplementation = (
  rawChoices: string[],
  curriedFallback?: Fallback
) => {
  const sortedChoices = rawChoices.slice().sort(compareByLength)

  const oneOfStringFn = (input: Input, options: OneOfStringOptions = {}) => {
    const fallback: string | Transform =
      options.fallback ?? curriedFallback ?? defaultFallback
    const { limit } = options

    if (limit == null) {
      return oneOf(input, rawChoices)
    }

    const choices = constrainChoices(sortedChoices, limit)

    if (choices.length === 0) {
      const fallbackResult =
        typeof fallback !== 'function'
          ? fallback
          : fallback([input, 'copycat:oneOfString'] as JSONSerializable)

      return fallbackResult.toString().slice(0, limit)
    }

    return oneOf(input, choices)
  }

  return oneOfStringFn
}

const constrainChoices = (sortedChoices: string[], limit: number) => {
  let l = 0
  let r = sortedChoices.length - 1
  let m = 0

  while (l <= r) {
    m = Math.floor((l + r) / 2)
    const choiceLen = sortedChoices[m].length

    if (choiceLen < limit) {
      l = m + 1
    } else {
      r = m - 1
    }
  }

  return sortedChoices.slice(0, m)
}

const compareByLength = (a: string, b: string): number => a.length - b.length
