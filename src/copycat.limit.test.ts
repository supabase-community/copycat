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
        "K.Ko31412@R-doc.biz",
        "N_Ma64284@Y-car.com",
        "K_Me24231@G-rim.org",
        "M.Ma18057@l-pod.biz",
        "M_Va17679@behail.info",
        "H_Mo526@a-baby.com",
        "C_Hy92991@begram.info",
        "Y_Na81087@N-joy.com",
        "V_Ki82115@j-oak.biz",
        "K.Ce92138@g-hub.com",
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
        "Horacio Hyatt",
        "Soledad Wehner",
        "Derek Hartmann",
        "Zita Connelly",
        "Griffin Hermann",
        "Shayne Monahan",
        "Malika Ziemann",
        "Foster Nader",
        "Adolph Marquardt",
        "Colten Price",
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
        "blue_kale31412",
        "rust_nod64284",
        "Eula-Pagac24231",
        "cue.belt18057",
        "cute_loan17679",
        "Andy-Kling526",
        "sock_wood92991",
        "chat-stay81087",
        "Eva.Tromp82115",
        "dim.slime92138",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "K31@R.net",
        "N64@Y.net",
        "K24@G.net",
        "M18@l.biz",
        "M17@EA.shi",
        "H52@a.biz",
        "C92@ij.hyn",
        "Y81@N.net",
        "V82@j.com",
        "K92@g.net",
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
        "Mya Toy",
        "Mia King",
        "Guy Hand",
        "Sid Beer",
        "Don Feil",
        "Rae Kihn",
        "Loy Mraz",
        "Lue Cole",
        "Tad Feil",
        "Hal Mraz",
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
        "r31412",
        "N64284",
        "K-Me24231",
        "j18057",
        "r17679",
        "H-Mo526",
        "M92991",
        "I81087",
        "V.Ki82115",
        "z92138",
      ],
    }
  `)
})

test('limit: very large', () => {
  expect(generateValues(999)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "Emelia.Stiedemann31412@punctual-marionberry.biz",
        "Darius_Fahey64284@obedient-retina.com",
        "Cullen_Kuhic24231@kosher-policeman.org",
        "Nikita.Wolff18057@assuage-ravioli.biz",
        "Emery_Haag17679@chantreciprocity.info",
        "Shayna_Feest526@meaty-resource.com",
        "Felipe_Beatty92991@torturedeclaration.info",
        "Sierra_Bernhard81087@upset-member.com",
        "Antwon_Kuvalis82115@miniature-visa.biz",
        "Alexanne.O'Conner92138@sorrowful-seller.com",
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
        "Jackeline Hyatt",
        "Hallie Wehner",
        "Milford Hartmann",
        "Hanna Connelly",
        "Jamir Hermann",
        "Gaston Monahan",
        "Earline Ziemann",
        "Camille Nader",
        "Fletcher Marquardt",
        "Yessenia Price",
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
        "immaterial_image31412",
        "clamor_attainment64284",
        "Cullen-Kuhic24231",
        "pester.bulb18057",
        "insecure_pamphlet17679",
        "Shayna-Feest526",
        "telescope_fountain92991",
        "hull-chorus81087",
        "Antwon.Kuvalis82115",
        "white.appellation92138",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "K@R.k",
        "N@Y.c",
        "K@G.t",
        "M@l.m",
        "M@E.s",
        "H@a.m",
        "C@i.h",
        "Y@N.t",
        "V@j.m",
        "K@g.k",
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
        "H Vi",
        "H Sh",
        "H So",
        "N Mi",
        "N Ni",
        "R Ke",
        "Y Ch",
        "M Hy",
        "C Ni",
        "K Ra",
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
        "r3141",
        "N6428",
        "K2423",
        "j1805",
        "r1767",
        "H526",
        "M9299",
        "I8108",
        "V8211",
        "z9213",
      ],
    }
  `)
})
