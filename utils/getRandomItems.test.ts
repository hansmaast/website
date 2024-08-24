import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getRandomItems } from './getRandomItems'

function overrideMathRandom(original: typeof Math.random) {
  beforeEach(() => {
    let callCount = 0
    Math.random = () => {
      const values = [0.1, 0.2, 0.3, 0.4, 0.5]
      return values[callCount++ % values.length]
    }
  })
  afterEach(() => {
    Math.random = original
  })
}

describe('getRandomItems', () => {
  overrideMathRandom(Math.random)

  it('should return an array of the requested length', () => {
    const array = [1, 2, 3, 4, 5]
    const count = 3
    const result = getRandomItems(array, count)
    expect(result).toHaveLength(count)
  })

  it('should contain elements from the original array', () => {
    const array = [1, 2, 3, 4, 5]
    const count = 3
    const result = getRandomItems(array, count)
    expect(array).toEqual(expect.arrayContaining(result))
  })

  it('should handle cases where the requested count is greater than the array length', () => {
    const array = [1, 2, 3]
    const count = 5
    const result = getRandomItems(array, count)
    expect(result).toHaveLength(array.length)
  })

  it('should handle an empty array', () => {
    const array: number[] = []
    const count = 3
    const result = getRandomItems(array, count)
    expect(result).toEqual([])
  })
})
