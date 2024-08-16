export function pickRandomItemsFromArray<T>(array: T[], count: number): T[] {
  return shuffleArray<T>(array).slice(0, count)
}
