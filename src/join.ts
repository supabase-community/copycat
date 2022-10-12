import { hash, Input, join as fictionalJoin, JSONSerializable } from 'fictional'
import { Transform } from './types'

interface JoinOptions {
  limit?: number
}

interface SegmentBudgetMetadata {
  limit: number
  fixedLen: number
  fnSegmentCount: number
}

interface SegmentBudgetState {
  seenFnSegmentCount: number
  takenFnSegmentLen: number
}

const joinEntry = (a: any, b: any, c: any, d: any) =>
  c != null ? joinMain(a, b, c, d) : joinCurried(a, b)

export const join = joinEntry as unknown as typeof joinCurried & typeof joinMain

export const joinCurried =
  (joiner: string, segments: Transform[]) =>
  (input: Input, options?: JoinOptions) =>
    joinMain(input, joiner, segments, options)

export const joinMain = (
  input: Input,
  joiner: string,
  segments: Transform[],
  options: JoinOptions = {}
) => {
  const { limit } = options

  if (limit == null) {
    return fictionalJoin(input, joiner, segments)
  }

  let nextInput = hash([input, 'copycat:join'] as JSONSerializable)

  const segmentBudgetMetadata = computeSegmentBudgetMetadata(
    segments,
    joiner,
    limit
  )

  let segmentBudgetState: SegmentBudgetState = {
    seenFnSegmentCount: 0,
    takenFnSegmentLen: 0,
  }

  const resolvedSegments = []

  for (const segment of segments) {
    nextInput = hash(nextInput)

    const [nextSegmentBudgetState, segmentResult] = resolveSegment(
      nextInput,
      segmentBudgetState,
      segmentBudgetMetadata,
      segment
    )

    segmentBudgetState = nextSegmentBudgetState

    if (segmentResult) {
      resolvedSegments.push(segmentResult)
    }
  }

  return resolvedSegments.join(joiner)
}

const resolveSegment = (
  input: Input,
  state: SegmentBudgetState,
  metadata: SegmentBudgetMetadata,
  segment: Transform
): [SegmentBudgetState, string] => {
  if (typeof segment !== 'function') {
    return [state, (segment as string).toString()]
  }

  const budget = computeSegmentBudget(state, metadata)

  const segmentResult = segment(input, { limit: budget })
    .toString()
    .slice(0, budget)

  const nextState: SegmentBudgetState = {
    seenFnSegmentCount: state.seenFnSegmentCount + 1,
    takenFnSegmentLen: state.takenFnSegmentLen + segmentResult.length,
  }

  return [nextState, segmentResult]
}

const computeSegmentBudgetMetadata = (
  segments: Transform[],
  joiner: string,
  limit: number
) => {
  let fixedSegmentLen = 0
  let fnSegmentCount = 0

  for (const segment of segments) {
    if (typeof segment === 'function') {
      fnSegmentCount++
    } else {
      fixedSegmentLen += (segment as string).toString().length
    }
  }

  const joinsLen = segments.length * joiner.length
  const fixedLen = fixedSegmentLen + joinsLen

  return {
    limit,
    fixedLen,
    fnSegmentCount,
  }
}

const computeSegmentBudget = (
  state: SegmentBudgetState,
  metadata: SegmentBudgetMetadata
) => {
  const { fnSegmentCount, fixedLen, limit } = metadata
  const { seenFnSegmentCount, takenFnSegmentLen } = state
  const availableLen = limit - fixedLen - takenFnSegmentLen
  const remainingSegmentCount = fnSegmentCount - seenFnSegmentCount
  return Math.max(0, Math.floor(availableLen / remainingSegmentCount))
}
