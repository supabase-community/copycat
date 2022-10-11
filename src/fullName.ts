import { Input } from './types'
import { firstName } from './firstName'
import { lastName } from './lastName'
import { join } from './join'

export const fullName = (input: Input, options = {}): string =>
  join(input, ' ', [firstName, lastName], options)
