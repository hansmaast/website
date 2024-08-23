import { shuffleArray } from './shuffleArray'

export function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray<T>(array).slice(0, count)
}
