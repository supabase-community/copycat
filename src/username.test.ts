import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

const isUsername = (value: string) => Boolean(value.match(/[a-zA-Z0-9_\.]+/))

test('generating fake usernames', () => {
  checkGeneratedValue(isUsername, copycat.fullName)
})
