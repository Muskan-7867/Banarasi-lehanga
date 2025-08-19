import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Edit, Eye, Package, Plus, Trash2 } from "lucide-react";
import { ProductT } from "@/types";
import Image from "next/image";

interface ProdTableProps {
  products: ProductT[] | undefined;
  searchTerm: string;
  selectedCategory: string;
  handleDeleteProduct: (productId: string) => void;
}
export default function ProdTable({
  products,
  searchTerm,
  selectedCategory,
  handleDeleteProduct,
}: ProdTableProps) {



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product: ProductT, index: number) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {product.images?.[0]?.url && (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category?.name || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">₹{product.price}</div>
                  {product.originalPrice && (
                    <div className="text-gray-500 line-through text-xs">
                      ₹{product.originalPrice}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      title="View Product"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-main hover:text-main p-1 rounded"
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {products?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first product"}
          </p>
          {!searchTerm && selectedCategory === "all" && (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center px-4 py-2 bg-main text-white rounded-lg hover:bg-main transition-colors"
            >
              <Plus className="mr-2" size={16} />
              Add Your First Product
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
