export function truncateFraction(
  decimal: number,
  truncationOrder: number = 100000000000000, // 10^14,
): number {
  return Math.round(decimal * truncationOrder) / truncationOrder;
}
