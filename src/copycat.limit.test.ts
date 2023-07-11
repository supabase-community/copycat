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
        "J.Ly12969@M-way.us",
        "C.Ar47642@A-set.us",
        "J.Go36962@gojam.net",
        "L_Sc38777@R-eel.net",
        "N_Ja62699@y-dew.info",
        "D.He15864@n-car.biz",
        "M.Ko66513@z-sow.biz",
        "Z.Ku29558@Bwake.info",
        "K_Sc77545@Vovary.net",
        "K.Da69946@S-aim.info",
      ],
      "firstName": Array [
        "Eli",
        "Hillard",
        "Janelle",
        "Jena",
        "Dawn",
        "Alisha",
        "Louisa",
        "Pasquale",
        "Amya",
        "Hollie",
      ],
      "fullName": Array [
        "Clinton Wehner",
        "Garth Wolf",
        "Jace Wilderman",
        "Eileen Bradtke",
        "Elisabeth Lind",
        "Hayden Kuphal",
        "Corene Hilpert",
        "Eryn Parisian",
        "Leila Dooley",
        "Aliza Spencer",
      ],
      "lastName": Array [
        "Wehner",
        "Borer",
        "Borer",
        "Konopelski",
        "Wilkinson",
        "Howe",
        "Lindgren",
        "Ratke",
        "Friesen",
        "Lueilwitz",
      ],
      "username": Array [
        "ripe.movie12969",
        "dunt.plan47642",
        "Rose_Rice36962",
        "Robb_Kling38777",
        "damp-vet62699",
        "Jack.White15864",
        "Asha.Mante66513",
        "slot_vinyl29558",
        "Erin_Jones77545",
        "Zita-Rath69946",
      ],
    }
  `)
})

test('limit: small', () => {
  expect(generateValues(10)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "J12@M.biz",
        "C47@A.us",
        "J36@Et.muc",
        "L38@R.com",
        "N62@y.com",
        "D15@n.us",
        "M66@z.us",
        "Z29@BT.mem",
        "K77@Vt.kiv",
        "K69@S.net",
      ],
      "firstName": Array [
        "Durward",
        "Eliezer",
        "Alicia",
        "Magdalena",
        "Mariela",
        "Liliane",
        "Magdalena",
        "Rachel",
        "Jarod",
        "Colton",
      ],
      "fullName": Array [
        "Ali Lang",
        "Mae Ryan",
        "Lew Metz",
        "Al Orn",
        "Mac Veum",
        "Mya Rau",
        "Ken Kihn",
        "Mae Mann",
        "Iva Koss",
        "Oda Koss",
      ],
      "lastName": Array [
        "Legros",
        "DuBuque",
        "Russel",
        "Little",
        "Sawayn",
        "Greenholt",
        "Jacobi",
        "Bartell",
        "Grant",
        "Nienow",
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
        "Juvenal.Lynch12969@deputise-impudence.us",
        "Craig.Armstrong47642@leafy-campaigning.us",
        "Jay.Goyette36962@cohererib.net",
        "Lukas_Schiller38777@disrobe-soy.net",
        "Noah_Jakubowski62699@frail-supporter.info",
        "Darien.Hessel15864@luxurious-fashion.biz",
        "Maymie.Koelpin66513@equal-trench.biz",
        "Zoe.Kub29558@huskypulley.info",
        "Kelsi_Schaden77545@ickylemon.net",
        "Kylee.Daniel69946@worst-tear.info",
      ],
      "firstName": Array [
        "Eli",
        "Hillard",
        "Janelle",
        "Jena",
        "Dawn",
        "Alisha",
        "Louisa",
        "Pasquale",
        "Amya",
        "Hollie",
      ],
      "fullName": Array [
        "Anabelle Wehner",
        "Deshaun Wolf",
        "Arch Wilderman",
        "Carroll Bradtke",
        "Janae Lind",
        "Linnie Kuphal",
        "Billy Hilpert",
        "Jeromy Parisian",
        "Jerrod Dooley",
        "Viviane Spencer",
      ],
      "lastName": Array [
        "Wehner",
        "Borer",
        "Borer",
        "Konopelski",
        "Wilkinson",
        "Howe",
        "Lindgren",
        "Ratke",
        "Friesen",
        "Lueilwitz",
      ],
      "username": Array [
        "deficient.carriage12969",
        "commandeer.freckle47642",
        "Aracely_Stoltenberg36962",
        "Johathan_Douglas38777",
        "sturdy-intestine62699",
        "Karianne.Goodwin15864",
        "Myrtis.Wolff66513",
        "pressurise_tender29558",
        "Casandra_Brekke77545",
        "Annetta-Legros69946",
      ],
    }
  `)
})

test('limit: tiny', () => {
  expect(generateValues(5)).toMatchInlineSnapshot(`
    Object {
      "email": Array [
        "J@M.m",
        "C@A.n",
        "J@E.m",
        "L@R.m",
        "N@y.y",
        "D@n.r",
        "M@z.t",
        "Z@B.m",
        "K@V.k",
        "K@S.n",
      ],
      "firstName": Array [
        "Baby",
        "Coty",
        "Curt",
        "Orie",
        "Seth",
        "Kurt",
        "Roel",
        "Neha",
        "Maya",
        "Orie",
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
