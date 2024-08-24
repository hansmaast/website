import { describe, it, expect } from 'vitest'
import { getDifference } from './getDifference'

describe('getDifference', () => {
  it('should return the difference of two arrays with some common elements', () => {
    const arrayA = [1, 2, 3, 4]
    const arrayB = [3, 4, 5, 6]
    const result = getDifference(arrayA, arrayB)
    expect(result).toEqual([1, 2])
  })

  it('should return the original array if there are no common elements', () => {
    const arrayA = [1, 2, 3]
    const arrayB = [4, 5, 6]
    const result = getDifference(arrayA, arrayB)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an empty array if the first array is empty', () => {
    const arrayA: number[] = []
    const arrayB = [1, 2, 3]
    const result = getDifference(arrayA, arrayB)
    expect(result).toEqual([])
  })

  it('should return the original array if the second array is empty', () => {
    const arrayA = [1, 2, 3]
    const arrayB: number[] = []
    const result = getDifference(arrayA, arrayB)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an empty array if both arrays are empty', () => {
    const arrayA: number[] = []
    const arrayB: number[] = []
    const result = getDifference(arrayA, arrayB)
    expect(result).toEqual([])
  })
})
