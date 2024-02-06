import { Input, copycat } from '.'
import { checkEntropy, expectGeneratedValue } from './testutils'

test('distributes uniformly', () => {
  checkEntropy((input: Input) => copycat.phoneNumber(input))

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      minLength: 9,
      maxLength: 9,
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      prefixes: ['9', '8', '7', '6'],
      minLength: 9,
      maxLength: 9,
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      minLength: 2,
      maxLength: 20,
    })
  )

  checkEntropy((input: Input) =>
    copycat.phoneNumber(input, {
      prefixes: ['9', '8', '7', '6'],
      minLength: 2,
      maxLength: 20,
    })
  )
})

test('ensures number is within min/max even when prefix given', () => {
  const ranges = [
    [9, 9],
    [2, 3],
    [2, 20],
  ]

  for (const [minLength, maxLength] of ranges) {
    expectGeneratedValue(
      (result: string) => {
        const len = result.length
        expect(len).toBeGreaterThanOrEqual(minLength)
        expect(len).toBeLessThanOrEqual(maxLength)
      },
      (input) =>
        copycat.phoneNumber(input, {
          prefixes: ['9', '8', '7', '6'],
          minLength,
          maxLength,
        })
    )
  }
})

test('ensures number is within min/max even when no prefix given', () => {
  const ranges = [
    [9, 9],
    [2, 3],
    [2, 20],
  ]

  for (const [minLength, maxLength] of ranges) {
    expectGeneratedValue(
      (result: string) => {
        const len = result.length
        expect(len).toBeGreaterThanOrEqual(minLength)
        expect(len).toBeLessThanOrEqual(maxLength)
      },
      (input) =>
        copycat.phoneNumber(input, {
          minLength,
          maxLength,
        })
    )
  }
})
