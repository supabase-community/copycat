import { copycat } from '.'

test.only('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"asl YWG bpn mjm vgtlqzP"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"16 tej vdrgdbdc"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"zdt@bbc.oet"`)
})

test('special chars', () => {
  expect(
    copycat.scramble('foo-bar_baz+quux@corge.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"upeGzlnWgkm+dytx@gikvr.nfa"`)
})

test('numbers', () => {
  expect(copycat.scramble(999999999)).toMatchInlineSnapshot(`633557189`)
  expect(copycat.scramble(782364.902374)).toMatchInlineSnapshot(`773673.271189`)
  expect(copycat.scramble(-12345.6789)).toMatchInlineSnapshot(`-69254.7142`)
})

test('dates', () => {
  expect(copycat.scramble(new Date(89723948723948))).toMatchInlineSnapshot(
    `2115-10-11T08:03:36.195Z`
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
          "b": 36,
          "c": "qkd",
        },
      ],
    }
  `)
})

test('unsupported types', () => {
  expect(() => copycat.scramble(Symbol('🤘') as any)).toThrow(/symbol/)
})
