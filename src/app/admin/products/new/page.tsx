"use client";
import { SizeT, QualityT, ColorT } from "@/types";
import { Save, Upload, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { base_url } from "@/lib/services";
import AdminLayout from "@/components/layouts/AdminLayout";
import Image from "next/image";
import {
  ProductFormData,
  staticCategories,
  staticColors,
  staticQualities,
  staticSizes
} from "@/components/data/categories";

// Create compatible versions of the static data that match the expected types
const compatibleSizes: SizeT[] = staticSizes.map((size) => ({
  ...size,
  id: "",
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

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    shortDescription: "",
    detailedDescription: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    tax: 0,
    categoryName: "",
    subcategoryName: "",
    qualityName: "",
    sizeName: "",
    colors: [],
    inStock: true,
    images: [],
    tag: ""
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<string[]>(
    []
  );
  const [filteredSizes, setFilteredSizes] = useState<SizeT[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
      [name]:
        type === "checkbox"
          ? checked
          : ["price", "originalPrice", "discount", "tax"].includes(name)
          ? parseFloat(value) || 0
          : value
    }));
  };

  // Image handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No files selected");
      return;
    }
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    files.forEach((file) => {
      if (!file.type.match("image.*")) {
        invalidFiles.push(`${file.name} - not an image`);
      } else if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} - too large (max 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0)
      toast.error(`Invalid files:\n${invalidFiles.join("\n")}`);
    if (validFiles.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    const newPreviews: string[] = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          if (newPreviews.length === validFiles.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.shortDescription ||
      !formData.detailedDescription ||
      !formData.price ||
      !formData.originalPrice ||
      !formData.qualityName ||
      !formData.categoryName ||
      !formData.sizeName ||
      formData.colors.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      // Add all form data except images and colors
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images" && key !== "colors") {
          formDataToSend.append(key, value.toString());
        }
      });

      // Add colors as array of names
      formData.colors.forEach((color) =>
        formDataToSend.append("colors", color)
      );

      // Add images
      formData.images.forEach((file) => formDataToSend.append("images", file));

      const response = await fetch(`${base_url}/product`, {
        method: "POST",
        body: formDataToSend
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create product");
      }

      toast.success("Product created successfully!");
      setFormData({
        name: "",
        shortDescription: "",
        detailedDescription: "",
        price: 0,
        originalPrice: 0,
        discount: 0,
        tax: 0,
        categoryName: "",
        subcategoryName: "",
        qualityName: "",
        sizeName: "",
        colors: [],
        inStock: true,
        images: [],
        tag: ""
      });
      setImagePreviews([]);
      router.push(`/admin/products`);
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Add New Product</h1>

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
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Tag
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
              placeholder="Enter product tag (optional)"
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
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
                Subcategory
              </label>
              <select
                name="subcategoryName"
                value={formData.subcategoryName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg"
                disabled={
                  !formData.categoryName || filteredSubcategories.length === 0
                }
              >
                <option value="">Select Subcategory</option>
                {filteredSubcategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {filteredSubcategories.length === 0 && formData.categoryName && (
                <p className="mt-1 text-sm text-gray-500">
                  No subcategories available for this category
                </p>
              )}
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                required
                disabled={!formData.categoryName}
              >
                <option value="">Select Size</option>
                {filteredSizes.map((size: SizeT) => (
                  <option key={size.id} value={size.name}>
                    {size.name}
                  </option>
                ))}
              </select>
              {filteredSizes.length === 0 && formData.categoryName && (
                <p className="mt-1 text-sm text-gray-500">
                  No sizes available for this category
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality *
              </label>
              <select
                name="qualityName"
                value={formData.qualityName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                required
              >
                <option value="">Select Quality</option>
                {compatibleQualities.map((quality: QualityT) => (
                  <option key={quality.id} value={quality.name}>
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
                Price * (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price * (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                      width={96}
                      height={96}
                      unoptimized
                    />
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
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
