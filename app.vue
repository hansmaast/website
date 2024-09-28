<script setup lang="ts">
import { useAudio } from '~/composables/useAudio'

const audio = useAudio()
provide('audio', audio)
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="bg-orange-50 w-dvw h-dvh grid place-content-center place-items-center">
    <EnableAudioAlert />
    <ThingsIdo />
  </div>
</template>
