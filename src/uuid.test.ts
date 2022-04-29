import { copycat } from '.'
import { checkGeneratedValue } from './testutils'
import { validate as isUuid } from 'uuid'

test('generating fake usernames', () => {
  checkGeneratedValue(isUuid, copycat.uuid)
})
