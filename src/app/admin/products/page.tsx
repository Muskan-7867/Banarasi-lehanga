"use client";

import { useEffect, useState } from "react";
import ProductFilter from "@/components/admin/product/ProductFilter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoriesQuery, getProductsQuery } from "@/lib/query";
import ProdTable from "@/components/admin/product/ProdTable";
import ProductHeader from "@/components/admin/product/ProductHeader";
import ProductStats from "@/components/admin/product/ProductStats";
import { useDebounce } from "@/lib/hooks/useDebounce";
import ProdPagination from "@/components/admin/product/ProdPagination";
import { deleteProduct } from "@/lib/services";
import AdminLayout from "@/components/layouts/AdminLayout";
import { ProductT } from "@/types";

export type ProductsResponse = {
  products: ProductT[];
  count: number;
  totalPages?: number;
  currentPage?: number;
};

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories } = useQuery(getCategoriesQuery());

  // Fetch products with filters
  const {
    data: productsResponse,
    isLoading,
    error
  } = useQuery(
    getProductsQuery({
      page: currentPage,
      pageSize,
      searchTerm: debouncedSearchTerm,
      category: selectedCategory === "all" ? undefined : selectedCategory
    })
  );

  const products = productsResponse?.products || [];
  const totalProducts = productsResponse?.count || 0;
  const totalPages = productsResponse?.totalPages || Math.ceil(totalProducts / pageSize);

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">Error loading products</div>
          <p className="text-gray-500">{(error as Error).message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <ProductHeader />

        {/* Filters */}
        <ProductFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Products Table */}
        <ProdTable
          products={products} // Pass just the products array, not the entire response object
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          handleDeleteProduct={handleDeleteProduct}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <ProdPagination
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}

        {/* Stats */}
        <ProductStats
          categories={categories}
          products={productsResponse || { products: [], count: 0 }}
        />
      </div>
    </AdminLayout>
  );
}