import React from "react";

function AppointmentBanner() {
  return (
    <div className="flex justify-center mt-6 px-4 sm:px-0">
      <div className="w-full md:w-[85%] h-auto md:h-[20rem] flex flex-col md:flex-row">
        {/* Right section - The Bridal Stylist */}
        <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-pink-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 app-text-color text-center">
            The Bridal Stylist
          </h2>
          <p className="text-base sm:text-lg mb-6 text-pink-500 text-center">
            Call us to book your personal bridal consultation and find the perfect wedding dress.
          </p>
          <p
            
            className="app-color text-white font-bold py-2 px-4 sm:px-6 rounded text-sm sm:text-base"
          >
            CALL NOW: +91 9988363656
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBanner;
