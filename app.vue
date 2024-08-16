<script setup lang="ts">
import { technologiesIKnow } from '~/data.js'
</script>

<template>
  <div class="bg-amber-100 w-dvw h-dvh grid gap-4 place-content-center place-items-center">
    <NuxtRouteAnnouncer />
    <GridSwitcher :items="technologiesIKnow" />
  </div>
</template>
