import { oneOf } from 'fictional'

import { Input } from './types'

import { userAgentData as data } from './userAgentData'
import { int, times } from './copycat'

const maker = oneOf(data)

export const userAgent = (input: Input): string => {
  const str = maker(input)
  const version = times(input, 3, int.options({ max: 9999 })).join('.')
  return str.replace(/\{\{version\}\}/g, version)
}
