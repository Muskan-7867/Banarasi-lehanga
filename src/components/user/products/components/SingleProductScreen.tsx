"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductImage from "./ProductImage";
import PriceDisplay from "./PriceDisplay";
import { getProductByIdQuery } from "@/lib/query";
import RelatedProducts from "./RelatedProducts";
import CategoryHeader from "@/components/ui/Category/CategoryHeader";

// Define header configurations based on tags
const tagHeaders: Record<
  string,
  {
    title: string;
    subtitle: string;
    offerText: string;

  }
> = {
  readytoshipstyles: {
    title: "",
    subtitle: "Special celebrations offers",
    offerText: "Upto 50% OFF",

  },
 mostwishliststyles: {
    title: "",
    subtitle: "Beat the heat with our collection",
    offerText: "Upto 30% OFF",
  
  },
 bridallehanga: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",

  },
   partywear: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",

  },
     gowns: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",

  },
     artificialjewellery: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },
    bridalclutches: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },  
   fulkaries: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",

  },
     suits: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },
     indowestern: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",

  },
    newthisweek: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },
    weddingsherwanis: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },
    designercoatpents: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },
    partywearindowestern: {
    title: "Winter Collection",
    subtitle: "Stay warm and stylish",
    offerText: "Upto 40% OFF",
 
  },

  default: {
    title: "Special Offers",
    subtitle: "Check out our latest deals",
    offerText: "Upto 20% OFF",

  }
};

const SingleProductScreen = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError
  } = useQuery(getProductByIdQuery(id as string));

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !product) return <p>Product not found</p>;
  // Utility function to normalize tag names
  const normalizeTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, "");

  // Get header configuration based on product tag or use default
  const normalizedTag = normalizeTag(product.tag);

  const headerConfig = tagHeaders[normalizedTag]
    ? {
        ...tagHeaders[normalizedTag],
        title: `${product.tag} Collection`
      }
    : tagHeaders.default;

  return (
    <div className="flex flex-col gap-12">
      {/* Category Header with tag-specific content */}
      <CategoryHeader {...headerConfig} />

      {/* Rest of your product display code remains the same */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-2/4">
          <ProductImage
            images={
              product.images && product.images.length > 0
                ? product.images.map((img: { url: string }) => ({
                    src: img.url,
                    alt: product.name
                  }))
                : [{ src: "/placeholder.png", alt: product.name }]
            }
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
      {product.tag && (
        <RelatedProducts productId={product.id} tag={product.tag} />
      )}
    </div>
  );
};

export default SingleProductScreen;
