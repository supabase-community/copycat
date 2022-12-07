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
        "H.Mu31412@R-doc.biz",
        "D_Em64284@Y-car.com",
        "E_Ru24231@G-rim.org",
        "B.O_18057@l-pod.biz",
        "M_Ko17679@behail.info",
        "T_D_526@a-baby.com",
        "H_Hy92991@begram.info",
        "A_Gu81087@N-joy.com",
        "M_Ch82115@j-oak.biz",
        "F.Ve92138@g-hub.com",
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
        "H31@R.net",
        "D64@Y.net",
        "E24@G.net",
        "B18@l.biz",
        "M17@EA.shi",
        "T52@a.biz",
        "H92@ij.hyn",
        "A81@N.net",
        "M82@j.com",
        "F92@g.net",
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
        "Houston.Muller31412@punctual-marionberry.biz",
        "Daisha_Emard64284@obedient-retina.com",
        "Elliot_Runolfsson24231@kosher-policeman.org",
        "Betsy.O_Hara18057@assuage-ravioli.biz",
        "Malika_Konopelski17679@chantreciprocity.info",
        "Taylor_D_Amore526@meaty-resource.com",
        "Hazel_Hyatt92991@torturedeclaration.info",
        "Arch_Gusikowski81087@upset-member.com",
        "Mina_Champlin82115@miniature-visa.biz",
        "Felton.Veum92138@sorrowful-seller.com",
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
        "H@R.k",
        "D@Y.c",
        "E@G.t",
        "B@l.m",
        "M@E.s",
        "T@a.m",
        "H@i.h",
        "A@N.t",
        "M@j.m",
        "F@g.k",
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
