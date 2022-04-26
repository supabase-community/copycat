/** @type {import('prettier').RequiredOptions} */
module.exports = {
  trailingComma: 'es5',
  bracketSpacing: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  importOrder: ['^src/(.*)$', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
}
