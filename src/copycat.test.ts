import { copycat } from '.'
import { NUM_CHECKS } from './testutils'

test('determinism', () => {
  const input = 'some-value'

  const check = (name: string) => {
    const value1 = copycat[name](input)

    let i = -1

    while (++i < NUM_CHECKS) {
      expect(copycat[name](input)).toEqual(value1)
    }
  }

  Object.keys(copycat).forEach(check)
})

test('generated values', () => {
  const count = 10
  const results = {}

  const addResults = (name: string) => {
    const valueResults = []

    let i = -1

    while (++i < count) {
      valueResults.push(copycat[name](i))
    }

    results[name] = valueResults
  }

  Object.keys(copycat).forEach(addResults)
  expect(results).toMatchInlineSnapshot(`
    Object {
      "city": Array [
        "Country Club",
        "Anderson",
        "Euclid",
        "Huntsville",
        "Missouri City",
        "Kettering",
        "Bentonville",
        "Bedford",
        "Visalia",
        "Caguas",
      ],
      "country": Array [
        "United Kingdom",
        "Niue",
        "Italy",
        "Slovakia (Slovak Republic)",
        "Austria",
        "Guinea",
        "Georgia",
        "Nicaragua",
        "Thailand",
        "Maldives",
      ],
      "email": Array [
        "Dewayne_Yost801@yahoo.com",
        "Faye.Luettgen942@yahoo.com",
        "Clinton.Haag275@hotmail.com",
        "Nia_Jacobs620@gmail.com",
        "Roy.Ondricka284@gmail.com",
        "Letitia.Veum972@yahoo.com",
        "Orlo.Cremin526@yahoo.com",
        "Tyrese.Ondricka607@gmail.com",
        "Ida_Gusikowski153@hotmail.com",
        "Shana_Reinger165@yahoo.com",
      ],
      "firstName": Array [
        "Madison",
        "Dino",
        "Dortha",
        "Ricardo",
        "Sherwood",
        "Forrest",
        "Garland",
        "Tyreek",
        "Cesar",
        "Abdiel",
      ],
      "fullName": Array [
        "Dewayne Marks",
        "Faye Ortiz",
        "Clinton Schmidt",
        "Nia Schultz",
        "Roy Hermiston",
        "Letitia Wilderman",
        "Orlo Lang",
        "Tyrese Harvey",
        "Ida Ernser",
        "Shana Quitzon",
      ],
      "lastName": Array [
        "Cruickshank",
        "Pacocha",
        "Block",
        "Abernathy",
        "Kiehn",
        "Bins",
        "Nikolaus",
        "Predovic",
        "Carroll",
        "Wunsch",
      ],
      "postalAddress": Array [
        "932 Krista Union, Santa Fe 8316, Maldives",
        "655 Maudie Stravenue, Caldwell 5338, Paraguay",
        "750 Nienow Hill, Stamford 5115, Haiti",
        "809 Florencio View, West Covina 5836, Bhutan",
        "237 Earnestine Inlet, Barnstable Town 7943, Israel",
        "355 Conn Run, La Mirada 3381, Israel",
        "821 Margaret Skyway, Conway 8574, Bahrain",
        "96 Leuschke Prairie, Racine 7319, Barbados",
        "71 Hahn Club, South Gate 5660, Cyprus",
        "305 Roob Trail, Costa Mesa 5708, Macao",
      ],
      "streetAddress": Array [
        "674 Jamel Tunnel",
        "150 Melba Divide",
        "235 Ullrich Mews",
        "740 Alvah Valley",
        "742 Jacky Spring",
        "999 Felton Island",
        "98 Chadd Manor",
        "396 Sage Walk",
        "473 Rachelle Wells",
        "757 Pfeffer Greens",
      ],
      "streetName": Array [
        "Theodore Ridge",
        "Mosciski Springs",
        "MacGyver Heights",
        "O'Kon Brooks",
        "Cummings Road",
        "Rowland Prairie",
        "Leland Ridges",
        "Smith Turnpike",
        "Towne Tunnel",
        "Kirk Freeway",
      ],
      "username": Array [
        "Dewayne_Yost801",
        "Faye.Luettgen942",
        "Clinton.Haag275",
        "Nia_Jacobs620",
        "Roy.Ondricka284",
        "Letitia.Veum972",
        "Orlo.Cremin526",
        "Tyrese.Ondricka607",
        "Ida_Gusikowski153",
        "Shana_Reinger165",
      ],
      "uuid": Array [
        "0dfe6668-13e0-5b72-ab8f-fa435c067559",
        "f4e69f87-51e7-5f66-b9a6-956391a3840f",
        "9d16c41f-18cf-5366-a9e1-593636e3c23f",
        "c6bc7322-a022-530b-bb96-f1e6a22820e3",
        "bc98f5b5-e20f-5866-bcd6-68b8d202e396",
        "c9dcb68e-0c24-52a5-a9ed-93b6b5f502ca",
        "ee906ee0-36bd-5463-9326-ea7e669ba450",
        "ed6b1c8b-2ecb-56ca-b73a-d27d7ed669ea",
        "e37972bd-0015-5ccd-95ab-c2162bc760ea",
        "f1848f89-408d-57e5-9406-bb5bd3b5afcb",
      ],
    }
  `)
})
