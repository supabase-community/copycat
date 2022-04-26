import { Input } from './types'

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
