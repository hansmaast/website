export const useAudio = () => {
  const audioCtx = ref<AudioContext | null>(null)
  const gainNode = ref<GainNode | null>(null)
  let oscillator: OscillatorNode

  const enableAudio = () => {
    audioCtx.value = new AudioContext()
    gainNode.value = audioCtx.value.createGain()
    oscillator = audioCtx.value.createOscillator()
    oscillator.type = 'sine'
    oscillator.connect(gainNode.value).connect(audioCtx.value.destination)
    oscillator.start()
  }

  const setOscillatorFrequency = (oscillator: OscillatorNode, frequency: number) => {
    if (oscillator && audioCtx.value && gainNode.value) {
      gainNode.value.gain.setTargetAtTime(1, audioCtx.value.currentTime, 0.025)
      oscillator.frequency.setValueAtTime(frequency, audioCtx.value.currentTime)
      gainNode.value.gain.setTargetAtTime(0, audioCtx.value.currentTime + 0.025, 0.025)
    }
  }

  const generateRandomFrequency = (range = { min: 20, max: 1200 }) => {
    return Math.random() * (range.max - range.min) + range.min
  }

  const randomizeFrequency = () => {
    setOscillatorFrequency(oscillator, generateRandomFrequency())
  }

  return { audioCtx, enableAudio, randomizeFrequency }
}
