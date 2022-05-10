import { join, char, times } from 'fictional'

export const phoneNumber = join('', [
  '+',
  times([2, 3], char.digit),
  times([10, 12], char.digit),
])
