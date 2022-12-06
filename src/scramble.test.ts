import { copycat } from '.'

test('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"vff FQS qsz hnn tkupbcN"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"51 qop vytjofmj"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"ole@qpj.sre"`)
})

test('special chars', () => {
  expect(
    copycat.scramble('foo-bar_baz+quux@corge.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"sdcXbbzwzrt0boos@vvlwz.jpm"`)
})

test('numbers', () => {
  expect(copycat.scramble(999999999)).toMatchInlineSnapshot(`299349325`)
  expect(copycat.scramble(782364.902374)).toMatchInlineSnapshot(`736762.255151`)
})

test('dates', () => {
  expect(copycat.scramble(new Date(89723948723948))).toMatchInlineSnapshot(
    `6575-08-08T16:04:54.156Z`
  )
})

test('booleans', () => {
  expect(copycat.scramble(false)).toBe(false)
  expect(copycat.scramble(true)).toBe(true)
})

test('nulls', () => {
  expect(copycat.scramble(null)).toEqual(null)
})

test('nested values', () => {
  expect(
    copycat.scramble({
      a: [
        {
          b: 23,
          c: 'foo',
        },
      ],
    })
  ).toMatchInlineSnapshot(`
    Object {
      "a": Array [
        Object {
          "b": 54,
          "c": "air",
        },
      ],
    }
  `)
})

test('unsupported types', () => {
  expect(() => copycat.scramble(Symbol('🤘') as any)).toThrow(/symbol/)
})
