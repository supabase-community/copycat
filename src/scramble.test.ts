import { copycat } from '.'

test('scrambling', () => {
  expect(copycat.scramble('the DOG ate the cheese!')).toMatchInlineSnapshot(
    `"xeh ABC agf mom usckyc'"`
  )

  expect(copycat.scramble('99 red balloons')).toMatchInlineSnapshot(
    `"53 byt idcouxvu"`
  )
})

test('preserving chars', () => {
  expect(
    copycat.scramble('foo@bar.org', { preserve: ['@', '.'] })
  ).toMatchInlineSnapshot(`"oxb@fmc.ahs"`)
})
