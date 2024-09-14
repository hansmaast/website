<script setup lang="ts">
import { thingsIDo } from '~/data.js'
import { useAudio } from '~/composables/useAudio'

const { audioCtx, enableAudio, randomizeFrequency } = useAudio()
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
          shuffleStaggerMs: 40,
          staggerIntervalMs: (4200 / (8 * 6)),
          onUpdate: () => randomizeFrequency(),

        }"
      />
    </template>
  </div>
</template>
