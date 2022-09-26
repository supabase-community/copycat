const workerFarm = require('worker-farm')
const { promisify } = require('util')
const { v4: uuid } = require('uuid')
const Stats = require('fast-stats').Stats

const { TRANSFORMATIONS } = require('../dist/testutils')

const METHOD_BLACKLIST = ['scramble']

const MAX_N = +(process.env.MAX_N ?? 999999)
const MIN_RUNS = Math.max(2, +(process.env.MIN_RUNS ?? 1))
const MAX_RUNS = +(process.env.MAX_RUNS ?? 999)
const MAX_N_SUM = +(process.env.MAX_N_SUM ?? MAX_N)
const MOE = +(process.env.MOE ?? 0.05)

const workerOptions = {
  workerOptions: {
    env: {
      IS_WORKER: '1',
    },
  }
}

const workers = workerFarm(workerOptions, require.resolve(__filename))

const runWorker = promisify(workers)

const findFirstCollisionN = (methodName) => {
  const fn = TRANSFORMATIONS[methodName]
  let i = -1
  const seen = new Set()
  let firstCollisionN = null
  let

  while (++i < MAX_N && firstCollisionN == null) {
    const result = fn(uuid()).toString()
    if (seen.has(result)) {
      firstCollisionN = i
    } else {
      seen.add(result)
    }
  }

  return firstCollisionN
}

const worker = (methodName, done) => {
  const stats = new Stats()
  let hasCollided = false
  let sum = 0

  const shouldContinue = () =>
    (sum < MAX_N_SUM) &&
    ((stats.length < MIN_RUNS) || (stats.moe() / stats.amean() > MOE && stats.length < MAX_RUNS))

  while (shouldContinue()) {
    const firstCollisionN = findFirstCollisionN(methodName)

    if (findFirstCollisionN != null) {
      hasCollided = true
      sum += findFirstCollisionN
    } else {
      sum = MAX_N
    }

    stats.push(firstCollisionN)
  }

  const [min, max] = stats.range()

  done(null, {
    methodName,
    mean: stats.amean().toFixed(2),
    stddev: stats.stddev().toFixed(2),
    moe: (stats.moe() / stats.amean()).toFixed(2),
    runs: stats.length,
    min,
    max,
    hasCollided,
  })
}

async function main() {
  await Promise.all(
    computeMethods().map(async (methodName) => {
      const results = await runWorker(methodName)
      console.log(JSON.stringify(results))
    })
  )

  workerFarm.end(workers)
}

function computeMethods() {
  const methodNames = new Set(Object.keys(TRANSFORMATIONS))

  for (const blacklistedMethodName of METHOD_BLACKLIST) {
    methodNames.delete(blacklistedMethodName)
  }

  return Array.from(methodNames)
}

module.exports = worker

if (require.main === module && !process.env.IS_WORKER) {
  main()
}
