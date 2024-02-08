import { copycat } from '.'
import { expectGeneratedValue } from './testutils'

test('only picks choices within limit', () => {
  expectGeneratedValue(
    (result) => {
      expect(result).toEqual('short')
    },
    (input) =>
      copycat.oneOfString(input, ['short', 'loooooooong'], { limit: 6 })
  )
})

test('curries', () => {
  expectGeneratedValue(
    (result) => {
      expect(result).toEqual('short')
    },
    (input) =>
      copycat.oneOfString(['short', 'loooooooong'])(input, { limit: 6 })
  )
})

test('uses fallback when no values match limit', () => {
  expectGeneratedValue(
    (result) => {
      expect(result).toEqual('word')
    },
    (input) =>
      copycat.oneOfString(input, ['short', 'loooooooong'], {
        limit: 4,
        fallback: 'word',
      })
  )
})
