"use client";
import React from "react";
import FilterSection from "./FilterSection";
import CheckboxItem from "./Checkbox";

export default function Categories() {
  const [expandedSections, setExpandedSections] = React.useState({
    gender: true,
    price: false,
    bestsellers: false,
    featured: false,
    partywear: false,
    newarrivals: false,
    sale: false,
    stiched: false,
    ethnic: false,
    fabric: false,
    occasion: false,
    color: false,
    brand: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="hidden lg:block w-full lg:w-64 p-4  lg:border-r border-gray-200 text-black">
      <div className="mb-6">
        <h1 className="text-xl font-bold">FILTERS</h1>
      </div>

      {/* Gender Section */}
      <FilterSection
        title="Gender" 
        expanded={expandedSections.gender} 
        onToggle={() => toggleSection("gender")}
      >
        <CheckboxItem id="female" label="Female" count={358} />
        <CheckboxItem id="male" label="Male" count={38} />
      </FilterSection>

      {/* Price Section */}
      <FilterSection 
        title="Price" 
        expanded={expandedSections.price} 
        onToggle={() => toggleSection("price")}
      >
        {["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹1500", "Over ₹1500"].map((range) => (
          <CheckboxItem key={range} id={range} label={range} />
        ))}
      </FilterSection>

      {/* Party Wear Section */}
      <FilterSection 
        title="Party Wear" 
        expanded={expandedSections.partywear} 
        onToggle={() => toggleSection("partywear")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>

      {/* New Arrival Section */}
      <FilterSection 
        title="New Arrival" 
        expanded={expandedSections.newarrivals} 
        onToggle={() => toggleSection("newarrivals")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>

      {/* Sale Section */}
      <FilterSection 
        title="Sale" 
        expanded={expandedSections.sale} 
        onToggle={() => toggleSection("sale")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>

      {/* Ethnic Section */}
      <FilterSection 
        title="Ethnic" 
        expanded={expandedSections.ethnic} 
        onToggle={() => toggleSection("ethnic")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>

      {/* Stiched Section */}
      <FilterSection 
        title="Stiched" 
        expanded={expandedSections.stiched} 
        onToggle={() => toggleSection("stiched")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>

        <FilterSection 
        title="Fabric" 
        expanded={expandedSections.stiched} 
        onToggle={() => toggleSection("fabric")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>
        <FilterSection 
        title="Occasion" 
        expanded={expandedSections.stiched} 
        onToggle={() => toggleSection("occasion")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>
        <FilterSection 
        title="Color" 
        expanded={expandedSections.stiched} 
        onToggle={() => toggleSection("color")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>
        <FilterSection 
        title="Brand" 
        expanded={expandedSections.stiched} 
        onToggle={() => toggleSection("brand")}
      >
        {["Dresses", "Gowns", "Lehengas", "Sarees"].map((item) => (
          <CheckboxItem key={item} id={item} label={item} />
        ))}
      </FilterSection>
    </div>
  );
}