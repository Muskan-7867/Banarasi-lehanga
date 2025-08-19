"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Upload, X } from "lucide-react";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import {
  getCategoriesQuery,
  getSizesQuery,
  getQuanlityQuery,
  getColorQuery,
  getProductByIdQuery
} from "@/lib/query";
import {
  CategoryT,
  SubCategoryT,
  SizeT,
  QualityT,
  ColorT,
  ProductImageT
} from "@/types";
import { toast } from "sonner";
import { updateProduct } from "@/lib/services";
import AdminLayout from "@/components/layouts/AdminLayout";
import Image from "next/image";

interface ProductFormData {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  quality: string;
  category: string;
  subcategory: string;
  size: string;
  colors: string;
  images: File[];
  existingImages?: ProductImageT[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  // Fetch data
  const { data: categories } = useQuery(getCategoriesQuery());
  const { data: sizes } = useQuery(getSizesQuery());
  const { data: qualities } = useQuery(getQuanlityQuery());
  const { data: colors } = useQuery(getColorQuery());
  const { data: product, isLoading: productLoading } = useQuery(
    getProductByIdQuery(productId)
  );

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    tax: 0,
    quality: "",
    category: "",
    subcategory: "",
    size: "",
    colors: "",
    images: [],
    existingImages: []
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubCategoryT[]
  >([]);
  const [filteredSizes, setFilteredSizes] = useState<SizeT[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<
    (string | ProductImageT)[]
  >([]);

  // Populate form with existing product data
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        shortDescription: product.shortDescription,
        detailedDescription: product.detailedDescription,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount || 0,
        tax: product.tax || 0,
        quality: product.quality?.id || "",
        category: product.category?.id || "",
        subcategory: product.subcategory?.id || "",
        size: product.size?.id || "",
        colors: product.colors?.id || "",
        images: [],
        existingImages: product.images || []
      });

      setImagePreviews(product.images || []);
    }
  }, [product]);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (formData.category && categories) {
      const selectedCategory = categories.find(
        (cat: CategoryT) => cat.id === formData.category
      );
      setFilteredSubcategories(selectedCategory?.subcategories || []);
    }
  }, [formData.category, categories]);

  // Filter sizes based on selected category
  useEffect(() => {
    if (formData.category && sizes) {
      const categorySizes = sizes.filter(
        (size: SizeT) => size?.category?.id === formData.category
      );
      setFilteredSizes(categorySizes);
    }
  }, [formData.category, sizes]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages =
      formData.images.length +
      files.length +
      (formData.existingImages?.length || 0);

    if (totalImages > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    // Create previews for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const existingCount = formData.existingImages?.length || 0;

    if (index < existingCount) {
      // Remove existing image
      setFormData((prev) => ({
        ...prev,
        existingImages: prev.existingImages?.filter((_, i) => i !== index) || []
      }));
    } else {
      // Remove new image
      const newIndex = index - existingCount;
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== newIndex)
      }));
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(imagePreviews[index] as string);
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.shortDescription ||
      !formData.detailedDescription ||
      !formData.price ||
      !formData.originalPrice ||
      !formData.quality ||
      !formData.category ||
      !formData.subcategory ||
      !formData.size ||
      !formData.colors
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      // Append all form data except images
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images" && key !== "existingImages") {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append new images
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Append existing image IDs that should be kept
      formData.existingImages?.forEach((img) => {
        formDataToSend.append("existingImages", img.publicId);
      });

      // Call the update API
      const response = await updateProduct(productId, formDataToSend);

      if (response.success) {
        toast.success("Product updated successfully!");
        router.push("/admin/products");
      } else {
        throw new Error(response.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (productLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link
            href="/admin/products"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to products
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/products"
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-black">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category: CategoryT) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory *
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map((subcategory: SubCategoryT) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Size, Quality, Color */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size *
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.category}
              >
                <option value="">Select Size</option>
                {filteredSizes.map((size: SizeT) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality *
              </label>
              <select
                name="quality"
                value={formData.quality}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Quality</option>
                {qualities?.map((quality: QualityT) => (
                  <option key={quality.id} value={quality.id}>
                    {quality.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color *
              </label>
              <select
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Color</option>
                {colors?.map((color: ColorT) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price * ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price * ($)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax (%)
              </label>
              <input
                type="number"
                name="tax"
                value={formData.tax}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief product summary (for product cards and listings)..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed product description with features, specifications, and benefits..."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 5)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload images
                </span>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    {typeof preview === "string" ? (
                      // For new image uploads (object URLs)
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        width={96} // Add width
                        height={96} // Add height
                        unoptimized
                      />
                    ) : (
                      // For existing images from server
                      <Image
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        width={96} // Add width
                        height={96} // Add height
                        unoptimized
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save size={20} />
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
