import { copycat } from '.'

test('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"nmu MIZ pvi cil mnmljaq"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"33 wiv wpgvcttu"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"mrv@cky.ayc"`)
})

test('special chars', () => {
  expect(
    copycat.scramble('foo-bar_baz+quux@corge.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"jguPbkr6rkhhgjcz@btowy.smz"`)
})

test('numbers', () => {
  expect(copycat.scramble(999999999)).toMatchInlineSnapshot(`682197452`)
  expect(copycat.scramble(782364.902374)).toMatchInlineSnapshot(`387998.531441`)
})

test('dates', () => {
  expect(copycat.scramble(new Date(89723948723948))).toMatchInlineSnapshot(
    `7754-02-02T15:03:19.862Z`
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
          "b": 19,
          "c": "ebp",
        },
      ],
    }
  `)
})

test('unsupported types', () => {
  expect(() => copycat.scramble(Symbol('🤘') as any)).toThrow(/symbol/)
})
