import React from "react";

interface ImageOverlayProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
export default function ImageOverlay({ 
  title, 
  subtitle, 
  buttonText, 
  onButtonClick 
}: ImageOverlayProps ) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end  p-4">
      <div className="text-center space-y-2">
        {title && <h3 className="text-white font-semibold  text-lg lg:text-2xl font-serif">{title}</h3>}
        {subtitle && <p className="text-white/90 text-xl">{subtitle}</p>}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-white text-black px-4 py-2 mt-2  text-sm hover:bg-gray-100"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}