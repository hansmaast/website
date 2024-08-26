export function getUniqueIndex(usedIndexes: number[], length: number): number {
  if (usedIndexes.length >= length)
    throw new Error('No more unique indexes available')

  let index = getRandomIndex(length)

  while (usedIndexes.includes(index))
    index = getRandomIndex(length)

  return index
}
