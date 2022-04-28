import { readFile } from 'fs/promises'
import path from 'path'
import { inspect } from 'util'
import { copycat } from '.'

expect.extend({
  toHaveUpToDateExamples(source, results: { [s: string]: unknown }) {
    const missingResults = []

    for (const name of Object.keys(results)) {
      const value = inspect(results[name], { depth: 10 })

      if (!source.includes(value)) {
        missingResults.push({
          name,
          value,
        })
      }
    }

    if (missingResults.length) {
      return {
        message: () =>
          [
            'Expected the following API methods to have examples, but could not find them. Are they in the readme and up to date?',
            ...missingResults.map(({ name, value }) => `* ${name}: ${value}`),
          ].join('\n'),
        pass: false,
      }
    }

    return {
      message: () => 'Expected missing examples in readme',
      pass: true,
    }
  },
})

test('readme examples are up to date', async () => {
  const readmeSource = (
    await readFile(path.join(__dirname, '..', 'README.md'))
  ).toString()

  const results: { [name: string]: unknown } = {}

  const addResult = (name: string) => {
    results[name] = copycat[name]('foo')
  }

  Object.keys(copycat).forEach(addResult)
  ;(expect(readmeSource) as any).toHaveUpToDateExamples(results)
})
