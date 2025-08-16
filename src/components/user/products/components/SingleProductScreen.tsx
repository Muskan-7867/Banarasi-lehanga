"use client";
import React from "react";
import ProductOption from "./ProductOption";
import PriceDisplay from "./PriceDisplay";
import ProductImage from "./ProductImage";
import { useParams } from "next/navigation";

const productData = [
  {
    id: "1",
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
      {
        name: "Satin Petticoat",
        price: 11245
      }
    ],
    addToCartPrice: 7795,
    details: [
      "Handcrafted with intricate embroidery",
      "Includes unstitched blouse piece",
      "Pure Chinon fabric",
      "Cut Dana work highlights"
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/black-embroidered-chinon-saree-with-cut-dana-work-sg317718-1.jpg?v=1753678308"
  },
  {
    id: "2",
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
      {
        name: "Satin Petticoat",
        price: 11245
      }
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
    id: "3",
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
      {
        name: "Satin Petticoat",
        price: 11245
      }
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
    id: "4",
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
      {
        name: "Satin Petticoat",
        price: 11245
      }
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

const SingleProductScreen = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  //     {
  //       id: "details",
  //       label: "Product Details",
  //       content: (
  //         <ul className="list-disc pl-5 space-y-2">
  //           {product.details.map((detail, index) => (
  //             <li key={index}>{detail}</li>
  //           ))}
  //         </ul>
  //       )
  //     },
  //     {
  //       id: "style",
  //       label: "Style & Fit Tips",
  //       content: <div>Style and fit tips content goes here...</div>
  //     },
  //     {
  //       id: "shipping",
  //       label: "Shipping & Returns",
  //       content: <div>Shipping and returns information goes here...</div>
  //     },
  //     {
  //       id: "faqs",
  //       label: "FAQs",
  //       content: <div>Frequently asked questions go here...</div>
  //     }
  //   ];
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="md:w-2/4">
        <ProductImage images={[{ src: product.image, alt: product.title }]} />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
        />

        {/* Stitching Status */}
        <div className="mb-6 p-3 bg-gray-100 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">Stitched:</span>
            <span className="text-gray-700">Unstitched</span>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Unstable
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              Stitched
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mb-6">
          <p className="font-medium">Delivery by {product.deliveryDate}</p>
        </div>

        {/* Options */}
        <div className="mb-6 space-y-4">
          {product.options.map((option) => (
            <ProductOption
              key={option.id}
              name={option.name}
              price={option.price}
              description={option.description}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mb-2">
          <button className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
            ADD TO CART + ₹{product.addToCartPrice.toLocaleString()}
          </button>
          <button className="w-full py-3 border-2 border-black font-bold rounded-lg hover:bg-gray-50 transition">
            BUY IT NOW
          </button>
        </div>

        {/* Delivery Estimate */}
        <div className="mb-6">
          <p className="text-gray-700">
            Estimated delivery: {product.deliveryDate}
          </p>
        </div>

        {/* More Colors */}
        <div className="mb-6">
          <p className="font-medium mb-2">More Colors</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 border border-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-green-600 border border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductScreen;
