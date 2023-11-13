import { int } from 'fictional'

export const phoneNumber = (input: string) =>
  `+${int(input, { min: 10000000000, max: 999999999999999 })}`
