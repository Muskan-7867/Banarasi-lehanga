
import { getQuanlityQuery } from "@/lib/query";
import { createQuality, updateQuality, deleteQuality } from "@/lib/services";
import { QualityT } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit2, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Quality() {
  const queryClient = useQueryClient();
  const [newQuality, setNewQuality] = useState("");
  const { data: qualities, isLoading, error } = useQuery(getQuanlityQuery());
  const [editingQuality, setEditingQuality] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quality functions
  const addQuality = async () => {
    if (!newQuality.trim()) return;

    setIsSubmitting(true);
    try {
      await createQuality(newQuality);
      queryClient.invalidateQueries({ queryKey: ["quality"] });
      toast.success("Quality created successfully");
      setNewQuality("");
    } catch (error) {
      toast.error("Failed to create quality");
      console.error("Error creating quality:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuality = async (id: string) => {
    try {
      await deleteQuality(id);
      queryClient.invalidateQueries({ queryKey: ["quality"] });
      toast.success("Quality deleted successfully");
    } catch (error) {
      toast.error("Failed to delete quality");
      console.error("Error deleting quality:", error);
    }
  };

  const startEditQuality = (quality: QualityT) => {
    setEditingQuality(quality.id);
    setEditValues({ ...editValues, [quality.id]: quality.name });
  };

  const saveEditQuality = async (id: string) => {
    if (!editValues[id]?.trim()) return;

    setIsSubmitting(true);
    try {
      await updateQuality(id, editValues[id]);
      queryClient.invalidateQueries({ queryKey: ["quality"] });
      toast.success("Quality updated successfully");
      setEditingQuality(null);
    } catch (error) {
      toast.error("Failed to update quality");
      console.error("Error updating quality:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEditQuality = (id: string) => {
    setEditingQuality(null);
    const newEditValues = { ...editValues };
    delete newEditValues[id];
    setEditValues(newEditValues);
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading qualities...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading qualities:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="bg-white h-fit rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Qualities</h2>

      {/* Add new quality */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newQuality}
          onChange={(e) => setNewQuality(e.target.value)}
          placeholder="Add new quality"
          className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && !isSubmitting && addQuality()}
          disabled={isSubmitting}
        />
        <button
          onClick={addQuality}
          disabled={!newQuality.trim() || isSubmitting}
          className="px-4 py-2 app-color text-white rounded-md hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Plus size={16} />
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Quality list */}
      <div className="space-y-2 h-[20rem] overflow-y-auto">
        {qualities && qualities.length > 0 ? (
          qualities.map((quality: QualityT) => (
            <div
              key={quality.id}
              className="flex items-center gap-2 p-2 border border-gray-200 rounded-md text-black"
            >
              {editingQuality === quality.id ? (
                <>
                  <input
                    type="text"
                    value={editValues[quality.id] || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        [quality.id]: e.target.value
                      })
                    }
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onKeyDown={(e) =>
                      e.key === "Enter" && saveEditQuality(quality.id)
                    }
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => saveEditQuality(quality.id)}
                    disabled={isSubmitting}
                    className="p-1 text-green-600 hover:text-green-800 disabled:text-gray-400"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => cancelEditQuality(quality.id)}
                    disabled={isSubmitting}
                    className="p-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{quality.name}</span>
                  <button
                    onClick={() => startEditQuality(quality)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteQuality(quality.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No qualities found</p>
        )}
      </div>
    </div>
  );
}
