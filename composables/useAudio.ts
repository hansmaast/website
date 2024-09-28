import { useOscillatorNode } from '~/composables/useOscillatorNode'

export const useAudio = () => {
  let audioCtx: AudioContext = new AudioContext()
  let mainGain: GainNode = new GainNode(audioCtx)

  const oscillator1 = useOscillatorNode(audioCtx, mainGain)

  const enableAudio = () => {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    if (!mainGain) {
      mainGain = new GainNode(audioCtx)
    }

    oscillator1.start()
  }

  const setGain = (value: number) => {
    mainGain.gain.setValueAtTime(value, audioCtx.currentTime)
  }

  return { audioCtx, setGain, enableAudio, randomizeFrequency: oscillator1.triggerRandom }
}
