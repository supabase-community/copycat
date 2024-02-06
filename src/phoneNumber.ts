import { int, oneOf } from 'fictional'
import { Input } from './types'

const DEFAULT_MIN_LENGTH = 12
const DEFAULT_MAX_LENGTH = 16

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
   *   // A french phone number is 11 digits long (including the prefix) so there is no need to generate a number longer than 4 digits
   *   minLength: 4,
   *   maxLength: 4
   * })
   * ```
   * @example
   *
   * ```ts
   * phoneNumber(seed, {
   *   // Generate a New Jersey fictional phone number
   *   prefixes: ['+201555'],
   *   minLength: 4,
   *   maxLength: 4
   * })
   * ```
   * @default undefined
   */
  prefixes?: Array<string>
  /**
   * Constrain generated values have a length greater than or equal to `minLength`
   * @default maxLength ?? 12
   */
  minLength?: number
  /**
   * Constrain generated values to have a length less than or equal to `maxLength`
   * @default minLength ?? 16
   */
  maxLength?: number
}

export const phoneNumber = (input: Input, options: PhoneNumberOptions = {}) => {
  let prefix = '+'
  const minLength = options.minLength ?? options.maxLength ?? DEFAULT_MIN_LENGTH
  const maxLength = options.maxLength ?? options.minLength ?? DEFAULT_MAX_LENGTH

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
