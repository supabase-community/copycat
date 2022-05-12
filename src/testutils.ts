import { Input } from './types'
import { copycat } from '.'
import { JSONSerializable } from 'fictional'

export const TRANSFORMATIONS: {
  [name: string]: (input: Input) => JSONSerializable
} = {
  ...copycat,
  ...{
    times: (input: Input) => copycat.times(input, [4, 5], copycat.word),
    oneOf: (input: Input) => copycat.oneOf(input, ['red', 'green', 'blue']),
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
