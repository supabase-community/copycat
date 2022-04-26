import { join } from 'fictional'

import { Input } from "./types"
import { firstName } from "./firstName"
import { lastName } from "./lastName"

export const fullName = (input: Input): string => join(input, ' ', [firstName, lastName])
