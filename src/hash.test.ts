import { copycat } from '.'

test('generating hash key with string shorter than 16 byte', () => {
  const input = 'a'
  const output = copycat.generateHashKey(input)
  expect(`${output}`).toEqual(`${[808870450, 808464438, 808464432, 808464432]}`)
})

test('generating hash key with string longer than 16 byte', () => {
  const input = 'deedbeefthanksforthefish'
  const output = copycat.generateHashKey(input)
  expect(`${output}`).toEqual(
    `${[1714447409, 1647524146, 892691557, 808478002]}`
  )
})

test('generating hash key with string exactly 16 byte', () => {
  const input = '1234567891234567'
  const output = copycat.generateHashKey(input)
  expect(`${output}`).toEqual(`${[875770417, 943142453, 858927417, 926299444]}`)
})
