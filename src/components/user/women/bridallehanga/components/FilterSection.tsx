"use client";
import React from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

type FilterSectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

const FilterSection = ({ title, expanded, onToggle, children }: FilterSectionProps) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="font-semibold mt-4 border-">{title}</h2>
        {expanded ? <BiMinus size={18} /> : <BiPlus size={18} />}
      </div>
      {expanded && (
        <div className="mt-2 space-y-2 ml-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
