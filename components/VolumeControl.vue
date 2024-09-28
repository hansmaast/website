<script setup lang="ts">
import { ref } from 'vue'
import { SliderRoot, SliderThumb } from 'radix-vue'

const DEFAULT_VALUE = 75

const { audio } = useInjections()

const sliderValue = ref([DEFAULT_VALUE])

watch(sliderValue, value => audio?.setGain(value[0] / 127))
</script>

<template>
  <div class="flex-col gap-4 max-w-28">
    <div class="flex justify-center text-center">
      <div
        v-for="l in 'Volume'.split('')"
        :key="l"
        class="m-0"
      >
        {{ l }}
      </div>
    </div>
    <SliderRoot
      v-model="sliderValue"
      orientation="vertical"
      class=" h-[50vh] max-h-[400px] relative flex select-none touch-none border border-orange-100 rounded-tl-[50px] rounded-tr-[25px]"
      :max="127"
      :step="1"
    >
      <SliderThumb
        class="h-20 w-full bg-black flex justify-center items-center text-orange-50 rounded-tl-[50px] rounded-tr-[25px]"
        aria-label="Volume"
      >
        <span>{{ sliderValue.at(0) }}</span>
        <div class="absolute bg-orange-100 h-[700px] w-full top-full" />
      </SliderThumb>
    </SliderRoot>
  </div>
</template>
