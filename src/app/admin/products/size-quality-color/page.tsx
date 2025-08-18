"use client";

import Color from "@/components/admin/prodAttributes/Color";
import Quality from "@/components/admin/prodAttributes/Quality";
import Size from "@/components/admin/prodAttributes/Size";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";




export default function SizeQualityColor() {
  
  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Manage Product Attributes</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sizes Section */}
          <Size/>
          {/* Qualities Section */}
          <Quality />

          {/* Colors Section */}
          <Color />
        </div>
      </div>
    </AdminLayout>
  );
}
