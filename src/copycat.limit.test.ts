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
        "Bo_King114@gmail.net",
        "Bo_Koch349@yahoo.net",
        "Bo_Ward471@yahoo.com",
        "Bo_Toy949@gmail.com",
        "Ed_Dare472@yahoo.com",
        "Bo_Wiza59@yahoo.info",
        "Bo_Toy189@gmail.info",
        "Bo_Von60@gmail.biz",
        "Ed_Kub941@gmail.org",
        "Ed_Cole773@yahoo.net",
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
        "VvK1@ko.yu",
        "MmK3@mi.ra",
        "SsK4@vi.vi",
        "KsY9@mi.so",
        "MmR4@yu.ko",
        "YrK5@yu.vi",
        "KkS1@ra.vi",
        "MmR6@ko.ra",
        "YsM9@yu.yu",
        "MyV7@so.yu",
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
        "Liliane_Powlowski114@gmail.net",
        "Emely_Buckridge349@yahoo.net",
        "Jeffry_Kshlerin471@yahoo.com",
        "Norbert_Funk949@gmail.com",
        "Lyda_Schowalter472@yahoo.com",
        "Kaylie_Yost59@yahoo.info",
        "Catherine_Schmitt189@gmail.info",
        "Elinore_Kshlerin60@gmail.biz",
        "Jace_Boehm941@gmail.org",
        "Howell_Bergnaum773@yahoo.net",
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
        "1@k.y",
        "3@m.r",
        "4@v.v",
        "9@m.s",
        "4@y.k",
        "5@y.v",
        "1@r.v",
        "6@k.r",
        "9@y.y",
        "7@s.y",
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
