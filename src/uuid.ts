import { int, join, times } from 'fictional'

import { Input } from './types'

const makeHexInt = int.options({ min: 0, max: 15 })
const makeX = (input: Input) => makeHexInt(input).toString(16)
const makeY = (input: Input) => ((makeHexInt(input) & 0x3) | 0x8).toString(16)

// context(justinvdm, 28 Apr 2022): Shamelessly adapted from faker:
// https://github.com/faker-js/faker/blob/98b6289bb94fee4cba9e5e605ea76e55a1d63128/src/datatype.ts#L157-L171
const makeUuid = join('', [
  times(8, makeX),
  '-',
  times(4, makeX),
  '-',
  '4',
  times(3, makeX),
  '-',
  makeY,
  times(3, makeX),
  '-',
  times(12, makeX),
])

export const uuid = (input: string): string => makeUuid(input)
