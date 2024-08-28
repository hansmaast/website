<script setup lang="ts">
import { thingsIDo } from '~/data.js'
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="bg-orange-50 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <h1 class="text-4xl">
      Hi there. I'm Hans. A front-end developer.
    </h1>
    <GridSwitcher
      :items="thingsIDo"
      :cols="4"
      :options="{
        intervalMs: 5500,
        changeCount: 1,
        displayCount: 8,
        staggerCount: 8,
        shuffleStaggerMs: 66,
        staggerIntervalMs: 100 }"
    />
  </div>
</template>
