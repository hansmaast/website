<script lang="ts" setup>
import { getRandomItems } from '~/utils/getRandomItems'

const props = withDefaults(defineProps<{
  items: string[]
  shuffleSpeedInMs?: number
  displayNumberOfItems?: number
  changeNumberOfItems?: number
}>(), {
  shuffleSpeedInMs: 3000,
  displayNumberOfItems: 4,
  changeNumberOfItems: 1,
})

const initialItems = getRandomItems(props.items, props.displayNumberOfItems)
const itemsToDisplay = ref(initialItems)
const itemsAlreadyDisplayed = reactive(new Set(initialItems))
const remainingItems = computed(() => props.items.filter(item => !itemsAlreadyDisplayed.has(item)))
const newItemsThatHaveNotBeenDisplayed = computed(() => getRandomItems(remainingItems.value, props.changeNumberOfItems))
watchEffect(() => {
  console.log('itemsAlreadyDisplayed', itemsAlreadyDisplayed)
  console.log('remainingItems', remainingItems.value)
  console.log('newItemsThatHaveNotBeenDisplayed', newItemsThatHaveNotBeenDisplayed.value)
})

onMounted(() => {
  const interval = setInterval(() => {
    newItemsThatHaveNotBeenDisplayed.value.forEach(item => itemsAlreadyDisplayed.add(item))
    if (itemsAlreadyDisplayed.size === props.items.length) {
      itemsAlreadyDisplayed.clear()
      itemsToDisplay.value.forEach(item => itemsAlreadyDisplayed.add(item))
    }
  }, props.shuffleSpeedInMs)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <TransitionGroup
    tag="figure"
    name="bounce"
    class="grid grid-cols-3 gap-2 justify-items-stretch w-full"
  >
    <figure
      v-for="item in itemsToDisplay"
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
