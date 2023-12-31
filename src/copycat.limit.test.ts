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
    Object {
      "email": Array [
        "G.To63293@uphate.net",
        "Z.Br73904@Binlay.com",
        "K.Da99990@M-rap.biz",
        "G_Wi69019@Narmor.net",
        "H_Eb53764@Fenvy.biz",
        "E.Gr27385@Rperp.net",
        "B.O_60441@hapse.info",
        "B.Ob46318@beluck.net",
        "S_Ku42363@k-ad.biz",
        "A.Na63344@bepet.com",
      ],
      "firstName": Array [
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
      "fullName": Array [
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
      "lastName": Array [
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
      "url": Array [
        "https://v-n.biz",
        "https://z-b.com",
        "https://mid.biz",
        "https://w-y.biz",
        "https://ttv.org",
        "https://zcd.biz",
        "https://x-z.info",
        "https://pad.org",
        "https://r-c.com",
        "https://o-d.com",
      ],
      "username": Array [
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
    Object {
      "email": Array [
        "G63@gz.mag",
        "Z73@Bg.phy",
        "K99@M.biz",
        "G69@Nb.uni",
        "H53@FH.fug",
        "E27@RQ.his",
        "B60@hJ.min",
        "B46@Tz.mag",
        "S42@k.net",
        "A63@LE.ali",
      ],
      "firstName": Array [
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
      "fullName": Array [
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
      "lastName": Array [
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
      "username": Array [
        "L63293",
        "Z73904",
        "S_Nu99990",
        "M_Di69019",
        "k53764",
        "F.Fa27385",
        "S.Di60441",
        "V46318",
        "G_Fa42363",
        "P-Pe63344",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
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
      "firstName": Array [
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
      "fullName": Array [
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
      "lastName": Array [
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
      "url": Array [
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
      "username": Array [
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
    Object {
      "email": Array [
        "G@g.m",
        "Z@B.p",
        "K@M.q",
        "G@N.u",
        "H@F.f",
        "E@R.h",
        "B@h.m",
        "B@T.m",
        "S@k.e",
        "A@L.a",
      ],
      "firstName": Array [
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
      "fullName": Array [
        "I Ae",
        "P Il",
        "E Eg",
        "Q Es",
        "A Om",
        "H Ve",
        "F Ha",
        "P Et",
        "V Pr",
        "P Co",
      ],
      "lastName": Array [
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
      "username": Array [
        "L6329",
        "Z7390",
        "S9999",
        "M6901",
        "k5376",
        "F2738",
        "S6044",
        "V4631",
        "G4236",
        "P6334",
      ],
    }
  `)
})
