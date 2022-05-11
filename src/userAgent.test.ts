import { copycat } from '.'
import { checkGeneratedValue } from './testutils'
import isBrowserUserAgent from 'user-agent-is-browser'

test('generating browser user agent', () => {
  checkGeneratedValue(isBrowserUserAgent, copycat.userAgent)
})
