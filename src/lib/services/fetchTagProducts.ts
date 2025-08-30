import { ProductT } from "@/types";
import { base_url } from "@/lib/services";
import { handleRateLimit } from "@/lib/utills/ratelimit";

export const fetchProducts = async (
  tag: string,
  filters: Record<string, string | number | undefined>
): Promise<ProductT[]> => {
  return handleRateLimit(async () => {
    const params = new URLSearchParams(
      Object.entries(filters)
        .filter(([ value]) => value !== undefined && value !== "")
        .map(([key, value]) => [key, String(value)])
    ).toString();

    const cacheKey = `products-${tag}-${params}`;

    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return data;
      }
    }

    const res = await fetch(`${base_url}/product/tag/${tag}?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Rate limit exceeded");
      }
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );

    return data;
  });
};
