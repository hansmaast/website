import { eMinorFrequencies } from '~/lib/scales'

function getFrequencyFromOctaveShift(baseFrequency: number, octaveShift: number): number {
  return baseFrequency * Math.pow(2, octaveShift)
}

export function getRandomFrequencyFromScale(
  scaleFrequencies: number[] = eMinorFrequencies,
  // Default to +/- 3 octaves
  octaveRange = 3,
): number {
  const randomIndex = getRandomIndex(scaleFrequencies.length)
  const baseFrequency = scaleFrequencies[randomIndex]
  const randomOctaveShift = Math.floor(Math.random() * 7) - octaveRange

  return getFrequencyFromOctaveShift(baseFrequency, randomOctaveShift)
}
