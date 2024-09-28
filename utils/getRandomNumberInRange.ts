export const getRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}
