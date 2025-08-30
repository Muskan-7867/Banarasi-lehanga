export async function handleRateLimit<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error: any) {
      if (
        error.message.includes("Rate limit") ||
        error.message.includes("429")
      ) {
        retries++;
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Max retries exceeded due to rate limiting");
}
