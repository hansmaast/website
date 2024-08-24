import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { shuffleArray } from './shuffleArray'

/**
 * To avoid the test failing due to the random nature of shuffling,
 * you can use a deterministic approach by mocking the Math.random function.
 * This way, you can control the randomness and ensure consistent results during testing.
 */
function overrideMathRandom(original: typeof Math.random) {
  beforeEach(() => {
    // Save the original Math.random function.
    let callCount = 0
    // Mock Math.random to return a predictable sequence of numbers.
    Math.random = () => {
      const values = [0.1, 0.2, 0.3, 0.4, 0.5]
      return values[callCount++ % values.length]
    }
  })
  afterEach(() => {
    // Restore the original Math.random function.
    Math.random = original
  })
}

describe('shuffleArray', () => {
  overrideMathRandom(Math.random)

  it('should return an array of the same length', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(array)
    expect(shuffledArray).toHaveLength(array.length)
  })

  it('should contain the same elements as the original array', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(array)
    expect(shuffledArray).toEqual(expect.arrayContaining(array))
    expect(array).toEqual(expect.arrayContaining(shuffledArray))
  })

  it('should not return the same array (most of the time)', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = shuffleArray(array)
    // This test might fail occasionally due to the random nature of shuffling
    expect(shuffledArray).not.toEqual(array)
  })
})
