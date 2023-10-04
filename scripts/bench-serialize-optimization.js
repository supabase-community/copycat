const b = require('benny');
const { copycat, fictional } = require('../dist')
const nestedSample = require('./samples/nested')

b.suite(
  `copycat.scramble()`,
  b.add('before', () => {
    process.env.AFTER = false
    copycat.scramble(nestedSample)
  }),
  b.add('after', () => {
    process.env.AFTER = true
    copycat.scramble(nestedSample)
  }),
  complete()
)

b.suite(
  `copycat.email()`,
  b.add('before', () => {
    process.env.AFTER = false
    copycat.email(nestedSample)
  }),
  b.add('after', () => {
    process.env.AFTER = true
    copycat.email(nestedSample)
  }),
  complete()
)

function complete() {
  return b.complete((summary) => {
    summary.results = summary.results.map((result) => {
      delete result.details.sampleResults

      return {
        ms: 1000 / result.ops,
        ...result,
      }
    })

    console.log(JSON.stringify(summary, null, 2))
  })
}