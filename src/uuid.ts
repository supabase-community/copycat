import { hash } from 'fictional'
import { v5 } from 'uuid'

import { Input } from './types'

const namespace = '88d68977-2334-4915-9174-097f18b3d990'

export const uuid = (input: Input): string =>
  v5(hash(input).toString(), namespace)
