<script setup lang="ts">
import { thingsIDo } from '~/data.js'
</script>

<template>
  <div class="bg-amber-100 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <NuxtRouteAnnouncer />
    <GridSwitcher
      :items="thingsIDo"
      :cols="3"
      :options="{ displayCount: 9, changeCount: 3, intervalMs: 2200 }"
    />
  </div>
</template>
