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
