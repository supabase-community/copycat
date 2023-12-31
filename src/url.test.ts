import isUrl from 'is-url'
import { copycat } from '.'
import { checkGeneratedValue } from './testutils'

test('is url', () => {
  checkGeneratedValue(isUrl, copycat.url)
})
