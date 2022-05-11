import { oneOf } from 'fictional'

import { Input } from './types'

import { userAgentData as data } from './userAgentData'

const maker = oneOf(data)

export const userAgent = (input: Input): string => maker(input)
