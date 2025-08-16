// components/ProductTabs.tsx
"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ProductTabsProps {
  tabs: Tab[];
}

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 ${activeTab === tab.id ? 'font-medium border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}