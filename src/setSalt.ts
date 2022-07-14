import { hash } from 'fictional'

export const setSalt = (nextSalt: string) => {
  ;(hash as any).salt = nextSalt
}
