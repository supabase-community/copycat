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
        "G.Fl12969@M-few.org",
        "Z.He47642@A-cue.biz",
        "K.We36962@golung.org",
        "G_Ke38777@R-hay.org",
        "H_Ro62699@y-bed.biz",
        "E.Fe15864@n-men.com",
        "B.Mc66513@z-gun.org",
        "B.Fr29558@Bpaint.net",
        "S_Go77545@Vcandy.org",
        "A.Pr69946@S-row.org",
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
        "Johnathan Lueilwitz",
        "Miguel Toy",
        "Carmela Stokes",
        "Terrance Crooks",
        "Anibal Crist",
        "Vincenzo McClure",
        "Uriah Boyer",
        "Nayeli Upton",
        "Emerson Kessler",
        "Shayne O'Conner",
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
      "username": Array [
        "rich.dad12969",
        "lamp.hake47642",
        "Kane_Rice36962",
        "Zoe_Howe38777",
        "damp-storm62699",
        "Jean.White15864",
        "Olga.Mante66513",
        "ache_tape29558",
        "Lee_Hayes77545",
        "Sid-Feil69946",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "G12@M.com",
        "Z47@A.com",
        "K36@Et.muc",
        "G38@R.com",
        "H62@y.net",
        "E15@n.net",
        "B66@z.net",
        "B29@BT.mem",
        "S77@Vt.kiv",
        "A69@S.net",
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
        "Joe Lang",
        "Eve Ryan",
        "Ole Metz",
        "Al Orn",
        "Dee Veum",
        "Ian Rau",
        "Bo Bruen",
        "Jo Block",
        "Mac Koss",
        "Tom Koss",
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
        "L12969",
        "Z47642",
        "K_Yo36962",
        "K_No38777",
        "k62699",
        "Y.Ka15864",
        "S.Ki66513",
        "V29558",
        "Y_Sh77545",
        "V-Yo69946",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Granville.Flatley12969@collude-engineering.org",
        "Zachariah.Hessel47642@other-cargo.biz",
        "Kelsie.Welch36962@trampperpendicular.org",
        "Gilbert_Kertzmann38777@conform-altar.org",
        "Hunter_Roob62699@caring-sleepiness.biz",
        "Erick.Ferry15864@poor-superiority.com",
        "Brett.McKenzie66513@knowing-parcel.org",
        "Buddy.Franey29558@difficultschedule.net",
        "Sherwood_Gottlieb77545@svelteattendant.org",
        "Antonio.Prohaska69946@admirable-essay.org",
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
        "Jon Lueilwitz",
        "Kaylee Toy",
        "Gardner Stokes",
        "Lisa Crooks",
        "Shana Crist",
        "Viola McClure",
        "Kole Boyer",
        "Laney Upton",
        "Idella Kessler",
        "Ally O'Conner",
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
      "username": Array [
        "truthful.maggot12969",
        "page.problem47642",
        "Sonia_Stehr36962",
        "Webster_Leuschke38777",
        "unequaled-period62699",
        "Aylin.Ernser15864",
        "Florence.Parker66513",
        "bully_ghost29558",
        "Cortez_Johnston77545",
        "Stanton-Haley69946",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "G@M.m",
        "Z@A.n",
        "K@E.m",
        "G@R.m",
        "H@y.y",
        "E@n.r",
        "B@z.t",
        "B@B.m",
        "S@V.k",
        "A@S.n",
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
        "M Mu",
        "M Ka",
        "R Sh",
        "C Ni",
        "K Ra",
        "Y Yo",
        "S Mo",
        "R Ka",
        "K Hy",
        "Y Ra",
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
        "L1296",
        "Z4764",
        "K3696",
        "K3877",
        "k6269",
        "Y1586",
        "S6651",
        "V2955",
        "Y7754",
        "V6994",
      ],
    }
  `)
})
