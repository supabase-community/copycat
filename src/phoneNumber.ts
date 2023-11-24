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
   *   // A french phone number is 11 digits long (including the prefix) so there is no need to generate a number longer than 4 digits
   *   min: 1000, max: 9999
   * })
   * ```
   * @example
   *
   * ```ts
   * phoneNumber(seed, {
   *   // Generate a New Jersey fictional phone number
   *   prefixes: ['+201555'],
   *   min: 1000, max: 9999
   * })
   * ```
   * @default undefined
   */
  prefixes?: Array<string>
  /**
   * The minimum number to generate.
   * @default 10000000000
   */
  min?: number
  /**
   * The maximum number to generate.
   * @default 999999999999999
   */
  max?: number
}

export const phoneNumber = (
  input: Input,
  options: PhoneNumberOptions = { min: 10000000000, max: 999999999999999 }
) => {
  // Use provided min and max, or default values if not provided
  const min = options.min ?? 10000000000
  const max = options.max ?? 999999999999999

  if (options.prefixes) {
    const prefix =
      options.prefixes.length > 1
        ? // If multiple prefixes are provided, pick one deterministically
          oneOf(input, options.prefixes)
        : options.prefixes[0]
    const prefixLength = prefix.length

    // Adjust min and max based on prefix length to keep a valid number of digits in the phone number
    const adjustedMin = Math.max(min, 10 ** (10 - prefixLength))
    const adjustedMax = Math.min(max, 10 ** (15 - prefixLength) - 1)
    return `${prefix}${int(input, {
      min: adjustedMin,
      max: adjustedMax,
    })}`
  }

  return `+${int(input, { min, max })}`
}
