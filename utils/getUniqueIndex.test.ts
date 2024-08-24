import { describe, it, expect } from 'vitest'
import { getUniqueIndex } from './getUniqueIndex'

describe('getUniqueIndex', () => {
  it('should not return a used index', () => {
    const usedIndexes = [1, 2, 4]
    const length = 5
    const index = getUniqueIndex(usedIndexes, length)
    expect(usedIndexes).not.toContain(index)
  })

  it('should throw an error if no more unique indexes are available', () => {
    const usedIndexes = [0, 1, 2, 3, 4]
    const length = 5
    expect(() => getUniqueIndex(usedIndexes, length)).toThrow()
  })
})
