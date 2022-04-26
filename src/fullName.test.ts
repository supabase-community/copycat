import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

const isNameSegment = (value: string) =>
  value.length > 1 && value[0].toUpperCase() === value[0]

const isFullName = (value: string) => {
  const segments = value.split(' ')
  return segments.length > 1 && segments.every(isNameSegment)
}

test('generating fake first names', () => {
  checkGeneratedValue(isFullName, copycat.fullName)
})
