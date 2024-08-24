export function getDifference<T>(a: T[], b: T[]): T[] {
  return a.filter(item => !b.includes(item))
}
