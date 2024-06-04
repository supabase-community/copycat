/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  "transform": {
    "^.+\\.tsx?$": [
      "esbuild-jest",
      {
        sourcemap: true,
      }
    ]
  },
  "prettierPath": require.resolve('prettier-2'),
}