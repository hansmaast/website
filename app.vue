<script setup lang="ts">
import { thingsIDo } from '~/data.js'

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

const changeOscillatorFrequency = (frequency: number) => {
  if (oscillator && audioCtx.value && gainNode.value) {
    gainNode.value.gain.setTargetAtTime(1, audioCtx.value.currentTime, 0.04)
    oscillator.frequency.setValueAtTime(frequency, audioCtx.value.currentTime)
    gainNode.value.gain.setTargetAtTime(0, audioCtx.value.currentTime + 0.2, 0.2)
  }
}

const generateRandomFrequency = (range = { min: 400, max: 500 }) => {
  return Math.random() * (range.max - range.min) + range.min
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="bg-orange-50 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <template v-if="!audioCtx">
      <button
        class="bg-amber-500 text-white p-2 rounded-lg"
        @click="enableAudio"
      >
        enable audio
      </button>
    </template>
    <template v-else>
      <h1 class="text-4xl">
        Some things i do.
      </h1>
      <GridSwitcher
        :items="thingsIDo"
        :cols="5"
        :options="{
          intervalMs: 4200,
          changeCount: 1,
          displayCount: 10,
          staggerCount: 8,
          shuffleStaggerMs: 10,
          staggerIntervalMs: (4200 / 16),
          onUpdate: () => changeOscillatorFrequency(generateRandomFrequency({ min: 50, max: 250 })),

        }"
      />
    </template>
  </div>
</template>
