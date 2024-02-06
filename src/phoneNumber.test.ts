import { Input, copycat } from '.'
import { checkEntropy, expectGeneratedValue } from './testutils'

test('distributes uniformly', () => {
  checkEntropy((input: Input) => copycat.phoneNumber(input))

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      length: 9,
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      prefixes: ['9', '8', '7', '6'],
      length: 9,
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      length: { min: 2, max: 20 },
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      prefixes: ['9', '8', '7', '6'],
      length: { min: 2, max: 20 },
    })
  )
})

test('ensures number is within {min,max} length when prefix given', () => {
  const ranges = [
    [9, 9],
    [2, 3],
    [2, 20],
  ]

  for (const [min, max] of ranges) {
    expectGeneratedValue(
      (result: string) => {
        const len = result.length
        expect(len).toBeGreaterThanOrEqual(min)
        expect(len).toBeLessThanOrEqual(max)
      },
      (input) =>
        copycat.phoneNumber(input, {
          prefixes: ['9', '8', '7', '6'],
          length: { min, max },
        })
    )
  }
})

test('ensures number is within { min, max } length when no prefix given', () => {
  const ranges = [
    [9, 9],
    [2, 3],
    [2, 20],
  ]

  for (const [min, max] of ranges) {
    expectGeneratedValue(
      (result: string) => {
        const len = result.length
        expect(len).toBeGreaterThanOrEqual(min)
        expect(len).toBeLessThanOrEqual(max)
      },
      (input) =>
        copycat.phoneNumber(input, {
          length: { min, max },
        })
    )
  }
})

test('length as number', () => {
  expectGeneratedValue(
    (result: string) => {
      const len = result.length
      expect(len).toBe(4)
    },
    (input) =>
      copycat.phoneNumber(input, {
        length: 4,
      })
  )
})

test('length as { min, max }', () => {
  expectGeneratedValue(
    (result: string) => {
      const len = result.length
      expect(len).toBeGreaterThanOrEqual(2)
      expect(len).toBeLessThanOrEqual(20)
    },
    (input) =>
      copycat.phoneNumber(input, {
        length: { min: 2, max: 20 },
      })
  )
})
