"use client";
import {
  getCategoriesQuery,
  getSizesQuery,
  getQuanlityQuery,
  getColorQuery
} from "@/lib/query";
import { CategoryT, SubCategoryT, SizeT, QualityT, ColorT } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Save, Upload, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { base_url } from "@/lib/services";
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
  inStock: boolean;
  images: File[];
}

export default function AddProductPage() {
  const { data: categories } = useQuery(getCategoriesQuery());
  const { data: sizes } = useQuery(getSizesQuery());
  const { data: qualities = [] } = useQuery(getQuanlityQuery());
  const { data: colors = [] } = useQuery(getColorQuery());
  const router = useRouter();

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
    inStock: true,
    images: []
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubCategoryT[]
  >([]);
  const [filteredSizes, setFilteredSizes] = useState<SizeT[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);



  // Filter subcategories based on selected category
  useEffect(() => {
    if (formData.category && categories) {
      const selectedCategory = categories.find(
        (cat: CategoryT) => cat.id === formData.category
      );
      setFilteredSubcategories(selectedCategory?.subcategories || []);
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    }
  }, [formData.category, categories]);

  // Filter sizes based on selected category
  useEffect(() => {
    if (formData.category && sizes) {
      const categorySizes = sizes.filter(
        (size: SizeT) => size?.category?.id === formData.category
      );
      setFilteredSizes(categorySizes);
      setFormData((prev) => ({ ...prev, size: "" }));
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
      [name]:
        type === "checkbox"
          ? checked
          : ["price", "originalPrice", "discount", "tax"].includes(name)
          ? parseFloat(value) || 0
          : value
    }));
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     toast.error("No files selected");
  //     return;
  //   }

  //   const files = Array.from(e.target.files);

  //   // Check total image count
  //   if (files.length + formData.images.length > 5) {
  //     toast.error("Maximum 5 images allowed");
  //     return;
  //   }

  //   // Validate each file
  //   const validFiles: File[] = [];
  //   const invalidFiles: string[] = [];

  //   files.forEach((file) => {
  //     if (!file.type.match("image.*")) {
  //       invalidFiles.push(`${file.name} - not an image`);
  //     } else if (file.size > 5 * 1024 * 1024) {
  //       invalidFiles.push(`${file.name} - too large (max 5MB)`);
  //     } else {
  //       validFiles.push(file);
  //     }
  //   });

  //   // Show errors for invalid files
  //   if (invalidFiles.length > 0) {
  //     toast.error(`Invalid files:\n${invalidFiles.join("\n")}`);
  //   }

  //   // If no valid files, return early
  //   if (validFiles.length === 0) return;

  //   // Update form data with valid files only
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ...validFiles]
  //   }));

  //   // Create previews for valid files
  //   validFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (e.target?.result) {
  //         setImagePreviews((prev) => [...prev, e.target.result as string]);
  //       }
  //     };
  //     reader.onerror = () => {
  //       console.error(`Failed to read file: ${file.name}`);
  //     };
  //     reader.readAsDataURL(file);
  //   });

  //   // Clear the input to allow selecting the same files again if needed
  //   e.target.value = "";
  // };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validation
  //   if (
  //     !formData.name ||
  //     !formData.shortDescription ||
  //     !formData.detailedDescription ||
  //     !formData.price ||
  //     !formData.originalPrice ||
  //     !formData.quality ||
  //     !formData.category ||
  //     !formData.subcategory ||
  //     !formData.size ||
  //     !formData.colors
  //   ) {
  //     toast.error("Please fill all required fields");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const formDataToSend = new FormData();

  //     // Append all form data
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (key === "images") {
  //         formData.images.forEach((file) => {
  //           formDataToSend.append("images", file);
  //         });
  //       } else {
  //         formDataToSend.append(key, value.toString());
  //       }
  //     });

  //     const response = await fetch(`${base_url}/product`, {
  //       method: "POST",
  //       body: formDataToSend
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create product");
  //     }

  //     const result = await response.json();
  //     toast.success("Product created successfully!");

  //     // Reset form
  //     setFormData({
  //       name: "",
  //       shortDescription: "",
  //       detailedDescription: "",
  //       price: 0,
  //       originalPrice: 0,
  //       discount: 0,
  //       tax: 0,
  //       quality: "",
  //       category: "",
  //       subcategory: "",
  //       size: "",
  //       colors: "",
  //       inStock: true,
  //       images: []
  //     });
  //     setImagePreviews([]);

  //     // Redirect to products list or edit page
  //     router.push(`/admin/products`);
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     toast.error("Failed to create product");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const files = Array.from(e.target.files);

    // Check total image count
    if (files.length + formData.images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // Validate each file
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

    // Show errors for invalid files
    if (invalidFiles.length > 0) {
      toast.error(`Invalid files:\n${invalidFiles.join("\n")}`);
    }

    // If no valid files, return early
    if (validFiles.length === 0) return;

    // Update form data with valid files only
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    // Create previews for valid files
    const newPreviews: string[] = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          // Update previews only after all files are processed
          if (newPreviews.length === validFiles.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        }
      };
      reader.onerror = () => {
        console.error(`Failed to read file: ${file.name}`);
      };
      reader.readAsDataURL(file);
    });

    // Clear the input to allow selecting the same files again if needed
    e.target.value = "";
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
        if (key !== "images") {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append each image file separately
      formData.images.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await fetch(`${base_url}/product`, {
        method: "POST",
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      console.log(result)
      toast.success("Product created successfully!");

      // Reset form
      setFormData({
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
        inStock: true,
        images: []
      });
      setImagePreviews([]);

      // Redirect to products list or edit page
      router.push(`/admin/products`);
    } catch (error) {
      console.error("Error creating product:", error);
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
              className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus: ring-none"
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
                className="w-full px-4 py-3 border text-black  border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                required
              >
                <option value="" className="text-black">
                  Select Category
                </option>
                {Array.isArray(categories) &&
                  categories.map((category: CategoryT) => (
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-none"
                required
                disabled={!formData.category}
              >
                <option value="" className="text-black">
                  Select Subcategory
                </option>
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                required
              >
                <option value="">Select Quality</option>
                {Array.isArray(qualities) &&
                  qualities.map((quality: QualityT) => (
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
                required
              >
                <option value="">Select Color</option>
                {Array.isArray(colors) &&
                  colors.map((color: ColorT) => (
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
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-0 focus:ring-none"
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
                      width={96} // Add width
                      height={96} // Add height
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
