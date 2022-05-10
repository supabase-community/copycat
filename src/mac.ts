import { int, join, times } from 'fictional'
import { Input } from './types'

const hex = (input: Input) =>
  int(input, {
    min: 0,
    max: 15,
  }).toString(16)

const maker = join(':', [times(6, join('', [times(2, hex)]))])

export const mac = (input: Input): string => maker(input)
