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
