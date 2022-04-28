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
      "email": Array [
        "Jensen.Lockman206@hotmail.com",
        "Missouri.White362@gmail.com",
        "Johann_Sanford877@hotmail.com",
        "Mireille.Grant458@hotmail.com",
        "Cullen.Jast48@gmail.com",
        "Leopold_McCullough876@hotmail.com",
        "Cassandre_Kreiger661@yahoo.com",
        "Baron.Huel275@hotmail.com",
        "Vita.Schumm431@gmail.com",
        "Delores.Halvorson314@hotmail.com",
      ],
      "firstName": Array [
        "Hiram",
        "Ulices",
        "Josiane",
        "Alivia",
        "Jaquan",
        "Brannon",
        "Cecile",
        "Keara",
        "Edgar",
        "Amara",
      ],
      "fullName": Array [
        "Jensen Stokes",
        "Missouri Wintheiser",
        "Johann Morissette",
        "Mireille Kutch",
        "Cullen Gleichner",
        "Leopold Wolf",
        "Cassandre Effertz",
        "Baron Ullrich",
        "Vita Bayer",
        "Delores Farrell",
      ],
      "lastName": Array [
        "Cummings",
        "Glover",
        "Homenick",
        "Zemlak",
        "Raynor",
        "Durgan",
        "Ratke",
        "Murray",
        "Baumbach",
        "Wilderman",
      ],
      "username": Array [
        "Jensen.Lockman206",
        "Missouri.White362",
        "Johann_Sanford877",
        "Mireille.Grant458",
        "Cullen.Jast48",
        "Leopold_McCullough876",
        "Cassandre_Kreiger661",
        "Baron.Huel275",
        "Vita.Schumm431",
        "Delores.Halvorson314",
      ],
      "uuid": Array [
        "d14cdaed-4446-4f01-995d-5f96cf456583",
        "2a1d56db-b957-45b9-8509-88dcdb4340bd",
        "740a0134-8e80-46c6-82bd-30ed5e40502b",
        "30616d8d-f02e-4d6a-8c95-9c5761e174b7",
        "911931c6-8a07-4769-b153-01f6a7beae15",
        "76b1b563-d061-4eb9-a23c-4bf23d29bd80",
        "23f80e0e-2256-4408-a36f-7faf30420187",
        "25aa71e0-75a7-405a-8ad5-e9fe0690100a",
        "116442d9-f619-41fb-8447-96a79ef3f7fc",
        "9e145f0d-b8e4-45d1-8eb9-499b912d9b9c",
      ],
    }
  `)
})
