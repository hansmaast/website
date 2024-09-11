import type { UnwrapRefSimple } from '@vue/reactivity'
import { getRandomItems } from '~/utils/getRandomItems'
import { getUniqueIndex } from '~/utils/getUniqueIndex'
import { getDifference } from '~/utils/getDifference'
import { sleep } from '~/utils/sleep'

type Options = {
  displayCount: number
  changeCount: number
  intervalMs: number
  staggerCount: number
  staggerIntervalMs: number
  shuffleStaggerMs: number
  onUpdate: () => void
}

const defaultOptions: Options = {
  displayCount: 4,
  changeCount: 1,
  intervalMs: 1000,
  staggerCount: 3,
  staggerIntervalMs: 100,
  shuffleStaggerMs: 150,
  onUpdate: () => {},
}

function useRandomizer<T>(items: T[], options: Options) {
  options = { ...defaultOptions, ...options }

  if (items.length <= options.displayCount)
    console.warn('`props.displayNumberOfItems` should be less than the total number of items')

  if (options.changeCount > options.displayCount)
    console.warn('`props.changeNumberOfItems` should be less than or equal to `props.displayNumberOfItems`')

  const { displayCount, changeCount, intervalMs } = options

  const visibleItems = ref<T[]>(getRandomItems(items, displayCount))

  let insertedIndexes: number[] = []
  const getAndUpdateUniqueIndex = (): number => {
    if (insertedIndexes.length === displayCount)
      insertedIndexes = []
    const uniqueIndex = getUniqueIndex(insertedIndexes, displayCount)
    insertedIndexes.push(uniqueIndex)
    return uniqueIndex
  }

  let previouslyDisplayedItems: T[] = visibleItems.value.slice() as T[]
  const updateVisibleItems = (newItem: T) => {
    options.onUpdate()
    const uniqueIndex = getAndUpdateUniqueIndex()
    const newVisibleItems = visibleItems.value.toSpliced(uniqueIndex, 1, newItem as UnwrapRefSimple<T>)
    if (previouslyDisplayedItems.length === items.length)
      previouslyDisplayedItems = newVisibleItems as T[]
    else
      previouslyDisplayedItems.push(newItem)
    visibleItems.value = newVisibleItems
  }

  const getRemainingItems = (): T[] => {
    let remainingItems = getDifference(items, previouslyDisplayedItems)
    if (remainingItems.length < changeCount)
      remainingItems = getDifference(items, visibleItems.value as T[])
    return remainingItems
  }

  const randomizeVisibleItems = () => {
    const remainingItems = getRemainingItems()
    getRandomItems(remainingItems, changeCount).forEach(updateVisibleItems)
  }

  const constructDelay = async () => {
    if (!options.staggerCount || !options.staggerIntervalMs) return
    for (let i = 0; i < options.staggerCount; i++) {
      randomizeVisibleItems()
      await sleep((options.staggerIntervalMs + ((i * 0.5) * options.shuffleStaggerMs)) || 0)
    }
  }

  const handleRandomization = async () => {
    if (options.staggerCount && options.staggerIntervalMs)
      await constructDelay()
    else
      randomizeVisibleItems()
  }

  let interval: NodeJS.Timeout
  const handleMount = async () => {
    await handleRandomization()
    interval = setInterval(handleRandomization, intervalMs)
  }

  const handleUnmount = () => clearInterval(interval)

  onMounted(handleMount)
  onBeforeUnmount(handleUnmount)

  return { visibleItems, randomizeVisibleItems }
}

export { useRandomizer }
export type { Options as RandomizerOptions }
