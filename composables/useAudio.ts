export const useAudio = () => {
  let audioCtx: AudioContext | null = null
  let mainGain: GainNode

  let oscillator: OscillatorNode
  let oscillatorGain: GainNode

  const enableAudio = () => {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    if (!mainGain) {
      mainGain = new GainNode(audioCtx)
    }

    if (!oscillator) {
      oscillator = audioCtx.createOscillator()
    }

    if (!oscillator.type) {
      oscillator.type = 'sine'
    }

    if (!oscillatorGain) {
      oscillatorGain = new GainNode(audioCtx)
    }

    oscillator
      .connect(oscillatorGain)
      .connect(mainGain)
      .connect(audioCtx.destination)

    oscillator.start()
  }

  const setOscillatorFrequency = (oscillator: OscillatorNode, frequency: number) => {
    if (oscillator && audioCtx && mainGain && oscillatorGain) {
      oscillatorGain.gain.setTargetAtTime(1, audioCtx.currentTime, 0.025)
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)
      oscillatorGain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.025, 0.025)
    }
  }

  const setGain = (value: number) => {
    if (audioCtx && mainGain)
      mainGain.gain.setValueAtTime(value, audioCtx.currentTime)
  }

  const generateRandomFrequency = (range = { min: 20, max: 1200 }) => {
    return Math.random() * (range.max - range.min) + range.min
  }

  const randomizeFrequency = () => {
    setOscillatorFrequency(oscillator, generateRandomFrequency())
  }

  return { audioCtx, setGain, enableAudio, randomizeFrequency }
}
