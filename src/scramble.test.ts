import { copycat } from '.'

test('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"zyp AZH shy kyi ufjqeuj"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"39 yve himgsawv"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"utf@fcr.ozl"`)
})

test('special chars', () => {
  expect(
    copycat.scramble('foo-bar_baz+quux@corge.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"iex5duxUwom8ihuk@kcxbb.ppn"`)
})

test('numbers', () => {
  expect(copycat.scramble(999999999)).toMatchInlineSnapshot(`955796979`)
  expect(copycat.scramble(782364.902374)).toMatchInlineSnapshot(`696898.958526`)
})

test('dates', () => {
  expect(copycat.scramble(new Date(89723948723948))).toMatchInlineSnapshot(
    `7881-05-06T10:04:12.973Z`
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
          "b": 12,
          "c": "pqz",
        },
      ],
    }
  `)
})

test('unsupported types', () => {
  expect(() => copycat.scramble(Symbol('🤘') as any)).toThrow(/symbol/)
})
