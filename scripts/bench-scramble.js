const b = require('benny');
const { copycat, fictional } = require('../dist')

let i = -1

;[5, 10, 15, 30, 50, 100].forEach(numWords => {
  const inputsIterator = generateInputs(numWords)
  let input = inputsIterator.next().value

  b.suite(
    `${numWords} words`,
    b.add('copycat.scramble()', () => copycat.scramble(input)),
    b.add('copycat.sentence()', () => copycat.sentence(input, {
      minWords: numWords,
      maxWords: numWords
    })),
    b.cycle(() => {
      input = inputsIterator.next().value
    }),
    complete(),
  );
})

b.suite(
  'length-independent copycat methods',
  b.add('copycat.firstName()', () => copycat.firstName(++i)),
  b.add('copycat.email()', () => copycat.email(++i)),
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

function* generateInputs(numWords) {
  const generateInputSegment = fictional.join('', [copycat.times([3, 6], copycat.oneOf([
    copycat.char.digit,
    copycat.char.upper,
    copycat.char.lower,
  ]))])

  const generateInput = fictional.join('', [copycat.times(numWords, fictional.tuple([generateInputSegment, copycat.oneOf(['@', ',', '.', ' '])]))])
  let i = -1

  while (true) {
    yield generateInput(++i)
  }
}