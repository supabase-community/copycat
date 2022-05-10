import { oneOf } from 'fictional'

import { Input } from './types'

const data: string[] = require('./userAgentData.json')

const maker = oneOf(data)

export const userAgent = (input: Input): string => maker(input)
