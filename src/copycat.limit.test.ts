import { copycat } from '.'

const NUM_CHECKS = 10

export const TINY_LIMIT_TRANSFORMATION_NAMES = [
  'email',
  'username',
  'firstName',
  'lastName',
  'fullName',
] as const

const SMALL_LIMIT_TRANSFORMATION_NAMES = TINY_LIMIT_TRANSFORMATION_NAMES

export const LIMIT_TRANSFORMATION_NAMES = [
  ...SMALL_LIMIT_TRANSFORMATION_NAMES,
  'url',
] as const

const generateValues = (limit: number, names = LIMIT_TRANSFORMATION_NAMES) => {
  const results = {}

  for (const name of names) {
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
    {
      "email": [
        "G.To63293@uphate.net",
        "Z.Br73904@abagas.com",
        "K.Da99990@ab-ad.biz",
        "G_Wi69019@abawad.net",
        "H_Eb53764@abamop.biz",
        "E.Gr27385@abazoo.net",
        "B.O_60441@abawax.info",
        "B.Ob46318@beluck.net",
        "S_Ku42363@ab-ad.biz",
        "A.Na63344@bepet.com",
      ],
      "firstName": [
        "Domingo",
        "Paolo",
        "Jacques",
        "Reyna",
        "Jadon",
        "Baron",
        "Alvah",
        "Jerod",
        "Drake",
        "Ashley",
      ],
      "fullName": [
        "Johnathan Funk",
        "Miguel McDermott",
        "Carmela Spinka",
        "Terrance Bernier",
        "Anibal Langworth",
        "Vincenzo Jones",
        "Uriah Jakubowski",
        "Nayeli Hickle",
        "Emerson Bernier",
        "Shayne Konopelski",
      ],
      "lastName": [
        "Batz",
        "Stark",
        "Thompson",
        "Wilderman",
        "Schaefer",
        "Muller",
        "Crist",
        "Moen",
        "Goodwin",
        "Ruecker",
      ],
      "url": [
        "https://a-a.biz",
        "https://a-a.com",
        "https://abat.net",
        "https://a-a.biz",
        "https://abat.com",
        "https://abat.com",
        "https://a-a.info",
        "https://abat.biz",
        "https://a-a.com",
        "https://a-a.com",
      ],
      "username": [
        "rich.plan63293",
        "lamp.force73904",
        "Kane_Doyle99990",
        "Zoe_Walker69019",
        "damp-spit53764",
        "Jean.Hoppe27385",
        "Olga.Feest60441",
        "ache_form46318",
        "Lee_Wiza42363",
        "Sid-Kemmer63344",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10, SMALL_LIMIT_TRANSFORMATION_NAMES))
    .toMatchInlineSnapshot(`
    {
      "email": [
        "G63@aA.com",
        "Z73@aA.com",
        "K99@a.biz",
        "G69@aA.com",
        "H53@aA.com",
        "E27@aA.com",
        "B60@aA.com",
        "B46@aA.com",
        "S42@a.net",
        "A63@aA.com",
      ],
      "firstName": [
        "Horace",
        "Rosina",
        "Albin",
        "Tod",
        "Paul",
        "Cassandra",
        "Lura",
        "Johann",
        "Miles",
        "Alberto",
      ],
      "fullName": [
        "Joe Dach",
        "Eve Mohr",
        "Ole Conn",
        "Al Johns",
        "Dee King",
        "Ian Wiza",
        "Bo Walsh",
        "Jo Auer",
        "Mac Wiza",
        "Tom Rice",
      ],
      "lastName": [
        "Jaskolski",
        "Hermann",
        "Funk",
        "Lockman",
        "Jerde",
        "Stark",
        "Roberts",
        "VonRueden",
        "Lebsack",
        "Kerluke",
      ],
      "username": [
        "a.AT63293",
        "a.AT73904",
        "A_Ab99990",
        "A_Ab69019",
        "a-AT53764",
        "A.Ab27385",
        "A.Ab60441",
        "a_AT46318",
        "A_Ab42363",
        "A-Ab63344",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    {
      "email": [
        "Granville.Towne63293@asteriskracism.net",
        "Zachariah.Breitenberg73904@drearyvilla.com",
        "Kelsie.Dare99990@popular-pumpkinseed.biz",
        "Gilbert_Willms69019@passionatemedian.net",
        "Hunter_Ebert53764@heavenlycassava.biz",
        "Erick.Grant27385@motionlesslending.net",
        "Brett.O_Keefe60441@kindheartedgenerosity.info",
        "Buddy.Oberbrunner46318@spoilrum.net",
        "Sherwood_Kub42363@cavernous-pinto.biz",
        "Antonio.Nader63344@voidchecking.com",
      ],
      "firstName": [
        "Domingo",
        "Paolo",
        "Jacques",
        "Reyna",
        "Jadon",
        "Baron",
        "Alvah",
        "Jerod",
        "Drake",
        "Ashley",
      ],
      "fullName": [
        "Jon Funk",
        "Kaylee McDermott",
        "Gardner Spinka",
        "Lisa Bernier",
        "Shana Langworth",
        "Viola Jones",
        "Kole Jakubowski",
        "Laney Hickle",
        "Idella Bernier",
        "Ally Konopelski",
      ],
      "lastName": [
        "Batz",
        "Stark",
        "Thompson",
        "Wilderman",
        "Schaefer",
        "Muller",
        "Crist",
        "Moen",
        "Goodwin",
        "Ruecker",
      ],
      "url": [
        "https://airdrop-harald.biz",
        "https://commentate-toga.com",
        "https://untrueemerald.biz",
        "https://upright-reservoir.biz",
        "https://anxiouscastle.org",
        "https://shyweekender.biz",
        "https://decent-colonization.info",
        "https://perfectcap.org",
        "https://generate-supermarket.com",
        "https://peer-identification.com",
      ],
      "username": [
        "truthful.blackbird63293",
        "page.textual73904",
        "Sonia_Quitzon99990",
        "Webster_Towne69019",
        "unequaled-flipflops53764",
        "Aylin.Oberbrunner27385",
        "Florence.Kozey60441",
        "bully_emergency46318",
        "Cortez_Donnelly42363",
        "Stanton-Altenwerth63344",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5, TINY_LIMIT_TRANSFORMATION_NAMES))
    .toMatchInlineSnapshot(`
    {
      "email": [
        "G@a.c",
        "Z@a.c",
        "K@a.c",
        "G@a.c",
        "H@a.c",
        "E@a.c",
        "B@a.c",
        "B@a.c",
        "S@a.c",
        "A@a.c",
      ],
      "firstName": [
        "Jada",
        "Noel",
        "Kurt",
        "Doug",
        "Lou",
        "Marc",
        "Jean",
        "Asa",
        "Edna",
        "Lisa",
      ],
      "fullName": [
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
        "A Ab",
      ],
      "lastName": [
        "Fay",
        "Kihn",
        "Von",
        "Mraz",
        "Roob",
        "Kris",
        "Batz",
        "Cole",
        "West",
        "Ward",
      ],
      "username": [
        "a6329",
        "a7390",
        "A9999",
        "A6901",
        "a5376",
        "A2738",
        "A6044",
        "a4631",
        "A4236",
        "A6334",
      ],
    }
  `)
})
