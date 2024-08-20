<script lang="ts" setup>
import { pickRandomItemsFromArray } from '~/utils/pickRandomItemsFromArray'

const props = withDefaults(defineProps<{
  items: string[]
  shuffleSpeedInMs: number
}>(), {
  shuffleSpeedInMs: 3000,
})

const displayedItems = ref<string[]>([])

function updateDisplayedItems(index: number) {
  const newItems = pickRandomItemsFromArray<string>(props.items, 9)
  let newItem = newItems[index]
  while (displayedItems.value.includes(newItem)) {
    newItem = newItems[Math.floor(Math.random() * newItems.length)]
  }
  displayedItems.value[index] = newItem
}

onMounted(() => {
  displayedItems.value = pickRandomItemsFromArray(props.items, 9)

  const interval = setInterval(() => {
    const currentIndex = Math.floor(Math.random() * displayedItems.value.length)
    updateDisplayedItems(currentIndex)
  }, props.shuffleSpeedInMs)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <TransitionGroup
    tag="figure"
    name="bounce"
    class="grid grid-cols-3 gap-2 justify-items-stretch w-full"
  >
    <figure
      v-for="item in displayedItems"
      :key="item"
      class="bg-amber-300 text-center p-4 border border-b-amber-100"
    >
      <span :key="item">
        {{ item }}
      </span>
    </figure>
  </TransitionGroup>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.9s;
}
.bounce-leave-active {
  animation: bounce-in 0.9s reverse;
  position: absolute;
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
</style>
