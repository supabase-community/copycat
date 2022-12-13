import { copycat } from '.'

const NUM_CHECKS = 10

export const LIMIT_TRANSFORMATION_NAMES = [
  'email',
  'username',
  'firstName',
  'lastName',
  'fullName',
] as const

const generateValues = (limit: number) => {
  const results = {}

  for (const name of LIMIT_TRANSFORMATION_NAMES) {
    let i = -1
    const fn = copycat[name]
    const transformationResults: unknown[] = []
    results[name] = transformationResults

    while (++i < NUM_CHECKS) {
      const result = fn(i, { limit })
      expect(result.length).toBeLessThanOrEqual(limit)
      transformationResults.push(result)
    }
  }

  return results
}

test('limit: medium', () => {
  expect(generateValues(25)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "N.Ha56747@yveil.info",
        "R.Sc61466@psip.org",
        "D.Me86827@o-lox.com",
        "K_Sm85265@c-app.biz",
        "B_Co69526@I-app.com",
        "D.Ma39863@Zframe.net",
        "N_Ho97668@o-tap.info",
        "S_Ba9289@h-nod.net",
        "D.Po22056@b-god.biz",
        "M_Ja12215@Wkebab.org",
      ],
      "firstName": Array [
        "Daphnee",
        "Reed",
        "Jon",
        "Curt",
        "Flavio",
        "Kitty",
        "Gladyce",
        "Elijah",
        "Fritz",
        "Margarete",
      ],
      "fullName": Array [
        "Modesto Bechtelar",
        "Alexandra Bruen",
        "Jeremy Deckow",
        "Gregg Beahan",
        "Silas Legros",
        "Kayleigh Hettinger",
        "Torrey Romaguera",
        "Margret O'Hara",
        "Joana Crona",
        "Russ Howell",
      ],
      "lastName": Array [
        "Buckridge",
        "Gerlach",
        "Orn",
        "DuBuque",
        "Dare",
        "Parker",
        "Simonis",
        "Vandervort",
        "Ziemann",
        "Smitham",
      ],
      "username": Array [
        "pine-frown56747",
        "gain-fence61466",
        "Orlo_Rau86827",
        "tan-sale85265",
        "past-pin69526",
        "ooze-sill39863",
        "wean.date97668",
        "Elva_Torp9289",
        "torn.flock22056",
        "Ben-Towne12215",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "N56@yo.soh",
        "R61@pc.nir",
        "D86@o.biz",
        "K85@c.biz",
        "B69@I.biz",
        "D39@ZF.kai",
        "N97@o.com",
        "S92@h.biz",
        "D22@b.biz",
        "M12@We.rah",
      ],
      "firstName": Array [
        "Chad",
        "Vergie",
        "Hilton",
        "Jody",
        "Marilie",
        "Sanford",
        "Schuyler",
        "Macy",
        "Katherine",
        "Layne",
      ],
      "fullName": Array [
        "Coy Bode",
        "Amy Kris",
        "Loy Von",
        "Abe Dare",
        "Lea Dare",
        "Sim Koss",
        "Lue Jast",
        "Nat Beer",
        "Ron Dach",
        "Oda Lind",
      ],
      "lastName": Array [
        "O'Conner",
        "Lowe",
        "Luettgen",
        "McGlynn",
        "Murphy",
        "Bechtelar",
        "Hand",
        "Lakin",
        "Hills",
        "Stamm",
      ],
      "username": Array [
        "G56747",
        "Q61466",
        "K_Ni86827",
        "l85265",
        "J69526",
        "x39863",
        "l97668",
        "V_Ko9289",
        "B22056",
        "K-Ta12215",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Natalia.Harris56747@understatedasterisk.info",
        "Ruthe.Schaden61466@idealisticpseudoscience.org",
        "Dorcas.Mertz86827@twist-brisket.com",
        "Kathlyn_Smith85265@spiteful-notebook.biz",
        "Bianka_Considine69526@impugn-torso.com",
        "Dixie.Mann39863@humblepantology.net",
        "Ned_Howell97668@cumbersome-floodplain.info",
        "Stone_Bahringer9289@trusty-scanner.net",
        "Dewitt.Pouros22056@instill-ear.biz",
        "Marcella_Jacobi12215@unpleasantadviser.org",
      ],
      "firstName": Array [
        "Daphnee",
        "Reed",
        "Jon",
        "Curt",
        "Flavio",
        "Kitty",
        "Gladyce",
        "Elijah",
        "Fritz",
        "Margarete",
      ],
      "fullName": Array [
        "Lane Bechtelar",
        "Nyah Bruen",
        "Jeanne Deckow",
        "Jaclyn Beahan",
        "Judson Legros",
        "Valentine Hettinger",
        "Marcelo Romaguera",
        "Mose O'Hara",
        "Kenna Crona",
        "Milford Howell",
      ],
      "lastName": Array [
        "Buckridge",
        "Gerlach",
        "Orn",
        "DuBuque",
        "Dare",
        "Parker",
        "Simonis",
        "Vandervort",
        "Ziemann",
        "Smitham",
      ],
      "username": Array [
        "cudgel-nougat56747",
        "ignite-contrail61466",
        "Cordell_O'Keefe86827",
        "muscle-mankind85265",
        "digital-fender69526",
        "mutter-advent39863",
        "disconcert.bestseller97668",
        "Max_Jerde9289",
        "playful.metric22056",
        "Elroy-Stracke12215",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "N@y.s",
        "R@p.n",
        "D@o.k",
        "K@c.s",
        "B@I.r",
        "D@Z.k",
        "N@o.r",
        "S@h.m",
        "D@b.n",
        "M@W.r",
      ],
      "firstName": Array [
        "Jany",
        "Kim",
        "Trey",
        "Myrl",
        "Alf",
        "Enos",
        "Kobe",
        "Ivah",
        "Nyah",
        "Toni",
      ],
      "fullName": Array [
        "V No",
        "K Ke",
        "M Ra",
        "K Hy",
        "N Hy",
        "N Mo",
        "K Ka",
        "M Ke",
        "M So",
        "R Ce",
      ],
      "lastName": Array [
        "Mann",
        "Bins",
        "Toy",
        "Kub",
        "Lang",
        "Kihn",
        "Conn",
        "Kub",
        "Mohr",
        "Bode",
      ],
      "username": Array [
        "G5674",
        "Q6146",
        "K8682",
        "l8526",
        "J6952",
        "x3986",
        "l9766",
        "V9289",
        "B2205",
        "K1221",
      ],
    }
  `)
})
