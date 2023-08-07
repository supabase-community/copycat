import isEmail from 'is-email'
import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

test('generating fake emails', () => {
  checkGeneratedValue(isEmail, copycat.email)
})

test('custom domains', () => {
  expect(copycat.email('foo', { domain: 'acme.org' }).split('@')[1]).toEqual(
    'acme.org'
  )
})
