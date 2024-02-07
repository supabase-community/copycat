#!/usr/bin/env node
const semver = require('semver')
const version = require('../package.json').version
const cp = require('child_process')

const bump = process.env.BUMP ?? process.argv[2]

let result = version

if (bump) {
  if (bump === 'rc') {
    result = semver.prerelease(version)
      ? semver.inc(version, 'prerelease')
      : semver.inc(version, 'premajor', 'rc', 1)
  } else {
    result = semver.inc(version, bump, 1)
  }
}

if (!process.env.DRY) {
  cp.spawnSync('npm', ['pkg', 'set', `version=${result}`], { stdio: 'inherit' })
}

console.log(`Version bumped from ${version} to ${result}`)