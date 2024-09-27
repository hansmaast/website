export const useInjections = () => ({
  audio: inject<ReturnType<typeof useAudio>>('audio'),
})
