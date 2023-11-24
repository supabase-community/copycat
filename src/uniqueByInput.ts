import { Input } from 'fictional'
import { unique, type Store, type UniqueOptions } from './unique'

/**
 * Will attempt to generate a unique value using the provided method.
 * But it will preserve the duplicate if the input is already in the inputStore.
 * It does so by deterministically changing the seed of generation between each attempt.
 * If the maximum number of attempts is reached, the method will call attemptsReached then return the last generated value.
 * @example
 * ```ts
 * const method = (seed: Input) => {
 *  return copycat.int(seed, {max: 1000})
 * }
 * const resultStore = new Set<ReturnType<typeof method>>()
 * const inputStore = new Set<Input>()
 * copycat.unique(input, method, inputStore, resultStore, { attempts: 100 })
 * ```
 */
export const uniqueByInput = <T>(
  input: Input,
  method: (input: Input) => T,
  inputStore: Store<Input>,
  resultStore: Store<T>,
  options?: UniqueOptions
): T => {
  if (inputStore.has(input)) {
    return method(input)
  } else {
    inputStore.add(input)
    return unique(input, method, resultStore, options)
  }
}
