import { copycat } from '.'

const NUM_CHECKS = 10

export const LIMIT_TRANSFORMATION_NAMES = [
  'email',
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
        "Bo_King2572@-coke.net",
        "Bo_Koch155@gofen.net",
        "Bo_Ward9817@gosow.com",
        "Bo_Toy7503@-tram.com",
        "Ed_Dare5256@axwar.com",
        "Bo_Wiza1859@goape.info",
        "Bo_Toy207@-mill.info",
        "Bo_Von6128@-lava.biz",
        "Ed_Kub4243@-jot.org",
        "Ed_Cole7465@gowad.net",
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
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "VvK2@-.yus",
        "MmK1@.com",
        "SsK9@.com",
        "KsY7@-.sov",
        "MmR5@.com",
        "YrK1@.net",
        "KkS2@-.vik",
        "MmR6@-.rav",
        "YsM4@-.yur",
        "MyV7@.com",
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
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Liliane_Powlowski2572@frilly-hiking.net",
        "Emely_Buckridge155@messagepentagon.net",
        "Jeffry_Kshlerin9817@inveigletap.com",
        "Norbert_Funk7503@lopsided-cane.com",
        "Lyda_Schowalter5256@stingentry.com",
        "Kaylie_Yost1859@finessemoody.info",
        "Catherine_Schmitt207@favorable-sprag.info",
        "Elinore_Kshlerin6128@artistic-shakedown.biz",
        "Jace_Boehm4243@deserted-battleship.org",
        "Howell_Bergnaum7465@jogglepersonality.net",
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
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "2@-.y",
        "1@.ra",
        "9@.vi",
        "7@-.s",
        "5@.ko",
        "1@.vi",
        "2@-.v",
        "6@-.r",
        "4@-.y",
        "7@.yu",
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
    }
  `)
})
