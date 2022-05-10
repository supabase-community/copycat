import { isMACAddress } from 'is-mac-address'
import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

test('generating ipv4 addresses', () => {
  checkGeneratedValue(isMACAddress, copycat.mac)
})
