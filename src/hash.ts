import { HashKey, hash } from 'fictional'

// We need to be able to get and set the hash key used by fictional from outside of fictional.
// for the copycat.unique method to work.
const hashKey = {
  value: hash.generateKey('chinochinochino!') as string | HashKey,
}
export function getHashKey() {
  return hashKey.value
}

function setKey(key: string | HashKey) {
  hashKey.value = key
  return hash.setKey(key)
}

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

export const setHashKey = setKey

export const generateHashKey = (input: string) => {
  return input.length === 16
    ? hash.generateKey(input)
    : hash.generateKey(derive16CharacterString(input))
}
