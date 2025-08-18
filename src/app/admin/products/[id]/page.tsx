"use client";
import { getProductByIdQuery } from "@/lib/query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { ProductT } from "@/types";
import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  DollarSign,
  Tag,
  Palette,
  Ruler,
  Award
} from "lucide-react";
import Image from "next/image";

export default function SingleProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading: productLoading } = useQuery(
    getProductByIdQuery(productId)
  );

  if (productLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-main"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Product not found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const productData = product as ProductT;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-main to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Product Details</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {productData.images && productData.images.length > 0 ? (
                  <Image
                    src={productData.images[0].url}
                    alt={productData.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {productData.images && productData.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productData.images.slice(1).map((image, index) => (
                    <div
                      key={image.id}
                      className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.url}
                        alt={`${productData.name} ${index + 2}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {productData.name}
                </h2>
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-4 w-4 text-main" />
                  <span className="text-sm font-medium text-main uppercase tracking-wide">
                    {productData?.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      ${productData.price}
                    </span>
                  </div>
                  {productData.originalPrice &&
                    productData.originalPrice > productData.price && (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg text-gray-500 line-through">
                          ${productData.originalPrice}
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {productData.discount}% OFF
                        </span>
                      </div>
                    )}
                </div>
                {productData.tax > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Tax: ${productData.tax}
                  </p>
                )}
              </div>

              {/* Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Ruler className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Size</span>
                  </div>
                  <span className="text-blue-700">
                    {productData?.size?.name}
                  </span>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-900">Quality</span>
                  </div>
                  <span className="text-purple-700">
                    {productData?.quality?.name}
                  </span>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 sm:col-span-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Palette className="h-4 w-4 text-pink-600" />
                    <span className="font-medium text-pink-900">Colors</span>
                  </div>
                <span className="text-pink-700">
  {productData.colors?.map(color => color.name).join(', ') || "Not specified"}
</span>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Short Description
                  </h3>
                  <p className="text-gray-600">
                    {productData.shortDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Detailed Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {productData.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Created:{" "}
                      {new Date(productData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Updated:{" "}
                      {new Date(productData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
