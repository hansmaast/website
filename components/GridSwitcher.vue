<script lang="ts" setup>
import { pickRandomItemsFromArray } from '~/utils/pickRandomItemsFromArray'

const props = withDefaults(defineProps<{
  items: string[]
  shuffleSpeedInMs?: number
  displayNumberOfItems?: number
  changeNumberOfItems?: number
}>(), {
  shuffleSpeedInMs: 3000,
  displayNumberOfItems: 9,
  changeNumberOfItems: 4,
})

const displayedItems = ref<string[]>([])

const getRandomIndex = (arr: string[]) => Math.floor(Math.random() * arr.length)

const getRandomItems = () => pickRandomItemsFromArray(props.items, props.displayNumberOfItems)

function replaceItemAt(index: number) {
  let newItem = props.items[getRandomIndex(props.items)]
  while (displayedItems.value.includes(newItem))
    newItem = props.items[getRandomIndex(props.items)]
  displayedItems.value[index] = newItem
}

onMounted(() => {
  displayedItems.value = getRandomItems()

  const usedIndexes = new Set<number>()

  const updateItem = () => {
    let randomIndex = getRandomIndex(displayedItems.value)
    if (usedIndexes.size === displayedItems.value.length)
      usedIndexes.clear()
    while (usedIndexes.has(randomIndex))
      randomIndex = getRandomIndex(displayedItems.value)
    usedIndexes.add(randomIndex)
    replaceItemAt(randomIndex)
  }

  const interval = setInterval(() => {
    for (let i = 0; i < props.changeNumberOfItems; i++)
      updateItem()
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
