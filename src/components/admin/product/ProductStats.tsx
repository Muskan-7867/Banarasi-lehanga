import { CategoryT, ProductsResponse } from "@/types";
import React from "react";

export default function ProductStats({
  categories,
  products
}: {
  categories: CategoryT[];
  products: ProductsResponse;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">
          {products?.products?.length}
        </div>
        <div className="text-sm text-gray-600">Total Products</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">
          {categories?.length}
        </div>
        <div className="text-sm text-gray-600">Categories</div>
      </div>
    </div>
  );
}
