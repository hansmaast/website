<script lang="ts" setup>
import type { RandomizerOptions } from '~/composables/useRandomizer'
import { useRandomizer } from '~/composables/useRandomizer'

const { items, options, cols } = withDefaults(defineProps<{
  items: string[]
  options: RandomizerOptions
  cols?: number
}>(), {
  cols: 2,
})
const { visibleItems } = useRandomizer<typeof items[0]>(items, options)
</script>

<template>
  <TransitionGroup
    tag="figure"
    :class="`grid gap-1 w-full h-full`"
    name="bounce"
  >
    <span
      v-for="(item) in visibleItems"
      :key="item"
      class="bg-emerald-800 text-orange-50 rounded-xl text-center p-4 border border-b-amber-100  flex items-center justify-center"
    >
      {{ item }}
    </span>
  </TransitionGroup>
</template>

<style scoped>
figure {
  grid-template-columns: repeat(v-bind(cols), 1fr);
}
.bounce-enter-active {
  animation: bounce-in 0.35s;
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
    transform: scale(0.75);
  }
  100% {
    transform: scale(1);
  }
}
</style>
