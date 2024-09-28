<script setup lang="ts">
import { SlidersVerticalIcon } from 'lucide-vue-next'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
</script>

<template>
  <Drawer title="Adjust sounds">
    <DrawerTrigger title="Adjust sound">
      <Button
        aria-hidden="true"
        variant="ghost"
        class="flex gap-2 justify-end"
      >
        <SlidersVerticalIcon />
      </Button>
    </DrawerTrigger>
    <DrawerContent class="max-w-5xl mx-auto">
      <DrawerHeader class="sm:text-center">
        <DrawerTitle>Audio controls</DrawerTitle>
        <DrawerDescription>
          Adjust some audio settings.
        </drawerdescription>
      </DrawerHeader>
      <div
        data-vaul-no-drag
        class="px-4 max-w-2xl"
      >
        <VolumeControl />
      </div>
    </DrawerContent>
  </Drawer>
</template>
