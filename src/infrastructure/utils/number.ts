export function toFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function formatFixed(value: unknown, digits: number, fallback = '--'): string {
  if (value == null) return fallback
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback
  return value.toFixed(digits)
}
