export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: Array<K>
): Omit<T, K> {
  if (!object || !Array.isArray(keys) || !keys.length) {
    return object;
  }

  return keys.reduce((acc, prop) => {
    const { [prop as keyof object]: prop1, ...rest } = acc;
    return rest;
  }, object);
}
