<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { thingsIDo } from '~/lib/thingsIDo.js'

const { audio } = useInjections()

const isMobile = useMediaQuery('(max-width: 640px)')
const cols = computed(() => isMobile.value ? 2 : 3)
</script>

<template>
  <div class="w-screen max-w-2xl grid gap-8  p-4">
    <h1 class="text-4xl place-self-center">
      Some things i do.
    </h1>
    <GridSwitcher
      :items="thingsIDo"
      :cols="cols"
      :options="{
        intervalMs: 4200,
        changeCount: 1,
        displayCount: 12,
        staggerCount: 12,
        shuffleStaggerMs: 55,
        staggerIntervalMs: 75,
        onUpdate: () => audio?.randomizeFrequencies(),
      }"
    />
    <div class="place-self-end">
      <AudioControls />
    </div>
  </div>
</template>
