import { join, times } from 'fictional'
import { Input } from './types'
import { hex } from './primitives'

const maker = join(':', [times(6, join('', [times(2, hex)]))])

export const mac = (input: Input): string => maker(input)
