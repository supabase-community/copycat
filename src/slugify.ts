// note(justinvdm, 31 December 2023): Taken from https://gist.github.com/codeguy/6684588?permalink_comment_id=3361909#gistcomment-3361909
export const slugify = (text: string): string =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
