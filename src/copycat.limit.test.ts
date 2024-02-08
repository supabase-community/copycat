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
        "G.To63293@depmedi.org",
        "Z.Br73904@asssnow.info",
        "K.Da99990@co-par.net",
        "G_Wi69019@stenews.org",
        "H_Eb53764@excinsp.com",
        "E.Gr27385@brireve.info",
        "B.O_60441@misfoam.net",
        "B.Ob46318@synheat.net",
        "S_Ku42363@gr-cha.org",
        "A.Na63344@intzoot.net",
      ],
      "firstName": Array [
        "Daphnee",
        "Pearline",
        "Elisa",
        "Lenny",
        "Kailee",
        "Herman",
        "Wilhelmine",
        "Keshawn",
        "Sharon",
        "Cayla",
      ],
      "fullName": Array [
        "Casimir Lockman",
        "Jude Hintz",
        "Jalon Buckridge",
        "Eriberto Prohaska",
        "Rachelle Larkin",
        "Amani Greenfelder",
        "Selina Hahn",
        "Cale Yundt",
        "Velva Kertzmann",
        "Kendall Harvey",
      ],
      "lastName": Array [
        "Gleason",
        "Huel",
        "Moore",
        "Koch",
        "Hills",
        "McDermott",
        "Crooks",
        "Treutel",
        "Kohler",
        "Ebert",
      ],
      "url": Array [
        "https://s-a.org",
        "https://p-m.net",
        "https://shca.info",
        "https://f-c.net",
        "https://inst.com",
        "https://wotr.com",
        "https://y-r.info",
        "https://exdr.biz",
        "https://b-u.info",
        "https://f-c.name",
      ],
      "username": Array [
        "wise.fleck63293",
        "decip.subpr73904",
        "Kelsi_Dare99990",
        "Gilbe_Willm69019",
        "vigor-shoot53764",
        "Erick.Grant27385",
        "Brett.O'Kee60441",
        "blub_gambli46318",
        "Sherw_Kub42363",
        "Anton-Nader63344",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10, SMALL_LIMIT_TRANSFORMATION_NAMES))
    .toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "G63@dm.org",
        "Z73@as.inf",
        "K99@c.net",
        "G69@sn.org",
        "H53@ei.com",
        "E27@br.inf",
        "B60@mf.net",
        "B46@sh.net",
        "S42@g.org",
        "A63@iz.net",
      ],
      "firstName": Array [
        "Daphnee",
        "Pearline",
        "Elisa",
        "Lenny",
        "Kailee",
        "Herman",
        "Wilhelmine",
        "Keshawn",
        "Sharon",
        "Cayla",
      ],
      "fullName": Array [
        "Casi Lock",
        "Jude Hint",
        "Jalo Buck",
        "Erib Proh",
        "Rach Lark",
        "Aman Gree",
        "Seli Hahn",
        "Cale Yund",
        "Velv Kert",
        "Kend Harv",
      ],
      "lastName": Array [
        "Gleason",
        "Huel",
        "Moore",
        "Koch",
        "Hills",
        "McDermott",
        "Crooks",
        "Treutel",
        "Kohler",
        "Ebert",
      ],
      "username": Array [
        "w.fl63293",
        "d.su73904",
        "K_Da99990",
        "G_Wi69019",
        "v-sh53764",
        "E.Gr27385",
        "B.O'60441",
        "b_ga46318",
        "S_Ku42363",
        "A-Na63344",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Granville.Towne63293@depressurizemedicine.org",
        "Zachariah.Breitenberg73904@assuredsnowflake.info",
        "Kelsie.Dare99990@composed-partner.net",
        "Gilbert_Willms69019@steepnewspaper.org",
        "Hunter_Ebert53764@excellentinspector.com",
        "Erick.Grant27385@brilliantreveal.info",
        "Brett.O_Keefe60441@miserablefoam.net",
        "Buddy.Oberbrunner46318@syndicateheater.net",
        "Sherwood_Kub42363@greedy-chapel.org",
        "Antonio.Nader63344@intersectzootsuit.net",
      ],
      "firstName": Array [
        "Daphnee",
        "Pearline",
        "Elisa",
        "Lenny",
        "Kailee",
        "Herman",
        "Wilhelmine",
        "Keshawn",
        "Sharon",
        "Cayla",
      ],
      "fullName": Array [
        "Casimir Lockman",
        "Jude Hintz",
        "Jalon Buckridge",
        "Eriberto Prohaska",
        "Rachelle Larkin",
        "Amani Greenfelder",
        "Selina Hahn",
        "Cale Yundt",
        "Velva Kertzmann",
        "Kendall Harvey",
      ],
      "lastName": Array [
        "Gleason",
        "Huel",
        "Moore",
        "Koch",
        "Hills",
        "McDermott",
        "Crooks",
        "Treutel",
        "Kohler",
        "Ebert",
      ],
      "url": Array [
        "https://spatter-acknowledgment.org",
        "https://promenade-mouse.net",
        "https://shabbycastle.info",
        "https://fair-cranberry.net",
        "https://infamousstock-in-trade.com",
        "https://worriedtrousers.com",
        "https://young-raid.info",
        "https://exemplarydrudgery.biz",
        "https://bind-ukulele.info",
        "https://fetter-cutting.name",
      ],
      "username": Array [
        "wise.fleck63293",
        "decipher.subprime73904",
        "Kelsie_Dare99990",
        "Gilbert_Willms69019",
        "vigorous-shootdown53764",
        "Erick.Grant27385",
        "Brett.O'Keefe60441",
        "blub_gambling46318",
        "Sherwood_Kub42363",
        "Antonio-Nader63344",
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
