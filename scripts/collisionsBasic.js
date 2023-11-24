const { v4: uuid } = require('uuid')
const {copycat, fictional} = require('../dist/index')

const TRANSFORMATIONS = {
  ...fictional,
  ...copycat,
}

const METHOD = process.env.METHOD ? process.env.METHOD : 'phoneNumber'
const MAX_N = +(process.env.MAX_N ?? 999999)

function main() {
  let firstColision = null
  let colisions = 0
  const colide = new Set()
  for (let i = 0; i < MAX_N; i++) {
    const result = TRANSFORMATIONS[METHOD](uuid())
    if (colide.has(result)) {
      colisions++
      if (firstColision == null) {
        firstColision = i
      }
    } else {
      colide.add(result)
    }
  }
  console.log(`firstColision: ${firstColision} colided ${colisions} times`)
}

main()