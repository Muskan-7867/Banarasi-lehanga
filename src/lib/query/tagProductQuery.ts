import { useQuery } from "@tanstack/react-query";
import { ProductT } from "@/types";
import { fetchProducts } from "../services/fetchTagProducts";


export const useProducts = (
  tag: string,
  filters: Record<string, string | number | undefined>
) => {
  return useQuery<ProductT[], Error>({
    queryKey: ["products", tag, filters],
    queryFn: () => fetchProducts(tag, filters),
    placeholderData: [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
