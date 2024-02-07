#!/usr/bin/env node
const semver = require('semver')
const util = require('util')
const cp = require('child_process')
const fs = require('fs/promises');
const path = require('path')

let packed = []

const doExec = util.promisify(cp.exec);

const exec = async (cmd, opts) => {
  console.log()
  console.log(`$ ${cmd}`)

  if (!process.env.DRY) {
    return await doExec(cmd, { stdio: 'inherit', ...opts })
  }

  console.log()
}

const readPkgVersion = async () => {
  const pkg = JSON.parse(await fs.readFile(require.resolve('../package.json')))
  return pkg.version
}

const bumpVersion = async (b) => {
  const a = await readPkgVersion()

  if (!process.env.DRY) {
    await exec(`npm pkg set version=${b}`)
  }

  console.log(`Version bumped from ${a} to ${b}`)
}

const computeVersion = async (bumpType) => {
  const pkg = JSON.parse(await fs.readFile(require.resolve('../package.json')))
  const currentVersion = pkg.version

  let result

  if (bumpType === 'preview') {
   result = semver.inc(currentVersion, 'premajor', 'preview')
  } else {
   result = semver.inc(currentVersion, bumpType, 1)
  }

  return result
}

const publish = async () => {
  const version = await readPkgVersion()
  await exec(`git add package.json`)
  await exec(`git commit -m "chore: v${version}"`)
  await exec(`npm pack`)

  packed.push(`snaplet-copycat-${version}.tgz`)

  await exec(`git tag v${version}`)
  await exec('git push && git push --tags')
}

const ensureCleanGitState = () => {
  console.log('Ensuring clean git state')
  return exec('git clean -df && git checkout main && git pull --rebase && git push')
}

const releasePreviewVersion = async () => {
  const previewVersion = await computeVersion('preview')
  console.log(`Releasing preview version: ${previewVersion}`)

  console.log('Ensuring dependencies are in sync with lockfile for preview version')
  await exec(`git checkout v${await readPkgVersion()}`)
  await exec('yarn install')
  await exec(`yarn build`)
  await exec('git checkout main')

  console.log('Building `@snaplet/copycat/next`')
  await exec('yarn install')
  await exec(`yarn build:next`)

  await bumpVersion(previewVersion)
  await publish()
}

const releaseVersion = async () => {
  const version = await computeVersion('major')
  console.log(`Releasing version ${version}`)

  console.log('Ensuring dependencies are in sync with lockfile')
  await exec('yarn install')

  await exec(`yarn build`)

  await bumpVersion(version)
  await publish()
}

const npmPublishPacked = async () => {
  console.log('Attempting to `npm publish` packaged releases')
  const failed = []

  for (const filename of packed) {
    try {
      await exec(`npm publish --access=public ${path.join(process.cwd(), filename)}`, {
        shell: true
      })
    } catch (e) {
      console.log(e)
      failed.push(filename)
    }
  }

  if (failed.length) {
    console.log(`The following files failed to be published to npm and will need to be published manually:\n${failed.join(', ')}`)
  }
}

const main = async () => {
  const bumpType = process.argv[2]

  if (process.argv.find((v) => v === '-h' || v === '--help' || v === 'help') || !bumpType) {
    console.log(`
yarn release: Script for releasing copycat

If a major version is given, will also first release a preview version (where \`@snaplet/copycat/next\` previews the changes)

Usage: yarn release <major|minor|patch>

Example: yarn release major
`)
    return
  }

  await ensureCleanGitState()

  if (bumpType === 'major') {
    await releasePreviewVersion()
  }

  await releaseVersion(bumpType)

  await npmPublishPacked()
}

main()