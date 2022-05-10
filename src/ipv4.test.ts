import { isIPv4 } from 'net'
import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

test('generating ipv4 addresses', () => {
  checkGeneratedValue(isIPv4, copycat.ipv4)
})
