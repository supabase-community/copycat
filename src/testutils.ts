import { Input } from './types'
import { copycat } from '.'

const EXCLUDED_METHODS = new Set(['setSalt'])

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
    scramble: (input: Input) => copycat.scramble(copycat.fullName(input)),
  },
}

export const NUM_CHECKS = +(process.env.COPYCAT_NUM_CHECKS || 50)

export const checkGeneratedValue = <Result>(
  predicateFn: (result: Result) => boolean,
  makerFn: (input: Input) => Result
) => {
  let i = -1

  while (++i < NUM_CHECKS) {
    expect(predicateFn(makerFn(i))).toBe(true)
  }
}
