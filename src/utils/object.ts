export const getObjectEntries = Object.entries as <
  T extends Record<symbol, unknown>
>(
  obj: T
) => [keyof T, T[keyof T]][];
