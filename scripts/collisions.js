const workerFarm = require('worker-farm')
const { promisify } = require('util')
const { v4: uuid } = require('uuid')
const Stats = require('fast-stats').Stats

const { TRANSFORMATIONS } = require('../dist/testutils')

const METHODS = process.env.METHODS ? process.env.METHODS.split(',') : [
  'username',
  'email',
  'int',
  'dateString',
  'ipv4',
  'mac',
  'float',
  'fullName',
  'streetAddress',
  'postalAddress',
  'password',
  'uuid',
]

const MAX_N = +(process.env.MAX_N ?? 999999)
const MIN_RUNS = Math.max(2, +(process.env.MIN_RUNS ?? 100))
const MAX_SUM = +(process.env.MAX_SUM ?? MAX_N)
const LO_MOE = +(process.env.MOE ?? 0.05)
const HI_MOE = +(process.env.MOE ?? 0.10)
const MAX_DURATION = +(process.env.MAX_MS ?? 1000 * 60 * 5)

const workerOptions = {
  workerOptions: {
    env: {
      MAX_N,
      MIN_RUNS,
      MAX_SUM,
      LO_MOE,
      HI_MOE,
      MAX_DURATION,
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
  let startTime = Date.now()
  let numRuns = 0

  const computeMoe = () => stats.length > 2 && stats.amean() > 0
      ? stats.moe() / stats.amean()
      : null

  const computeDuration = () => Date.now() - startTime

  const isComplete = () => {
    const duration = computeDuration()

    const moe = computeMoe()
    return numRuns >= MIN_RUNS &&
      ((duration >= MAX_DURATION) ||
       ((moe != null && (moe <= LO_MOE || (moe <= HI_MOE && sum >= MAX_SUM))) || (moe == null && !hasCollided)))
  }

  while (!isComplete()) {
    const firstCollisionN = findFirstCollisionN(methodName)

    if (firstCollisionN != null) {
      hasCollided = true
      sum += firstCollisionN
      stats.push(firstCollisionN)
    } else {
      sum = MAX_N
    }

    numRuns++
  }

  const [min = null, max = null] = stats.range() ?? []

  done(null, {
    methodName,
    mean: format(stats.amean()),
    stddev: format(stats.stddev()),
    moe: format(computeMoe()),
    runs: numRuns,
    n: stats.length,
    min,
    max,
    sum,
    hasCollided,
    duration: computeDuration()
  })
}

const format = (v) => v == null || isNaN(v) ? null : v.toFixed(2)

async function main() {
  await Promise.all(
    METHODS.map(async (methodName) => {
      const results = await runWorker(methodName)
      console.log(JSON.stringify(results))
    })
  )

  workerFarm.end(workers)
}

module.exports = worker

if (require.main === module && !process.env.IS_WORKER) {
  main()
}
