import { eMinorFrequencies } from '~/lib/scales'
import { getRandomNumberInRange } from '~/utils/getRandomNumberInRange'
import { getRandomFrequencyFromScale } from '~/utils/getNoteFrequencyFromScale'

export const useOscillatorNode = (audioCtx: AudioContext, mainGain: GainNode) => {
  const oscillator: OscillatorNode = new OscillatorNode(audioCtx)
  const oscillatorGain: GainNode = new GainNode(audioCtx)
  const connected = false

  const connect = () => {
    oscillator
      .connect(oscillatorGain)
      .connect(mainGain)
      .connect(audioCtx.destination)
  }

  const start = () => {
    if (!connected)
      connect()
    oscillator.start()
  }

  const trigger = (freq: number, duration = 0.45) => {
    const partOfDuration = duration / 3
    const now = audioCtx.currentTime
    oscillator.frequency.setValueAtTime(freq, now)
    oscillatorGain.gain.setTargetAtTime(1, now, partOfDuration)
    oscillatorGain.gain.setTargetAtTime(0, now + partOfDuration, partOfDuration)
  }

  const triggerRandom = (scale = eMinorFrequencies) => {
    if (!scale)
      trigger(getRandomNumberInRange(60, 1200))
    else
      trigger(getRandomFrequencyFromScale(scale, 2))
  }

  return { connect, start, triggerRandom }
}
