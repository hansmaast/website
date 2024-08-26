import type { UnwrapRefSimple } from '@vue/reactivity'
import { getRandomItems } from '~/utils/getRandomItems'
import { getUniqueIndex } from '~/utils/getUniqueIndex'
import { getDifference } from '~/utils/getDifference'

type Options = { displayCount: number, changeCount: number, intervalMs: number }
export type { Options as RandomizerOptions }

const defaultOptions: Options = { displayCount: 4, changeCount: 1, intervalMs: 1000 }

export function useRandomizer<T>(items: T[], options?: Partial<Options>) {
  options = { ...defaultOptions, ...options }

  if (items.length <= options.displayCount)
    console.warn('`props.displayNumberOfItems` should be less than the total number of items')

  if (options.changeCount > options.displayCount)
    console.warn('`props.changeNumberOfItems` should be less than or equal to `props.displayNumberOfItems`')

  const { displayCount, changeCount, intervalMs } = options

  const visibleItems = ref<T[]>(getRandomItems(items, displayCount))

  let previouslyDisplayedItems: T[] = visibleItems.value.slice() as T[]

  let insertedIndexes: number[] = []
  const getAndUpdateUniqueIndex = (): number => {
    if (insertedIndexes.length === displayCount)
      insertedIndexes = insertedIndexes.slice(-changeCount)
    const uniqueIndex = getUniqueIndex(insertedIndexes, displayCount)
    insertedIndexes.push(uniqueIndex)
    return uniqueIndex
  }

  const getRemainingItems = (): T[] => {
    let remainingItems = getDifference(items, previouslyDisplayedItems)
    if (remainingItems.length < changeCount!)
      remainingItems = getDifference(items, visibleItems.value as T[])
    return remainingItems
  }

  const randomizeVisibleItems = () => {
    const remainingItems = getRemainingItems()
    getRandomItems(remainingItems, changeCount!).forEach((newItem) => {
      const uniqueIndex = getAndUpdateUniqueIndex()
      const newVisibleItems = visibleItems.value.toSpliced(uniqueIndex, 1, newItem as UnwrapRefSimple<T>)
      if (previouslyDisplayedItems.length === items.length)
        previouslyDisplayedItems = newVisibleItems as T[]
      else
        previouslyDisplayedItems.push(newItem)
      visibleItems.value = newVisibleItems
    })
  }

  const setAndClearInterval = () => {
    if (intervalMs! <= 0)
      return
    const interval = setInterval(randomizeVisibleItems, intervalMs)
    onBeforeUnmount(() => {
      clearInterval(interval)
    })
  }

  onMounted(setAndClearInterval)

  return { visibleItems, randomizeVisibleItems }
}
