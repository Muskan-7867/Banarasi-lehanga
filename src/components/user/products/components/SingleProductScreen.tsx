"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductImage from "./ProductImage";
import PriceDisplay from "./PriceDisplay";
import { getProductByIdQuery, getProductsByTagQuery } from "@/lib/query";
import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import Link from "next/link";
import { ProductT } from "@/types";

const SingleProductScreen = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError
  } = useQuery(getProductByIdQuery(id as string));

  // Fetch related products by first tag (adjust if multiple tags)
 const {
  data: relatedProducts,
  isLoading: relatedLoading,
  isError: relatedError,
} = useQuery({
  ...getProductsByTagQuery(product?.tag || ""), // always supply a tag
  enabled: !!product?.tag, // only run if product has a tag
});

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !product) return <p>Product not found</p>;

  return (
    <div className="flex flex-col gap-12">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-2/4">
          <ProductImage
            images={[
              {
                src: product.images?.[0]?.url || "/placeholder.png",
                alt: product.name
              }
            ]}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Descriptions */}
          {product.shortDescription && (
            <p className="text-gray-700 mb-2">{product.shortDescription}</p>
          )}
          {product.detailedDescription && (
            <p className="text-gray-600 mb-4">{product.detailedDescription}</p>
          )}

          {/* Price */}
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
          />

          {/* Category, Subcategory, Quality */}
          <div className="my-4 space-y-2">
            {product.category && (
              <p>
                <span className="font-medium">Category: </span>
                {product.category.name}
              </p>
            )}
            {product.subcategory && (
              <p>
                <span className="font-medium">Subcategory: </span>
                {product.subcategory.name}
              </p>
            )}
            {product.quality && (
              <p>
                <span className="font-medium">Quality: </span>
                {product.quality.name}
              </p>
            )}
            {product.colors && product.colors.length > 0 && (
              <p>
                <span className="font-medium">Color: </span>
                {product.colors.map((color) => color.name).join(", ")}
              </p>
            )}
          </div>

          {/* Delivery */}
          <div className="mb-6">
            <p className="font-medium">Delivery by {"Coming soon"}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mb-2">
            <button className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
              ADD TO CART + ₹{product.price.toLocaleString()}
            </button>
            <button className="w-full py-3 border-2 border-black font-bold rounded-lg hover:bg-gray-50 transition">
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {product?.tag && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Related Products
          </h2>
          {relatedLoading && <p className="text-center">Loading...</p>}
          {relatedError && (
            <p className="text-center text-red-500">
              Failed to load related products
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts
              ?.filter((p: ProductT) => p.id !== product.id) // exclude current product
              .slice(0, 4) // show max 4
              .map((p: ProductT) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <ProductCard
                    images={[
                      {
                        src: p.images?.[0]?.url || "/placeholder.png",
                        alt: p.name
                      }
                    ]}
                  >
                    <TitleWrapper title={p.name} price={p.price} />
                  </ProductCard>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductScreen;
