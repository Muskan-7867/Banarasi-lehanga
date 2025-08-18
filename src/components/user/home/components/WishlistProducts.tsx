import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";
import Link from "next/link";

const productData = [
  {
    id: "black-kurta",
    title: "Black Embroidered Chinon Saree With Cut Dana Work",
    styleNo: "56311718",
    price: 47995,
    originalPrice: 59995,
    deliveryDate: "Wednesday, 20 Aug 2025",
    options: [
      {
        name: "Convert into Ready to Wear Saree",
        price: 11750,
        description: "The Purge Bin Saree"
      },
      { name: "Satin Petticoat", price: 11245 }
    ],
    addToCartPrice: 7795,
    details: [
      "Handcrafted with intricate embroidery",
      "Includes unstitched blouse piece",
      "Pure Chinon fabric",
      "Cut Dana work highlights"
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/pink-chinon-kaftan-kurta-set-with-zardosi-and-thread-work-sg324490-2.jpg?v=1750771458"
  },
  {
    id: "red-kurta",
    title: "Red Georgette Woven Saree With Bandhani Jaal Work",
    styleNo: "56311718",
    price: 47995,
    originalPrice: 59995,
    deliveryDate: "Wednesday, 20 Aug 2025",
    options: [
      {
        name: "Convert into Ready to Wear Saree",
        price: 11750,
        description: "The Purge Bin Saree"
      },
      { name: "Satin Petticoat", price: 11245 }
    ],
    addToCartPrice: 7795,
    details: [
      "Handcrafted with intricate embroidery",
      "Includes unstitched blouse piece",
      "Pure Chinon fabric",
      "Cut Dana work highlights"
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/sg264506_1.jpg?v=1746858444"
  },
  {
    id: "yellow-saree",
    title: "Beige Crepe Saree With Black Floral Print And Embellished Border",
    styleNo: "56311718",
    price: 47995,
    originalPrice: 59995,
    deliveryDate: "Wednesday, 20 Aug 2025",
    options: [
      {
        name: "Convert into Ready to Wear Saree",
        price: 11750,
        description: "The Purge Bin Saree"
      },
      { name: "Satin Petticoat", price: 11245 }
    ],
    addToCartPrice: 7795,
    details: [
      "Handcrafted with intricate embroidery",
      "Includes unstitched blouse piece",
      "Pure Chinon fabric",
      "Cut Dana work highlights"
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/beige-crepe-saree-with-black-floral-print-and-embellished-border-sg319419-1.jpg?v=1754042943"
  },
  {
    id: "orange-crop-top",
    title:
      "Yellow Lucknowi Chikankari Sequin Saree With Unstitched Blouse Piece",
    styleNo: "56311718",
    price: 47995,
    originalPrice: 59995,
    deliveryDate: "Wednesday, 20 Aug 2025",
    options: [
      {
        name: "Convert into Ready to Wear Saree",
        price: 11750,
        description: "The Purge Bin Saree"
      },
      { name: "Satin Petticoat", price: 11245 }
    ],
    addToCartPrice: 7795,
    details: [
      "Handcrafted with intricate embroidery",
      "Includes unstitched blouse piece",
      "Pure Chinon fabric",
      "Cut Dana work highlights"
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/yellow_lucknowi_chikankari_sequin_saree_with_unsti-sg217157_17.jpg?v=1746876893"
  }
];

export default function WishListProducts() {
  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Most WishList Styles
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1">
          {productData.map((product) => (
            <Link
              key={product.id}
              href={{
                pathname: `/products/${product.id}`,
                query: { title: product.title, price: product.price }
              }}
            >
              <ProductCard images={[{ src: product.image, alt: "" }]} >
                <TitleWrapper title={product.title} price={product.price} />
              </ProductCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
