export function toFiniteNumber(value: unknown, fallback = 0): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export function formatFixed(value: unknown, digits: number, fallback = '--'): string {
  // Guard against null or undefined and non-number values
  if (value == null) return fallback;
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return value.toFixed(digits);
}

