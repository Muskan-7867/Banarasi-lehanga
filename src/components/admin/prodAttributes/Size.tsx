import { getCategoriesQuery, getSizesQuery } from "@/lib/query";
import {
  createSize,
  deleteSize,
  updateSize as updateSizeService
} from "@/lib/services";
import { CategoryT, SizeT } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Size() {
  const { data: categories } = useQuery(getCategoriesQuery());
  const { data: sizesData } = useQuery(getSizesQuery());
  const queryClient = useQueryClient();

  // Normalize sizes to always be an array
  const sizeList: SizeT[] = Array.isArray(sizesData)
    ? sizesData
    : sizesData?.data ?? [];

  const [newSize, setNewSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingSize, setEditingSize] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [editCategories, setEditCategories] = useState<{
    [key: string]: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSize = async () => {
    if (newSize.trim() && selectedCategory) {
      setIsSubmitting(true);
      try {
        await createSize(newSize, selectedCategory);
        queryClient.invalidateQueries({ queryKey: ["SizesQuery"] });
        toast.success("Size created successfully");
        setNewSize("");
        setSelectedCategory("");
      } catch (error) {
        console.error("Error creating size:", error);
        toast.error("Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const deleteSizeHandler = async (id: string) => {
    try {
      const response = await deleteSize(id);
      if (response && (response as { status?: number }).status === 200) {
        toast.success("Size deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["SizesQuery"] });
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleUpdateSize = async (id: string) => {
    if (!editValues[id]?.trim() || !editCategories[id]) return;

    setIsSubmitting(true);
    try {
      const response = await updateSizeService(
        id,
        editValues[id],
        editCategories[id]
      );
      if (response) {
        toast.success("Size updated successfully");
        queryClient.invalidateQueries({ queryKey: ["SizesQuery"] });
        setEditingSize(null);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

const startEditSize = (size: SizeT) => {
  setEditingSize(size.id);
  setEditValues({ ...editValues, [size.id]: size.name });
  setEditCategories({ 
    ...editCategories, 
    [size.id]: size.category?.id || "" // Handle undefined case
  });
};
  const cancelEditSize = (id: string) => {
    setEditingSize(null);
    const newEditValues = { ...editValues };
    const newEditCategories = { ...editCategories };
    delete newEditValues[id];
    delete newEditCategories[id];
    setEditValues(newEditValues);
    setEditCategories(newEditCategories);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sizes</h2>

      {/* Add new size */}
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size Name *
          </label>
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Enter size name (e.g., Small, Medium, Large)"
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            onKeyDown={(e) => e.key === "Enter" && !isSubmitting && addSize()}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2  text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
            required
            disabled={isSubmitting}
          >
            <option value="" className="text-black">
              Select a category
            </option>
            {categories?.map((category: CategoryT) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addSize}
          disabled={!newSize.trim() || !selectedCategory || isSubmitting}
          className="px-4 py-2 app-color text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1 justify-center"
        >
          <Plus size={16} />
          {isSubmitting ? "Adding..." : "Add Size"}
        </button>
      </div>

      {/* Size list */}
      <div className="space-y-2 h-[20rem] overflow-y-scroll">
        {sizeList.map((size: SizeT) => (
          <div
            key={size.id}
            className="flex items-center gap-2 p-2 border border-gray-200 rounded-md text-black"
          >
            {editingSize === size.id ? (
              <div className="flex flex-col w-full gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editValues[size.id] || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        [size.id]: e.target.value
                      })
                    }
                    className="flex-1 px-2 py-1 text-black border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleUpdateSize(size.id)}
                    disabled={isSubmitting}
                    className="p-1 text-green-600 hover:text-green-800 disabled:text-gray-400"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => cancelEditSize(size.id)}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    <X size={16} />
                  </button>
                </div>
                <select
                  value={editCategories[size.id] || ""}
                  onChange={(e) =>
                    setEditCategories({
                      ...editCategories,
                      [size.id]: e.target.value
                    })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories?.map((category: CategoryT) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <span className="flex-1">{size.name}</span>
                <span className="text-sm text-gray-500">
                  ({size.category?.name || "No category"})
                </span>

                <button
                  onClick={() => startEditSize(size)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteSizeHandler(size.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
