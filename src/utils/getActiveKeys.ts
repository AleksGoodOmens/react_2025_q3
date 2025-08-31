export function getActiveKeys<T extends Record<string, boolean>>(obj: T) {
  const arr = Object.entries(obj)
    .filter(([, value]) => value)
    .map(([key]) => key as keyof T);

  return arr;
}
