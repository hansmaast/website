import { useOscillatorNode } from '~/composables/useOscillatorNode'

export const useAudio = () => {
  let audioCtx: AudioContext = new AudioContext()
  const mainGain: GainNode = new GainNode(audioCtx)

  const oscillator1 = useOscillatorNode(audioCtx, mainGain)
  const oscillator2 = useOscillatorNode(audioCtx, mainGain)
  const oscillator3 = useOscillatorNode(audioCtx, mainGain)
  const oscillator4 = useOscillatorNode(audioCtx, mainGain)
  const oscillator5 = useOscillatorNode(audioCtx, mainGain)

  const enableAudio = () => {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    oscillator1.start()
    oscillator2.start()
    oscillator3.start()
    oscillator4.start()
    oscillator5.start()
  }

  const setGain = (value: number) => {
    mainGain.gain.setValueAtTime(value, audioCtx.currentTime)
  }

  const randomizeFrequencies = () => {
    oscillator1.triggerRandom({ options: { delay: 0.015 } })
    oscillator2.triggerRandom({ options: { delay: 0.030 } })
    oscillator3.triggerRandom({ options: { delay: 0.045 } })
    oscillator4.triggerRandom({ options: { delay: 0.060 } })
    oscillator5.triggerRandom({ options: { duration: 0.8 } })
  }

  return { audioCtx, setGain, enableAudio, randomizeFrequencies }
}
