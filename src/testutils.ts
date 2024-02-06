import { Input } from './types'
import { copycat } from '.'
import { v4 as uuidv4 } from 'uuid'
import { inspect } from 'util'

const EXCLUDED_METHODS = new Set([
  'setHashKey',
  'generateHashKey',
  'unique',
  'uniqueByInput',
])

export const TRANSFORMATIONS: {
  [name: string]: (input: Input) => unknown
} = {
  ...Object.fromEntries(
    Object.keys(copycat)
      .filter((k) => !EXCLUDED_METHODS.has(k))
      .map((k) => [k, (copycat as Record<string, unknown>)[k]])
  ),
  ...{
    times: (input: Input) => copycat.times(input, [4, 5], copycat.word),
    oneOf: (input: Input) => copycat.oneOf(input, ['red', 'green', 'blue']),
    oneOfString: (input: Input) =>
      copycat.oneOfString(['red', 'green', 'blue'])(input),
    someOf: (input: Input) =>
      copycat.someOf(input, [1, 2], ['rock', 'paper', 'scissors']),
    scramble: (input: Input) => copycat.scramble(copycat.fullName(input)),
  },
}

export const NUM_CHECKS = +(process.env.COPYCAT_NUM_CHECKS || 50)

export const MIN_ENTROPY = 0.98

export const ENTROPY_DATA_SET_SIZE = 1000

export const checkEntropy = <Result>(
  makerFn: (input: Input) => Result,
  { minEntropy = MIN_ENTROPY, dataSetSize = ENTROPY_DATA_SET_SIZE } = {}
) => {
  const data = []
  let i = -1

  while (++i < dataSetSize) {
    data.push(makerFn(uuidv4()))
  }

  const entropy = measureEntropy(data)

  try {
    expect(entropy).toBeGreaterThan(minEntropy)
  } catch (e) {
    if (e instanceof Error) {
      e.message = [e.message, '', `Data: ${inspect(data)}`].join('\n')
    }

    throw e
  }
}

export const expectGeneratedValue = <Result>(
  expectFn: (result: Result) => unknown,
  makerFn: (input: Input) => Result
) => {
  let i = -1

  while (++i < NUM_CHECKS) {
    const input = uuidv4()
    const result = makerFn(input)
    try {
      expectFn(result)
    } catch (e) {
      if (e instanceof Error) {
        e.message = [
          e.message,
          '',
          `Input: ${input}`,
          `Output: ${inspect(result)}`,
        ].join('\n')
      }

      throw e
    }
  }
}

export const checkGeneratedValue = <Result>(
  predicateFn: (result: Result) => boolean,
  makerFn: (input: Input) => Result
) => {
  let i = -1

  while (++i < NUM_CHECKS) {
    const result = makerFn(i)
    try {
      expect(predicateFn(result)).toBe(true)
    } catch (e) {
      if (e instanceof Error) {
        e.message = [
          e.message,
          '',
          `Input: ${i}`,
          `Output: ${inspect(result)}`,
        ].join('\n')
      }

      throw e
    }
  }
}

export function measureEntropy<V>(data: V[]) {
  const counts = new Map()

  for (const value of data) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  const probabilities = [...counts.values()].map((count) => count / data.length)

  const entropy = probabilities.reduce(
    (sum, prob) => sum - prob * Math.log2(prob),
    0
  )

  const normalizedEntropy = entropy / Math.log2(data.length)

  return normalizedEntropy
}
