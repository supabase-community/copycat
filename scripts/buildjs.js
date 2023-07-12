const esbuild = require('esbuild');
const path = require('path');
const glob = require('glob');

const inputDir = './src';
const outputDir = './dist';

// Find all '.ts' files in inputDir (recursively), excluding '.test.ts' files
const files = glob.sync(`${inputDir}/**/*.ts`, { ignore: `${inputDir}/**/*.test.ts` });

const options = {
  format: 'cjs',
  platform: 'node',
  target: 'node14',
};

Promise.all(
  files.map((file) =>
    esbuild
      .build({
        ...options,
        entryPoints: [file],
        outfile: path.join(outputDir, path.relative(inputDir, file.replace(/\.ts$/, '.js'))),
      })
      .catch(() => process.exit(1))
  )
).then(() => console.log('All files have been successfully built.'));
