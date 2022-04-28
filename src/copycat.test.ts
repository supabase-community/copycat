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
        "a03b2dc0-c558-5326-8387-39da696f3694",
        "b5cbcff3-d6dd-5185-8b85-3480cad07fc5",
        "69cd4963-993c-5271-bc7c-e2ede8492e29",
        "9dbc28ca-10b3-5bf0-9465-30a0b2569dc2",
        "1c042e55-2396-5612-b143-d9dd5e189c32",
        "4279d38f-5d1c-51af-b2f2-62c4109e8301",
        "695fa4eb-4dce-532d-b2f3-1ffe0bc4abd1",
        "7a64f12b-60d9-546f-ad4e-74311599313c",
        "24fddd8f-a7f4-56ee-a636-cdb9070d1abc",
        "af7c1720-888e-50f5-935e-ee20326abe59",
      ],
    }
  `)
})
