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
    }
  `)
})
