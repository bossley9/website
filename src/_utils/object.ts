export const getObjectEntries = Object.entries as <
  T extends Record<symbol, unknown>,
>(
  obj: T,
) => [keyof T, T[keyof T]][];

export const getObjectKeys = Object.keys as <
  T extends Record<PropertyKey, unknown>,
>(
  obj: T,
) => (keyof T)[];

export function groupEntriesByYear<T extends { date: Date | string }>(
  entries: T[],
): [number, T[]][] {
  const groupedEntries = entries.reduce<Record<number, T[]>>((acc, val) => {
    const key = typeof val.date === "string"
      ? new Date(val.date).getUTCFullYear()
      : val.date.getUTCFullYear();
    if (acc[key]) {
      acc[key] = [...acc[key], val];
    } else {
      acc[key] = [val];
    }
    return acc;
  }, {});
  return getObjectEntries(groupedEntries).sort(([a], [b]) => b - a);
}
