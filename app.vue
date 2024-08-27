<script setup lang="ts">
import { thingsIDo } from '~/data.js'
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="bg-amber-100 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <h1 class="text-4xl">
      Hi there. I'm Hans. A front-end developer.
    </h1>
    <GridSwitcher
      :items="thingsIDo"
      :options="{
        intervalMs: 3000,
        changeCount: 1,
        displayCount: 6,
        staggerCount: 6,
        shuffleStaggerMs: 200,
        staggerIntervalMs: 100 }"
    />
  </div>
</template>
