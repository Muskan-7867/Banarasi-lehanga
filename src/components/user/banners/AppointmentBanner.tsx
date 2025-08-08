import React from "react";

function AppointmentBanner() {
  return (
    <div className="flex justify-center mt-6 px-4 sm:px-0">
      <div className="w-full md:w-[85%] h-auto md:h-[20rem] flex flex-col md:flex-row">
        {/* Left section - Shop Via Video Call */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 bg-pink-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 app-text-color text-center">
            Shop Via Video Call
          </h2>
          <p className="text-base sm:text-lg mb-6 text-pink-500 text-center">
            Get a free virtual styling session
          </p>
          <button className="app-color text-white font-bold py-2 px-4 sm:px-6 rounded text-sm sm:text-base">
            BOOK AN APPOINTMENT
          </button>
        </div>

        <div className="w-full h-px md:w-px md:h-full bg-pink-400"></div>

        {/* Right section - The Bridal Stylist */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-8 bg-pink-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 app-text-color text-center">
            The Bridal Stylist
          </h2>
          <p className="text-base sm:text-lg mb-6 text-pink-500 text-center">
            Book your personal bridal consultation and buy the perfect wedding
            dress
          </p>
          <button className="app-color text-white font-bold py-2 px-4 sm:px-6 rounded text-sm sm:text-base">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBanner;