"use client";
import { getColorQuery } from "@/lib/query";
import { createColor, deleteColor, updateColor } from "@/lib/services";
import { ColorT } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Color() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getColorQuery());

  // Ensure we always have an array
  const colors: ColorT[] = Array.isArray(data) ? data : data?.data ?? [];

  const [newColor, setNewColor] = useState("");
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add new color
  const addColor = async () => {
    if (!newColor.trim()) return;

    setIsSubmitting(true);
    try {
      await createColor(newColor);
      queryClient.invalidateQueries({ queryKey: ["ColorQuery"] });
      toast.success("Color created successfully");
      setNewColor("");
    } catch (error) {
      toast.error("Failed to create color");
      console.error("Error creating color:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete color
  const deleteColorHandler = async (id: string) => {
    try {
      await deleteColor(id);
      queryClient.invalidateQueries({ queryKey: ["ColorQuery"] });
      toast.success("Color deleted successfully");
    } catch (error) {
      toast.error("Failed to delete color");
      console.error("Error deleting color:", error);
    }
  };

  // Start editing
  const startEditColor = (color: ColorT) => {
    setEditingColor(color.id);
    setEditValues({ ...editValues, [color.id]: color.name });
  };

  // Save edit
  const saveEditColor = async (id: string) => {
    if (!editValues[id]?.trim()) return;

    setIsSubmitting(true);
    try {
      await updateColor(id, editValues[id]);
      queryClient.invalidateQueries({ queryKey: ["ColorQuery"] });
      toast.success("Color updated successfully");
      setEditingColor(null);
    } catch (error) {
      toast.error("Failed to update color");
      console.error("Error updating color:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel edit
  const cancelEditColor = (id: string) => {
    setEditingColor(null);
    const newEditValues = { ...editValues };
    delete newEditValues[id];
    setEditValues(newEditValues);
  };

  return (
    <div className="bg-white rounded-lg h-fit shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Colors</h2>

      {/* Add new color */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Add new color"
          className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main"
          onKeyDown={(e) => e.key === "Enter" && !isSubmitting && addColor()}
          disabled={isSubmitting}
        />
        <button
          onClick={addColor}
          disabled={!newColor.trim() || isSubmitting}
          className="px-4 py-2 app-color text-white rounded-md hover:bg-main/60 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Plus size={16} />
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Color list */}
      <div className="space-y-2 h-[20rem] overflow-y-scroll">
        {isLoading ? (
          <p className="text-gray-500">Loading colors...</p>
        ) : colors.length === 0 ? (
          <p className="text-gray-500">No colors found</p>
        ) : (
          colors.map((color: ColorT) => (
            <div
              key={color.id}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded-md text-black"
            >
              {editingColor === color.id ? (
                <>
                  <input
                    type="text"
                    value={editValues[color.id] || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        [color.id]: e.target.value,
                      })
                    }
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-main"
                    onKeyDown={(e) =>
                      e.key === "Enter" && saveEditColor(color.id)
                    }
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => saveEditColor(color.id)}
                    disabled={isSubmitting}
                    className="p-1 text-main hover:text-green-800 disabled:text-gray-400"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => cancelEditColor(color.id)}
                    disabled={isSubmitting}
                    className="p-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{color.name}</span>
                  <button
                    onClick={() => startEditColor(color)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteColorHandler(color.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
