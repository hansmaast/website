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
        class="bg-orange-950 text-orange-50 rounded-xl p-4 "
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
        :cols="4"
        :options="{
          intervalMs: 4200,
          changeCount: 1,
          displayCount: 12,
          staggerCount: 12,
          shuffleStaggerMs: 55,
          staggerIntervalMs: 75,
          onUpdate: () => randomizeFrequency(),
        }"
      />
    </template>
  </div>
</template>
