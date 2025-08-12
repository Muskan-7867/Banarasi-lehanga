import React from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <h1 className={`text-xl md:text-2xl font-bold mb-1 px-2 md:px-4 ${className}`}>
      {children}
    </h1>
  );
};

export default SectionHeading;