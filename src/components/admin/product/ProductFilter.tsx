import { CategoryT } from "@/types";
import {  Search } from "lucide-react";
import React from "react";



interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories?: CategoryT[]; // Make categories optional
}

export default function ProductFilter({
  searchTerm,
  setSearchTerm,


}: ProductFilterProps) {
//   const categoryOptions = [
//     { value: "all", label: "All Categories" },
//   ...((Array.isArray(categories) ? categories : []).map((category) => ({
//   value: category.id,
//   label: category.name,
// })))

//   ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
          />
        </div>

        {/* Custom Animated Dropdown */}
        {/* <Dropdown
          options={categoryOptions}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          icon={<Filter size={18} className="text-gray-400" />}
          className="min-w-[200px] text-black"
        /> */}
      </div>
    </div>
  );
}
