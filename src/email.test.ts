import isEmail from 'is-email'
import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

test('generating fake emails', () => {
  checkGeneratedValue(isEmail, copycat.email)
})
