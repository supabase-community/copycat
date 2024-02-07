import { int, oneOf } from 'fictional'
import { Input } from './types'

type PhoneNumberOptions = {
  /**
   * An array of prefixes to use when generating a phone number.
   * Can be used to generate a fictional phone number instead of a random one.
   * Using fictional phone numbers might make the generation slower. And might increase likelihood of collisions.
   * @example
   * ```ts
   * phoneNumber(seed, {
   *   // Generate a French phone number within fictional phone number delimited range (cf: https://en.wikipedia.org/wiki/Fictitious_telephone_number)
   *   prefixes: ['+3319900', '+3326191', '+3335301'],
   *   // A french phone number is 11 digits long (including the prefix)
   *   length: 11,
   * })
   * ```
   * @example
   *
   * ```ts
   * phoneNumber(seed, {
   *   // Generate a New Jersey fictional phone number
   *   prefixes: ['+201555'],
   *   length: 4,
   * })
   * ```
   * @default undefined
   */
  prefixes?: Array<string>
  /**
   * Constrain generated values to the given length
   * @default { min: 12, max: 16 }
   */
  length?: { min: number; max: number } | number
}

export const phoneNumber = (input: Input, options: PhoneNumberOptions = {}) => {
  let prefix = '+'
  const { length = { min: 12, max: 16 } } = options
  const minLength = typeof length === 'number' ? length : length.min
  const maxLength = typeof length === 'number' ? length : length.max

  if (options.prefixes) {
    prefix =
      options.prefixes.length > 1
        ? // If multiple prefixes are provided, pick one deterministically
          oneOf(input, options.prefixes)
        : options.prefixes[0]
  }

  const min = 10 ** (minLength - prefix.length - 1)
  const max = 10 ** (maxLength - prefix.length) - 1

  return `${prefix}${int(input, { min, max })}`
}
