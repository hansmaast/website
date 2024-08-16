<script lang="ts" setup>
import { pickRandomItemsFromArray } from '~/utils/pickRandomItemsFromArray'

const props = withDefaults(defineProps<{
  items: string[]
  rolling: boolean
}>(), {
  rolling: false,
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
  let currentIndex = 0
  const interval = setInterval(() => {
    updateDisplayedItems(currentIndex)
    if (props.rolling)
      currentIndex = (currentIndex + 1) % 9
    else
      currentIndex = Math.floor(Math.random() * displayedItems.value.length)
  }, 700)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div class="grid grid-cols-3 gap-0 justify-items-stretch w-full">
    <figure
      v-for="item in displayedItems"
      :key="item"
      class="bg-amber-300 text-center p-4 border border-b-amber-100"
    >
      {{ item }}
    </figure>
  </div>
</template>
