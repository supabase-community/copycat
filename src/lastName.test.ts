import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

const isLastName = (value: string) =>
  value.length > 1 && value[0].toUpperCase() === value[0]

test('generating fake first names', () => {
  checkGeneratedValue(isLastName, copycat.lastName)
})
