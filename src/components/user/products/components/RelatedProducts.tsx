
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import Link from "next/link";
import { ProductT } from "@/types";
import { getProductsByTagQuery } from "@/lib/query";

interface RelatedProductsProps {
  productId: string;
  tag: string;
}

const RelatedProducts = ({ productId, tag }: RelatedProductsProps) => {
  const {
    data: relatedProducts,
    isLoading,
    isError
  } = useQuery({
    ...getProductsByTagQuery(tag),
    enabled: !!tag
  });

  if (isLoading) return <p className="text-center py-8">Loading related products...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Failed to load related products</p>;
  if (!relatedProducts || relatedProducts.length <= 1) return null; // Only current product or none

  const filteredProducts = relatedProducts
    .filter((p: ProductT) => p.id !== productId)
    .slice(0, 4);

  if (filteredProducts.length === 0) return null;

  return (
    <div className="w-full  my-12 ">
      <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product: ProductT) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block">
            <ProductCard
              images={[
                {
                  src: product.images?.[0]?.url || "/placeholder.png",
                  alt: product.name
                }
              ]}
            >
              <TitleWrapper title={product.name} price={product.price} />
            </ProductCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;