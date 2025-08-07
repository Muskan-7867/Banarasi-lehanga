"use client";
import { BiSearch, BiUserCircle, BiMenu } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-16 md:h-20 lg:h-24 bg-white flex justify-around items-center px-4 md:px-6 lg:px-8 border-b border-gray-300 relative">
      <div className="lg:hidden">
        <BiMenu
          className="text-2xl cursor-pointer text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 lg:hidden">
          <ul className="flex flex-col">
            <li className="px-4 py-3 border-b border-gray-200 bg-black text-white font-medium">
              BRIDAL
            </li>
            <li className="px-4 py-3 border-b border-gray-200 text-black font-medium ">
              WOMEN
            </li>
            <li className="px-4 py-3 border-b border-gray-200 text-black font-medium ">
              MEN
            </li>
          </ul>
        </div>
      )}

      {/* Left Navigation (Desktop) */}
      <div className="hidden lg:block">
        <ul className="flex items-center gap-8">
          <li className="bg-black text-white px-4 py-2 text-sm font-medium tracking-wider cursor-pointer hover:bg-gray-800 transition">
            BRIDAL
          </li>
          <li className="text-gray-700 font-medium hover:text-black cursor-pointer transition">
            WOMEN
          </li>
          <li className="text-gray-700 font-medium hover:text-black cursor-pointer transition">
            MEN
          </li>
        </ul>
      </div>

      {/* Center Logo */}
      <div className="text-center mx-auto lg:mx-0">
        <p className="text-lg md:text-2xl lg:text-4xl text-black font-bold font-serif tracking-tight">
          BANARASI LEHANGA
        </p>
        <p className="font-medium text-black text-xs md:text-sm tracking-widest hidden lg:block">
          HOUSE
        </p>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Input (Desktop) */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search"
            className="border bg-gray-50 rounded-md py-1 px-2 w-40 focus:w-48 focus:outline-none transition-all duration-300 text-black"
          />
          <BiSearch className="absolute right-2 top-2 text-black " />
        </div>

        <div className="flex gap-3 md:gap-4 text-gray-600">
          <BsWhatsapp className="text-xl cursor-pointer hover:text-green-600 transition hidden sm:block" />
          <BiUserCircle className="text-xl md:text-2xl cursor-pointer hover:text-black transition" />
          <HiOutlineShoppingBag className="text-xl md:text-2xl cursor-pointer hover:text-black transition" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
