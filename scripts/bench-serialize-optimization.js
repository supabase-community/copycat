const b = require('benny');
const { copycat, fictional } = require('../dist')
const nestedSample = require('./samples/nested')

const serializerNames = Object.keys(global.__bench_serializers)

;(() => {
  const inputsIterator = generateWords(100_000)
  let input = inputsIterator.next().value

  b.suite(
    `copycat.scramble(): 100_000 words`,
    ...serializerNames.map(name => b.add(name, () => {
      global.__bench_serializer = name
      copycat.scramble(input)
    })),
    b.cycle(() => {
      input = inputsIterator.next().value
    }),
    complete()
  )
})()

;(() => {
  const inputsIterator = generateWords(100_000)
  let input = inputsIterator.next().value

  b.suite(
    `copycat.email(): 100_000 words`,
    ...serializerNames.map(name => b.add(name, () => {
      global.__bench_serializer = name
      copycat.email(input)
    })),
    b.cycle(() => {
      input = inputsIterator.next().value
    }),
    complete()
  );
})()

;(() => {
  b.suite(
    `copycat.scramble(): nested json`,
    ...serializerNames.map(name => b.add(name, () => {
      global.__bench_serializer = name
      copycat.scramble(nestedSample)
    })),
    complete()
  )
})()

b.suite(
  `copycat.email(): nested json`,
  ...serializerNames.map(name => b.add(name, () => {
    global.__bench_serializer = name
    copycat.email(nestedSample)
  })),
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

function* generateWords(numWords) {
  const generateInputSegment = fictional.join('', [copycat.times([3, 6], copycat.oneOf([
    copycat.char.digit,
    copycat.char.upper,
    copycat.char.lower,
  ]))])

  const generateInput = id => copycat.times(id, numWords, id => fictional.tuple(id, [generateInputSegment, copycat.oneOf(['@', ',', '.', ' '])]).join('')).join('')
  let i = -1

  while (true) {
    yield generateInput(++i)
  }
}