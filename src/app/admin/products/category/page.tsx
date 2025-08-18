"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import {
  createCategory,
  createSubCategory,
  deleteCategory
} from "@/lib/services";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoriesQuery } from "@/lib/query";
import { CategoryT, SubCategoryT } from "@/types";
import AdminLayout from "@/components/layouts/AdminLayout";

export default function CategoryManagement() {
  // Sample data - replace with actual data from your API
  //   const [categories, setCategories] = useState<Category[]>([
  //     {
  //       id: "1",
  //       name: "Electronics",
  //       subcategories: [
  //         { id: "1-1", name: "Smartphones", parentId: "1" },
  //         { id: "1-2", name: "Laptops", parentId: "1" },
  //         { id: "1-3", name: "Headphones", parentId: "1" },
  //       ],
  //     },
  //     {
  //       id: "2",
  //       name: "Clothing",
  //       subcategories: [
  //         { id: "2-1", name: "Men's Wear", parentId: "2" },
  //         { id: "2-2", name: "Women's Wear", parentId: "2" },
  //         { id: "2-3", name: "Kids Wear", parentId: "2" },
  //       ],
  //     },
  //     {
  //       id: "3",
  //       name: "Books",
  //       subcategories: [
  //         { id: "3-1", name: "Fiction", parentId: "3" },
  //         { id: "3-2", name: "Non-Fiction", parentId: "3" },
  //       ],
  //     },
  //   ]);
  const { data: categories } = useQuery(getCategoriesQuery());
  const queryClient = useQueryClient();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<CategoryT | null>(null);
  const [editingSubcategory, setEditingSubcategory] =
    useState<SubCategoryT | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setIsSubmitting(true);
    try {
      await createCategory(categoryName);
      setCategoryName("");
      queryClient.invalidateQueries({ queryKey: ["CategoriesQuery"] });
      toast.success(`${categoryName} Category Created🥳`);
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !selectedParentCategory) return;
    console.log(subcategoryName, selectedParentCategory);

    setIsSubmitting(true);
    try {
      await createSubCategory(subcategoryName, selectedParentCategory);
      queryClient.invalidateQueries({ queryKey: ["CategoriesQuery"] });

      setSubcategoryName("");
      setSelectedParentCategory("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this category and all its subcategories?"
      )
    ) {
      await deleteCategory(categoryId);
      queryClient.invalidateQueries({ queryKey: ["CategoriesQuery"] });

      toast.success("category Deleted 🗑️ ");
    }
  };

  const handleDeleteSubcategory = (
    categoryId: string,
    subcategoryId: string
  ) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      // TODO: Implement delete subcategory API call
      console.log(
        "Delete subcategory:",
        subcategoryId,
        "from category:",
        categoryId
      );
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !categoryName.trim()) return;

    setIsSubmitting(true);
    try {
      setEditingCategory(null);
      setCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditCategory = (category: CategoryT) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditingSubcategory(null);
    setCategoryName("");
    setSubcategoryName("");
  };

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/admin/products"
              className="inline-flex items-center text-main hover:text-main/80 font-medium mb-4"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Products
            </Link>

            <h1 className="text-3xl font-bold text-gray-900">
              Category Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your product categories and subcategories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Category List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Categories & Subcategories
                </h2>
              </div>

              <div className="p-6">
                {!categories ? (
                  <div className="text-center py-8 text-gray-500">
                    <Folder size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No categories found. Create your first category!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {categories?.map((category: CategoryT) => (
                      <div
                        key={category.id}
                        className="border border-gray-200 rounded-lg"
                      >
                        {/* Category Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-50">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedCategories.has(category.id) ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>
                            {expandedCategories.has(category.id) ? (
                              <FolderOpen
                                size={16}
                                className="app-text-color"
                              />
                            ) : (
                              <Folder size={16} className="app-text-color" />
                            )}
                            <span className="font-medium text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({category.subcategories.length} subcategories)
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => startEditCategory(category)}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Subcategories */}
                        {expandedCategories.has(category.id) && (
                          <div className="border-t border-gray-200">
                            {category.subcategories.length === 0 ? (
                              <div className="p-4 text-sm text-gray-500 text-center">
                                No subcategories
                              </div>
                            ) : (
                              category.subcategories.map(
                                (subcategory: SubCategoryT) => (
                                  <div
                                    key={subcategory.id}
                                    className="flex items-center justify-between p-3 pl-12 border-b border-gray-100 last:border-b-0"
                                  >
                                    <span className="text-gray-700">
                                      {subcategory.name}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => {
                                          setEditingSubcategory(subcategory);
                                          setSubcategoryName(subcategory.name);
                                          setSelectedParentCategory(
                                            subcategory.parentCategory.toString()
                                          );
                                        }}
                                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                                      >
                                        <Edit size={12} />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteSubcategory(
                                            category.id,
                                            subcategory.id
                                          )
                                        }
                                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                )
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Side - Forms */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {editingCategory ? "Update Category" : "Add New Category"}
                </h2>

                <form
                  onSubmit={
                    editingCategory
                      ? handleUpdateCategory
                      : handleCreateCategory
                  }
                >
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !categoryName.trim()}
                      className="flex-1 app-color text-white py-3 px-4 rounded-lg hover:bg-main/80 font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Plus className="mr-2" size={16} />
                          {editingCategory ? "Update" : "Add"} Category
                        </>
                      )}
                    </button>

                    {editingCategory && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Subcategory Form */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {editingSubcategory
                    ? "Update Subcategory"
                    : "Add New Subcategory"}
                </h2>

                <form onSubmit={handleCreateSubcategory}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Category *
                    </label>
                    <select
                      value={selectedParentCategory}
                      onChange={(e) =>
                        setSelectedParentCategory(e.target.value)
                      }
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" className="text-black">
                        Select a parent category
                      </option>
                      {categories?.map((category: CategoryT) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory Name *
                    </label>
                    <input
                      type="text"
                      value={subcategoryName}
                      onChange={(e) => setSubcategoryName(e.target.value)}
                      placeholder="Enter subcategory name"
                      className="w-full px-4 py-3 text-black  border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !subcategoryName.trim() ||
                        !selectedParentCategory
                      }
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Plus className="mr-2" size={16} />
                          {editingSubcategory ? "Update" : "Add"} Subcategory
                        </>
                      )}
                    </button>

                    {editingSubcategory && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Quick Stats */}
              {/* <div className="bg-gradient-to-r from-main to-orange-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">
                      {categories?.length}
                    </div>
                    <div className="text-orange-100">Categories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {categories?.reduce(
                        (total: number, cat: CategoryT) =>
                          total + cat.subcategories.length,
                        0
                      )}
                    </div>
                    <div className="text-orange-100">Subcategories</div>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
