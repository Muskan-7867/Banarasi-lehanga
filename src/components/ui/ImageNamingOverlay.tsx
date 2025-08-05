import React from "react";

export default function ImageNamingOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/50 to-transparent p-2 sm:p-4">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-white font-semibold text-sm sm:text-lg md:text-xl">
          24 Hour Dispatch
        </h3>
        <p className="text-white/90 text-xs sm:text-sm md:text-base">
          Deliver before Rakhi
        </p>
        <button className="bg-white text-black px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 mt-1 sm:mt-2 rounded-full text-xs sm:text-sm md:text-base hover:bg-gray-100 transition-colors duration-200">
          Shop Now
        </button>
      </div>
    </div>
  );
}