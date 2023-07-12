import { hash } from 'fictional'

// We'll use this function to generate a hash key using fictional requirement
// for a 16 character string from arbitrary long string input.
function derive16CharacterString(input: string) {
  const base = 33
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * base + input.charCodeAt(i)) % Number.MAX_SAFE_INTEGER
  }

  const hashString = hash.toString(16)
  let output = ''

  for (let i = 0; i < 16; i += 4) {
    output += hashString.slice(i, i + 4)
  }

  return output.padEnd(16, '0')
}

export const setHashKey = hash.setKey

export const generateHashKey = (input: string) => {
  return input.length === 16
    ? hash.generateKey(input)
    : hash.generateKey(derive16CharacterString(input))
}
