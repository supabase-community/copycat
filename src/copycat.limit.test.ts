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
        "R_Ki55370@fgene.biz",
        "H.Ce21967@q-rap.info",
        "K_Yo85431@S-guy.org",
        "Y.Mo17165@axhead.org",
        "C_No46526@cccake.org",
        "R.No84888@h-bee.com",
        "C.Va65715@c-bow.info",
        "M_Ki44969@R-pun.com",
        "K_Vi37263@V-pop.com",
        "K_Vi5335@J-sir.org",
      ],
      "firstName": Array [
        "Cindy",
        "Amara",
        "Zelma",
        "Glennie",
        "Kaley",
        "Betty",
        "Laurianne",
        "Horace",
        "Wilson",
        "Kamryn",
      ],
      "fullName": Array [
        "Myrl Heidenreich",
        "Ignacio Reinger",
        "Vesta Smith",
        "Ottis Stark",
        "Nolan Rutherford",
        "Ernesto Jacobs",
        "Eleanora Boyle",
        "Jaiden Muller",
        "Willow Osinski",
        "Jane Glover",
      ],
      "lastName": Array [
        "Nitzsche",
        "Ledner",
        "Jakubowski",
        "Boyle",
        "Emard",
        "Breitenberg",
        "Yundt",
        "Davis",
        "Zulauf",
        "Kuphal",
      ],
      "username": Array [
        "ugly_clasp55370",
        "flat-shift21967",
        "good_wit85431",
        "mild-derby17165",
        "find-mess46526",
        "vast_magic84888",
        "mad-bootee65715",
        "thin_dew44969",
        "find.moai37263",
        "damn-guava5335",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "R55@fA.mom",
        "H21@q.net",
        "K85@S.net",
        "Y17@yK.mom",
        "C46@PG.ken",
        "R84@h.biz",
        "C65@c.biz",
        "M44@R.biz",
        "K37@V.net",
        "K53@J.com",
      ],
      "firstName": Array [
        "Eryn",
        "Osborne",
        "Lamar",
        "Lance",
        "Frank",
        "Breanna",
        "Alden",
        "Stewart",
        "Rebeka",
        "Kira",
      ],
      "fullName": Array [
        "Bud Yost",
        "Ena Batz",
        "Ian Koch",
        "Tom Ward",
        "Tre Haag",
        "Roy Rowe",
        "Loy Conn",
        "Ima Ward",
        "Guy Lowe",
        "Rae Fay",
      ],
      "lastName": Array [
        "Abernathy",
        "Kris",
        "Wyman",
        "Kessler",
        "Braun",
        "Mante",
        "Hirthe",
        "Abbott",
        "Gerlach",
        "Dibbert",
      ],
      "username": Array [
        "B55370",
        "I21967",
        "J85431",
        "Y17165",
        "b46526",
        "r84888",
        "f65715",
        "b44969",
        "T37263",
        "C5335",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Ibrahim_Robel55370@flamboyantphenotype.biz",
        "Randal.Sipes21967@postpone-bloodflow.info",
        "Frank_Hahn85431@coach-competence.org",
        "Eugene.Kuvalis17165@joldisguise.org",
        "Scarlett_Farrell46526@eddyslapstick.org",
        "Lloyd.Koss84888@grateful-adobe.com",
        "Alford.Harber65715@dirty-catalyst.info",
        "Deven_Jakubowski44969@coat-caution.com",
        "Matilda_Buckridge37263@tidy-corn.com",
        "Cody_Murazik5335@expensive-wasp.org",
      ],
      "firstName": Array [
        "Cindy",
        "Amara",
        "Zelma",
        "Glennie",
        "Kaley",
        "Betty",
        "Laurianne",
        "Horace",
        "Wilson",
        "Kamryn",
      ],
      "fullName": Array [
        "Liliane Heidenreich",
        "Emely Reinger",
        "Jeffry Smith",
        "Norbert Stark",
        "Lyda Rutherford",
        "Kaylie Jacobs",
        "Catherine Boyle",
        "Elinore Muller",
        "Jace Osinski",
        "Howell Glover",
      ],
      "lastName": Array [
        "Nitzsche",
        "Ledner",
        "Jakubowski",
        "Boyle",
        "Emard",
        "Breitenberg",
        "Yundt",
        "Davis",
        "Zulauf",
        "Kuphal",
      ],
      "username": Array [
        "careless_scrutiny55370",
        "cluttered-executor21967",
        "grouchy_advantage85431",
        "nutty-elevator17165",
        "snipe-saffron46526",
        "fitting_young84888",
        "functional-thistle65715",
        "fussy_graphic44969",
        "denitrify.conduct37263",
        "embitter-shift5335",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "R@f.m",
        "H@q.h",
        "K@S.c",
        "Y@y.m",
        "C@P.k",
        "R@h.s",
        "C@c.c",
        "M@R.m",
        "K@V.y",
        "K@J.m",
      ],
      "firstName": Array [
        "Otto",
        "Nils",
        "Bria",
        "Jo",
        "Alec",
        "Kaci",
        "Adah",
        "Clay",
        "Nick",
        "Isac",
      ],
      "fullName": Array [
        "C Na",
        "H Mo",
        "M Mi",
        "Y Ch",
        "S Hy",
        "T Me",
        "H Ka",
        "C Ka",
        "H Mi",
        "N Sh",
      ],
      "lastName": Array [
        "Dare",
        "Rau",
        "Howe",
        "Kris",
        "King",
        "Cole",
        "Koss",
        "Howe",
        "Roob",
        "Roob",
      ],
      "username": Array [
        "B5537",
        "I2196",
        "J8543",
        "Y1716",
        "b4652",
        "r8488",
        "f6571",
        "b4496",
        "T3726",
        "C5335",
      ],
    }
  `)
})
