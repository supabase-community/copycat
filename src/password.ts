import { char, join, oneOf, oneOfWeighted, times } from 'fictional'

export const password = join('', [
  times(
    [12, 14],
    oneOfWeighted([
      [0.8, char.alphanumeric],
      [0.2, oneOf('@!#$%^&*{}[]'.split(''))],
    ])
  ),
])
