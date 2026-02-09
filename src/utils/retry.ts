/**
 * Retry async function với delay
 */
export async function retry<T>(
  action: () => Promise<T>,
  options?: {
    retries?: number;
    delayMs?: number;
    onRetry?: (error: Error, attempt: number) => void;
  }
): Promise<T> {
  const retries = options?.retries ?? 3;
  const delayMs = options?.delayMs ?? 1000;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;

      if (attempt < retries) {
        options?.onRetry?.(lastError, attempt);
        await delay(delayMs);
      }
    }
  }

  throw lastError!;
}

/**
 * Simple sleep util
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
