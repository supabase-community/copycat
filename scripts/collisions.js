const workerFarm = require('worker-farm')
const { promisify } = require('util')
const { v4: uuid } = require('uuid')
const Stats = require('fast-stats').Stats

const { TRANSFORMATIONS } = require('../dist/testutils')

const METHOD_BLACKLIST = ['scramble']

const MAX_N = +(process.env.MAX_N ?? 999999)
const MIN_RUNS = Math.max(2, +(process.env.MIN_RUNS ?? 100))
const MAX_RUNS = +(process.env.MAX_RUNS ?? 1000)
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
  const seen = {}
  let firstCollisionN = null

  while (++i < MAX_N && firstCollisionN == null) {
    const result = fn(uuid()).toString()
    if (seen[result]) {
      firstCollisionN = i
    } else {
      seen[result] = true
    }
  }

  return firstCollisionN
}

const worker = (methodName, done) => {
  const stats = new Stats()

  while ((stats.length < MIN_RUNS || (stats.moe() / stats.amean() > MOE && stats.length < MAX_RUNS))) {
    const firstCollisionN = findFirstCollisionN(methodName)
    stats.push(firstCollisionN)
  }

  done(null, {
    methodName,
    mean: stats.amean().toFixed(2),
    stddev: stats.stddev().toFixed(2),
    moe: (stats.moe() / stats.amean()).toFixed(2),
    runs: stats.length,
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
