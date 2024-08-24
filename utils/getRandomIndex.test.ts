import { describe, it, expect } from 'vitest'
import { getRandomIndex } from './getRandomIndex'

describe('getRandomIndex', () => {
  it('should return an index within the valid range', () => {
    const length = 5
    const index = getRandomIndex(length)
    expect(index).toBeGreaterThanOrEqual(0)
    expect(index).toBeLessThan(length)
  })

  it('should handle a length of 1', () => {
    const length = 1
    const index = getRandomIndex(length)
    expect(index).toBe(0)
  })

  it('should handle a length of 0', () => {
    const length = 0
    const index = getRandomIndex(length)
    expect(index).toBeNaN()
  })
})
