"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Upload, X } from "lucide-react";
import Link from "next/link";

import { SizeT, QualityT, ColorT, ProductImageT } from "@/types";
import { toast } from "sonner";
import { updateProduct } from "@/lib/services";
import AdminLayout from "@/components/layouts/AdminLayout";
import Image from "next/image";
import {
  staticCategories,
  staticColors,
  staticQualities,
  staticSizes
} from "@/components/data/categories";
import { useQuery } from "@tanstack/react-query";
import { getProductByIdQuery } from "@/lib/query";

interface ProductFormData {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  qualityName: string;
  categoryName: string;
  subcategoryName: string;
  tag: string;
  sizeName: string;
  colors: string[];
  images: File[];
  existingImages?: ProductImageT[];
}
const compatibleSizes: SizeT[] = staticSizes.map((size) => ({
  ...size,
  createdAt: new Date(),
  updatedAt: new Date(),
  Product: []
}));

const compatibleQualities: QualityT[] = staticQualities.map((quality) => ({
  ...quality,
  createdAt: new Date(),
  updatedAt: new Date(),
  Product: []
}));

const compatibleColors: ColorT[] = staticColors.map((color) => ({
  ...color,
  createdAt: new Date(),
  updatedAt: new Date(),
  products: []
}));

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

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
    qualityName: "",
    categoryName: "",
    subcategoryName: "",
    tag: "",
    sizeName: "",
    colors: [],
    images: [],
    existingImages: []
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<string[]>(
    []
  );
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
        qualityName: product.qualityName || "",
        categoryName: product.categoryName || "",
        subcategoryName: product.subcategoryName || "",
        tag: product.tag || "",
        sizeName: product.sizeName || "",
        colors: product.colors?.map((color: ColorT) => color.id) || [],
        images: [],
        existingImages: product.images || []
      });

      setImagePreviews(product.images || []);
    }
  }, [product]);

  // Update subcategories on category change
  useEffect(() => {
    if (formData.categoryName) {
      const selectedCategory = staticCategories.find(
        (cat) => cat.name === formData.categoryName
      );
      let subs: string[] = [];

      if (Array.isArray(selectedCategory?.subcategories)) {
        selectedCategory.subcategories.forEach(
          (sub: string | { name: string; subcategories?: string[] }) => {
            if (typeof sub === "string") {
              subs.push(sub);
            } else if (sub?.name) {
              subs.push(sub.name);
              if (Array.isArray(sub.subcategories)) {
                subs = [...subs, ...sub.subcategories]; // Flatten nested subcategories
              }
            }
          }
        );
      }

      setFilteredSubcategories(subs);
      setFormData((prev) => ({ ...prev, subcategoryName: "" }));
    } else {
      setFilteredSubcategories([]);
      setFormData((prev) => ({ ...prev, subcategoryName: "" }));
    }
  }, [formData.categoryName]);

  useEffect(() => {
    if (formData.categoryName) {
      const categorySizes = compatibleSizes.filter(
        (size) => size?.category?.id === formData.categoryName
      );
      setFilteredSizes(categorySizes);
      setFormData((prev) => ({ ...prev, sizeName: "" }));
    } else {
      setFilteredSizes([]);
      setFormData((prev) => ({ ...prev, sizeName: "" }));
    }
  }, [formData.categoryName]);

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
      !formData.qualityName ||
      !formData.categoryName ||
      !formData.subcategoryName ||
      !formData.sizeName ||
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

          {/* Tag Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product tag (e.g. Most Wishlist Styles)"
            />
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {staticCategories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory *
              </label>
              <select
                name="subcategoryName"
                value={formData.subcategoryName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.categoryName}
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
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
                name="sizeName"
                value={formData.sizeName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={!formData.categoryName}
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
                name="qualityName"
                value={formData.qualityName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Quality</option>
                {compatibleQualities?.map((quality: QualityT) => (
                  <option key={quality.id} value={quality.id}>
                    {quality.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 p-3 border border-gray-300 rounded-lg">
                {compatibleColors.map((color: ColorT) => (
                  <div key={color.id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={color.name}
                      checked={formData.colors.includes(color.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            colors: [...prev.colors, color.name]
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            colors: prev.colors.filter(
                              (name) => name !== color.name
                            )
                          }));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      {color.name}
                    </label>
                  </div>
                ))}
              </div>
              {formData.colors.length === 0 && (
                <p className="mt-1 text-sm text-red-600">
                  Please select at least one color
                </p>
              )}
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
