import { copycat } from '.'

test('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"nld WEW srd yut dieaayJ"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"05 mss yolmkpey"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"lxo@aec.clq"`)
})

test('special chars', () => {
  expect(
    copycat.scramble('foo-bar_baz+quux@corge.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"dpcafddCrehDcpve@wjxph.wwl"`)
})

test('numbers', () => {
  expect(copycat.scramble(999999999)).toMatchInlineSnapshot(`798243158`)
  expect(copycat.scramble(782364.902374)).toMatchInlineSnapshot(`341449.559371`)
})

test('dates', () => {
  expect(copycat.scramble(new Date(89723948723948))).toMatchInlineSnapshot(
    `2827-08-10T03:05:44.745Z`
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
          "b": 44,
          "c": "bmk",
        },
      ],
    }
  `)
})

test('unsupported types', () => {
  expect(() => copycat.scramble(Symbol('🤘') as any)).toThrow(/symbol/)
})
