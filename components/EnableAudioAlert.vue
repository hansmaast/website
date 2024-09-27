<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const { audio } = useInjections()

const enableAudio = () => {
  audio?.enableAudio()
}
</script>

<template>
  <AlertDialog default-open>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Bang, bump up the volume!</AlertDialogTitle>
        <AlertDialogDescription>
          This site is made as an audio visual experience. Enable the audio to get the full experience, or proceed in silence.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Proceed in silence</AlertDialogCancel>
        <AlertDialogAction @click="enableAudio">
          Yes, turn it up!
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
