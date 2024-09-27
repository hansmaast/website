<script setup lang="ts">
import { useAudio } from '~/composables/useAudio'
import type { EnableAudioAlert } from '#build/components'

const audio = useAudio()
provide('audio', audio)
</script>

<template>
  <NuxtRouteAnnouncer />
  <EnableAudioAlert />
  <ThingsIdo />
</template>
