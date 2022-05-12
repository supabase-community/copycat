import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

const isHex = (value: string) => !Number.isNaN(parseInt(value, 16))

test('generating hex values', () => {
  checkGeneratedValue(isHex, copycat.hex)
})
