const b = require('benny');
const { copycat, fictional } = require('../dist')
const { copycat: copycat_0_17_3 } = require('../0.17.3')

;[100, 1_000, 10_000, 100_000].forEach(numWords => {
  const inputsIterator = generateInputs(numWords)
  let input = inputsIterator.next().value

  b.suite(
    `${numWords} words`,
    b.add('copycat.scramble(): before (0.17.3)', () => copycat_0_17_3.scramble(input)),
    b.add('copycat.scramble(): after (reimplementation)', () => copycat.scramble(input)),
    b.cycle(() => {
      input = inputsIterator.next().value
    }),
    complete()
  );
})

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

  const generateInput = id => copycat.times(id, numWords, id => fictional.tuple(id, [generateInputSegment, copycat.oneOf(['@', ',', '.', ' '])]).join('')).join('')
  let i = -1

  while (true) {
    yield generateInput(++i)
  }
}

function rot13(str) {
  newstr = str.split("");

  var finalstr = newstr.map(function(letter) {
    lettervalue = letter.charCodeAt(0);

    if (lettervalue < 65 || lettervalue > 90) {
      return String.fromCharCode(lettervalue);
    }

    else if (lettervalue < 78) {
      return String.fromCharCode(lettervalue + 13);
    }

    else return String.fromCharCode(lettervalue - 13);

  }).join("");

  return finalstr;
}