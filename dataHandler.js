/**
 * Formats data object into a bordered string representation.
 * @param {any} data - The data to process
 * @returns {string|null} The formatted string or null if data is null/undefined
 */
export function processData(data) {
  if (data === null || data === undefined) return null;

  try {
    return JSON.stringify(data, null, 2)
      .split('\n')
      .map((line) => `│ ${line}`)
      .join('\n');
  } catch (err) {
    return `│ [Error serializing data]: ${err.message}`;
  }
}

/**
 * Recursively resolves promises within an object or array.
 * @param {any} obj - The object containing promises
 * @returns {Promise<any>} The object with resolved values
 */
export async function resolveNestedPromises(obj) {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Promise) return await obj;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return Promise.all(obj.map(resolveNestedPromises));
  }

  const resolvedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    resolvedObj[key] = await resolveNestedPromises(value);
  }
  return resolvedObj;
}
