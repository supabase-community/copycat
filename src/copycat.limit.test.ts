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
        "S_Mi57963@Dload.org",
        "Y_Ra49648@r-pet.org",
        "M_Yu80921@s-gap.org",
        "S.So24286@axdiet.biz",
        "R_Ni6117@h-hen.com",
        "K.Ma49478@J-mob.com",
        "N_Ta45792@Nlabel.net",
        "H.Ha44027@pshare.info",
        "M.Mu54417@ccsnow.net",
        "H.Ko39837@Dbell.org",
      ],
      "firstName": Array [
        "Ellis",
        "Jeanie",
        "Janelle",
        "Elyssa",
        "Zander",
        "Mary",
        "Karlee",
        "Jacinto",
        "Graham",
        "Stacy",
      ],
      "fullName": Array [
        "Cali Mosciski",
        "Felton McCullough",
        "Anibal Huels",
        "Joesph Price",
        "Pauline Corkery",
        "Lucinda Barrows",
        "Raheem Hudson",
        "Melvina Feeney",
        "Robin Labadie",
        "Pedro Corwin",
      ],
      "lastName": Array [
        "Howell",
        "Kihn",
        "Labadie",
        "Kerluke",
        "Bartoletti",
        "Hamill",
        "Berge",
        "Leffler",
        "Predovic",
        "Howell",
      ],
      "username": Array [
        "Finn-Boyle57963",
        "Kim_Adams49648",
        "last_wreck80921",
        "fond-minor24286",
        "Ken_Gibson6117",
        "vast_beard49478",
        "Coty_Cole45792",
        "Jay-Smith44027",
        "raw.tart54417",
        "hiss.wave39837",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "S57@Dq.van",
        "Y49@r.com",
        "M80@s.com",
        "S24@Yx.rae",
        "R61@h.net",
        "K49@J.com",
        "N45@Nj.vir",
        "H44@pG.kim",
        "M54@Qy.vav",
        "H39@DL.kiy",
      ],
      "firstName": Array [
        "Casimer",
        "Alan",
        "Elnora",
        "Rosalia",
        "Reta",
        "Enrico",
        "Easton",
        "Dallin",
        "Lisandro",
        "Adalberto",
      ],
      "fullName": Array [
        "Ivy Mann",
        "Jan Fay",
        "Kay Torp",
        "Ike Lowe",
        "Jan Rath",
        "Hal Koss",
        "Nat Kihn",
        "Mac Kuhn",
        "Geo King",
        "Asa Veum",
      ],
      "lastName": Array [
        "Ankunding",
        "Murray",
        "McDermott",
        "Douglas",
        "Murray",
        "Lesch",
        "Homenick",
        "Kohler",
        "White",
        "Kerluke",
      ],
      "username": Array [
        "S-Mi57963",
        "Y_Ra49648",
        "o80921",
        "V24286",
        "R_Ni6117",
        "i49478",
        "N_Ta45792",
        "H-Ha44027",
        "n54417",
        "x39837",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Finn_Pfannerstill57963@dishonestptarmigan.org",
        "Eli_Abbott49648@barbecue-buckle.org",
        "Kendra_Larson80921@standard-swordfight.org",
        "Liza.Pollich24286@transcribedwelling.biz",
        "Edison_McCullough6117@charm-vixen.com",
        "Princess.Gottlieb49478@slaver-foal.com",
        "Robyn_Ledner45792@coldlute.net",
        "Libbie.Reilly44027@unselfishpond.info",
        "Elliott.Grady54417@ploughverb.net",
        "Edd.Shields39837@mealybanquette.org",
      ],
      "firstName": Array [
        "Ellis",
        "Jeanie",
        "Janelle",
        "Elyssa",
        "Zander",
        "Mary",
        "Karlee",
        "Jacinto",
        "Graham",
        "Stacy",
      ],
      "fullName": Array [
        "Emilio Mosciski",
        "Lorenza McCullough",
        "Ayana Huels",
        "Janie Price",
        "Hulda Corkery",
        "Jerrod Barrows",
        "Bernadette Hudson",
        "Dedric Feeney",
        "Chase Labadie",
        "Jairo Corwin",
      ],
      "lastName": Array [
        "Howell",
        "Kihn",
        "Labadie",
        "Kerluke",
        "Bartoletti",
        "Hamill",
        "Berge",
        "Leffler",
        "Predovic",
        "Howell",
      ],
      "username": Array [
        "Finn-Pfannerstill57963",
        "Eli_Abbott49648",
        "pristine_cleft80921",
        "watchful-dictaphone24286",
        "Edison_McCullough6117",
        "yellow_poem49478",
        "Robyn_Ledner45792",
        "Libbie-Reilly44027",
        "live.shawl54417",
        "snigger.facsimile39837",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "S@D.v",
        "Y@r.r",
        "M@s.h",
        "S@Y.r",
        "R@h.h",
        "K@J.k",
        "N@N.v",
        "H@p.k",
        "M@Q.v",
        "H@D.k",
      ],
      "firstName": Array [
        "Jena",
        "Faye",
        "Joan",
        "Mose",
        "Vita",
        "Mia",
        "Kaia",
        "Lola",
        "Neha",
        "Nyah",
      ],
      "fullName": Array [
        "R Ra",
        "M Mo",
        "M Va",
        "K Va",
        "T Ke",
        "R Yo",
        "K Mi",
        "K So",
        "T Ra",
        "M Ni",
      ],
      "lastName": Array [
        "Von",
        "Yost",
        "Bins",
        "Funk",
        "Howe",
        "Koss",
        "Moen",
        "Orn",
        "Howe",
        "Veum",
      ],
      "username": Array [
        "S5796",
        "Y4964",
        "o8092",
        "V2428",
        "R6117",
        "i4947",
        "N4579",
        "H4402",
        "n5441",
        "x3983",
      ],
    }
  `)
})
