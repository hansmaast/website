<script lang="ts" setup>
import type { RandomizerOptions } from '~/composables/useRandomizer'
import { useRandomizer } from '~/composables/useRandomizer'

const { items, options, cols } = withDefaults(defineProps<{
  items: string[]
  options?: Partial<RandomizerOptions>
  cols?: number
}>(), {
  cols: 2,
})
const { visibleItems, randomizeVisibleItems } = useRandomizer<typeof items[0]>(items, options)
</script>

<template>
  <TransitionGroup
    tag="figure"
    name="bounce"
    :class="`grid gap-4 w-full h-full`"
  >
    <span
      v-for="item in visibleItems"
      :key="item"
      class="bg-amber-300 text-center p-4 border border-b-amber-100  flex items-center justify-center"
    >
      {{ item }}
    </span>
  </TransitionGroup>
  <button
    class="mt-4"
    @click="randomizeVisibleItems"
  >
    Shuffle
  </button>
</template>

<style scoped>
figure {
  grid-template-columns: repeat(v-bind(cols), 1fr);
}
.bounce-enter-active {
  animation: bounce-in 0.6s;
}
.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
  position: absolute;
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
