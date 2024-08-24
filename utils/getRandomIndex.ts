export function getRandomIndex(length: number): number {
  if (length === 0)
    return NaN
  return Math.floor(Math.random() * length)
}
