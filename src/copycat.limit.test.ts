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
        "M_Yu55370@fgene.biz",
        "V.Vi21967@q-rap.info",
        "V_Ra85431@S-guy.org",
        "V.So17165@axhead.org",
        "K_Yu46526@cccake.org",
        "K.Mi84888@h-bee.com",
        "K.Ra65715@c-bow.info",
        "Y_So44969@R-pun.com",
        "Y_Ko37263@V-pop.com",
        "V_Yu5335@J-sir.org",
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
        "M55@fA.koy",
        "V21@q.net",
        "V85@S.net",
        "V17@yK.mik",
        "K46@PG.yuk",
        "K84@h.biz",
        "K65@c.biz",
        "Y44@R.biz",
        "Y37@V.net",
        "V53@J.com",
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
        "M@f.k",
        "V@q.m",
        "V@S.v",
        "V@y.m",
        "K@P.y",
        "K@h.y",
        "K@c.r",
        "Y@R.k",
        "Y@V.y",
        "V@J.s",
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
        "V Vi",
        "M Mi",
        "S So",
        "K So",
        "M Mi",
        "Y Ra",
        "K Ko",
        "M Mi",
        "Y So",
        "M Yu",
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
