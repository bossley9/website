export function sortByDate(a: Date, b: Date) {
  return b.getTime() - a.getTime()
}

export function sortByAlpha(a: string, b: string) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}
