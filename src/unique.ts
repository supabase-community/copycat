import { Input, hash } from 'fictional'
import { getHashKey, setHashKey } from './hash'

export type Store<T> = {
  has(value: T): boolean
  add(value: T): void
}

export type UniqueOptions = {
  /**
   * The maximum number of attempts to generate a unique value.
   * If the maximum number of attempts is reached, the method will call attemptReached and return the last generated value.
   * @default 10
   */
  attempts?: number
  /**
   * A callback called when the maximum number of attempts is reached.
   * can be used to log the error in the console of throw an error.
   *
   * @example
   * ```ts
   * const attemptsReached = (input: Input) => {
   *  throw new Error(`copycat.unique: maximum number of attempts reached for input ${input}`)
   * }
   * copycat.unique(input, { attemptsReached })
   * ```
   */
  attemptsReached?: (input: Input) => void
}

/**
 * Will attempt to generate a unique value using the provided method.
 * It does so by deterministically changing the seed of generation between each attempt.
 * If the maximum number of attempts is reached, the method will call attemptsReached then return the last generated value.
 * @example
 * ```ts
 * const method = (seed: Input) => {
 *  return copycat.int(seed, {max: 1000})
 * }
 * const store = new Set<ReturnType<typeof method>>()
 * copycat.unique(input, method,  store, { attempts: 100 })
 * ```
 */
export const unique = <T>(
  input: Input,
  method: (input: Input) => T,
  store: Store<T>,
  options: UniqueOptions
): T => {
  const { attempts = 10 } = options
  const originalKey = getHashKey()
  let result: T = method(input)

  try {
    let attempt = 0
    let hashInput = hash(input)

    while (store.has(result) && attempt < attempts) {
      attempt++
      const newKey = hash(hashInput)
      // We change the hash key based on the last hash input to make sure that the next result is different.
      setHashKey(`${newKey}`)
      // Since we changed the hashKey via setHashKey the new input is different
      hashInput = hash(input)
      result = method(input)
    }

    if (attempt >= attempts) {
      options.attemptsReached?.(input)
    }
    store.add(result)
  } finally {
    setHashKey(originalKey)
  }
  return result
}
