import { int, join, times } from 'fictional'
import { Input } from './types'

const maker = join('.', [
  times(
    4,
    int.options({
      min: 1,
      max: 255,
    })
  ),
])

export const ipv4 = (input: Input): string => maker(input)
