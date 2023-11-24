import { copycat } from '.'
import { randomUUID } from 'crypto'

test('should be able to generate 5 unique numbers with low possibility space', () => {
  const collisionsStore = new Set()
  let numberOfCollisions = 0
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }
  const store = new Set<ReturnType<typeof method>>()
  const results: Array<number> = []
  for (let i = 0; i <= 5; i++) {
    const result = copycat.unique(i, method, store, {
      attempts: 100,
    })
    results.push(result)
    if (collisionsStore.has(result)) {
      numberOfCollisions++
    } else {
      collisionsStore.add(result)
    }
  }
  results.sort()
  // Without unique would be [1,1,1,2,2,4]
  expect(results).toEqual([0, 1, 2, 3, 4, 5])
  expect(numberOfCollisions).toBe(0)
})

test('should be able to generate 5 unique numbers with low possibility space based on random seed', () => {
  const collisionsStore = new Set()
  let numberOfCollisions = 0
  const store = new Set<ReturnType<typeof method>>()
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }
  const results: Array<number> = []
  for (let i = 0; i <= 5; i++) {
    const result = copycat.unique(randomUUID(), method, store, {
      attempts: 100,
    })
    results.push(result)
    if (collisionsStore.has(result)) {
      numberOfCollisions++
    } else {
      collisionsStore.add(result)
    }
  }
  results.sort()
  expect(results).toEqual([0, 1, 2, 3, 4, 5])
  expect(numberOfCollisions).toBe(0)
})

test('should work with scramble method', () => {
  const collisionsStore = new Set()
  let numberOfCollisions = 0
  const store = new Set<ReturnType<typeof method>>()
  const method = (seed): string => {
    return copycat.scramble(seed)
  }
  const results: Array<string> = []
  const textInputs = [
    'hello world',
    'hello world',
    'this is another test',
    'never gonna give you up',
    'never gonna let you down',
    'never gonna run around and desert you',
  ]
  for (let i = 0; i <= 5; i++) {
    const result = copycat.unique(textInputs[i], method, store, {
      attempts: 100,
    })
    results.push(result)
    if (collisionsStore.has(result)) {
      numberOfCollisions++
    } else {
      collisionsStore.add(result)
    }
  }
  // Without unique the two first results would be the same
  expect(results).toEqual([
    'zmnmq ngcsx',
    'zvzkv uviju',
    'wnzx dd tqjjomm jmnz',
    'ugwfa zugvm xhky hbn fo',
    'bxhyr wojeg cvi kcu untf',
    'daylm ztnpp enf clrzkb toe bjhgzu yfu',
  ])
  expect(numberOfCollisions).toBe(0)
})

test('should call attempsReached when no more attempts are available', () => {
  const store = new Set<ReturnType<typeof method>>()
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }
  let attemptReachedCalled = false
  for (let i = 0; i <= 5; i++) {
    copycat.unique(i, method, store, {
      attempts: 1,
      attemptsReached: () => {
        attemptReachedCalled = true
      },
    })
  }
  expect(attemptReachedCalled).toBe(true)
})

test('should restore the same hashKey when done', () => {
  const store = new Set<ReturnType<typeof method>>()
  const originalResult = copycat.int(1)
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }
  for (let i = 0; i <= 5; i++) {
    copycat.unique(i, method, store, {
      attempts: 100,
    })
  }
  // The hashKey should be restored to its original value
  // so that the next call to copycat.int(1) returns the same result
  // as if copycat.unique was never called.
  expect(copycat.int(1)).toBe(originalResult)
})

test('should rethrow too much attempts error', () => {
  const store = new Set<ReturnType<typeof method>>()
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }
  // Ensure the store is already full
  store.add(0)
  store.add(1)
  store.add(2)
  store.add(3)
  store.add(4)
  store.add(5)
  expect(() =>
    copycat.unique(1, method, store, {
      attempts: 1,
      attemptsReached: () => {
        throw new Error('Too much attempts')
      },
    })
  ).toThrowError('Too much attempts')
})

test('should not alter hash key if method throw an error', () => {
  const store = new Set<ReturnType<typeof method>>()
  const originalResult = copycat.int(1)
  const method = (): number => {
    throw new Error('Method error')
  }
  // Ensure the store is already full
  store.add(0)
  store.add(1)
  store.add(2)
  store.add(3)
  store.add(4)
  store.add(5)
  expect(() =>
    copycat.unique(1, method, store, {
      attempts: 1,
      attemptsReached: () => {
        throw new Error('Too much attempts')
      },
    })
  ).toThrowError('Method error')
  // The hashKey should be restored to its original value
  // so that the next call to copycat.int(1) returns the same result
  // as if copycat.unique was never called.
  expect(copycat.int(1)).toBe(originalResult)
})

test('should restore the same hashKey even if throwing error after too much attempts', () => {
  const store = new Set<ReturnType<typeof method>>()
  const originalResult = copycat.int(1)
  const method = (seed): number => {
    return copycat.int(seed, { min: 0, max: 5 })
  }

  // Ensure the store is already full
  store.add(0)
  store.add(1)
  store.add(2)
  store.add(3)
  store.add(4)
  store.add(5)
  expect(() =>
    copycat.unique(1, method, store, {
      attempts: 1,
      attemptsReached: () => {
        throw new Error('Too much attempts')
      },
    })
  ).toThrowError('Too much attempts')
  // The hashKey should be restored to its original value
  // so that the next call to copycat.int(1) returns the same result
  // as if copycat.unique was never called.
  expect(copycat.int(1)).toBe(originalResult)
})

test('should be able to generate 8999 unique fictional french phone numbers', () => {
  const collisionsStore = new Set()
  let numberOfCollisions = 0
  const method = (seed): string => {
    return copycat.phoneNumber(seed, {
      prefixes: ['+3319900'],
      min: 1000,
      max: 9999,
    })
  }
  const store = new Set<ReturnType<typeof method>>()
  const results: Array<string> = []
  for (let i = 0; i <= 8999; i++) {
    const result = copycat.unique(i, method, store, {
      // Bellow 2500 attempts, the test fails because of collisions
      attempts: 2500,
    })
    results.push(result)
    if (collisionsStore.has(result)) {
      numberOfCollisions++
    } else {
      collisionsStore.add(result)
    }
  }
  expect(numberOfCollisions).toBe(0)
})

test('should be able to generate 8999 unique fictional french phone numbers with uuid', () => {
  const collisionsStore = new Set()
  let numberOfCollisions = 0
  const method = (seed): string => {
    return copycat.phoneNumber(seed, {
      prefixes: ['+3319900'],
      min: 1000,
      max: 9999,
    })
  }
  const store = new Set<ReturnType<typeof method>>()
  const results: Array<string> = []
  for (let i = 0; i <= 8999; i++) {
    const result = copycat.unique(randomUUID(), method, store, {
      // Bellow 100k with random uuid there is still a 1/1000 chance of collision
      attempts: 100000,
    })
    results.push(result)
    if (collisionsStore.has(result)) {
      numberOfCollisions++
    } else {
      collisionsStore.add(result)
    }
  }
  expect(numberOfCollisions).toBe(0)
})
