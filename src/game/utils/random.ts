/**
 * min (inclusive) and max (exclusive)
 */
export function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
