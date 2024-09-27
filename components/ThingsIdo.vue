<script setup lang="ts">
import { thingsIDo } from '~/data.js'

const audio = inject<ReturnType<typeof useAudio>>('audio')
console.log(audio)
</script>

<template>
  <div class="bg-orange-50 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <h1 class="text-4xl">
      Some things i do.
    </h1>
    <GridSwitcher
      :items="thingsIDo"
      :cols="4"
      :options="{
        intervalMs: 4200,
        changeCount: 1,
        displayCount: 12,
        staggerCount: 12,
        shuffleStaggerMs: 55,
        staggerIntervalMs: 75,
        onUpdate: () => audio?.randomizeFrequency(),
      }"
    />
  </div>
</template>
