import { Input, JSONSerializable, oneOf } from 'fictional'
import { word } from './primitives'
import { Transform } from './types'

export interface OneOfOptions {
  limit?: number
}

const defaultFallback = word.options({ capitalize: false })

export const oneOfString = (
  rawChoices: string[],
  fallback: string | number | Transform = defaultFallback
) => {
  const sortedChoices = rawChoices.slice().sort(compareByLength)

  const oneOfStringFn = (input: Input, options: OneOfOptions = {}) => {
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
