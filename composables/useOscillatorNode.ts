import { eMinorFrequencies } from '~/lib/scales'
import { getRandomNumberInRange } from '~/utils/getRandomNumberInRange'
import { getRandomFrequencyFromScale } from '~/utils/getNoteFrequencyFromScale'

type TriggerOptions = {
  duration?: number
  delay?: number
}

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
    oscillatorGain.gain.setValueAtTime(0, audioCtx.currentTime)
  }

  const trigger = ({ freq, duration = 0.45, delay = 0 }: { freq: number } & TriggerOptions) => {
    const partOfDuration = duration / 3
    const now = audioCtx.currentTime
    const triggerTime = now + delay
    oscillator.frequency.setValueAtTime(freq, triggerTime)
    oscillatorGain.gain.setTargetAtTime(0.2, triggerTime, partOfDuration)
    oscillatorGain.gain.setTargetAtTime(0, triggerTime + partOfDuration, partOfDuration)
  }

  const triggerRandom = ({ scale = eMinorFrequencies, options }: { scale?: number[], options?: TriggerOptions }) => {
    if (!scale)
      trigger({
        freq: getRandomNumberInRange(60, 1200),
        ...options,
      })
    else
      trigger({
        freq: getRandomFrequencyFromScale(scale, 2),
        ...options,
      })
  }

  return { connect, start, triggerRandom }
}
