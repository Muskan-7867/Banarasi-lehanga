"use client";
import { BiSearch, BiUserCircle, BiMenu } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleUserClick = () => {
    router.push("/auth/register");
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-16 md:h-20 lg:h-24 bg-white flex justify-around items-center px-4 md:px-6 lg:px-8 border-b border-gray-300 relative z-[500]">
      <div className="lg:hidden">
        <button 
          type="button"
          onClick={handleMenuToggle}
          className="p-1"
          aria-label="Toggle menu"
        >
          <BiMenu className="text-2xl text-black" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 lg:hidden">
          <ul className="flex flex-col">
            <li>
              <Link 
                href="/" 
                className="px-4 py-3 border-b border-gray-200 text-black font-medium block"
                onClick={handleMobileLinkClick}
              >
                WOMEN
              </Link>
            </li>
            <li>
              <Link 
                href="/men" 
                className="px-4 py-3 border-b border-gray-200 text-black font-medium block"
                onClick={handleMobileLinkClick}
              >
                MEN
              </Link>
            </li>
            <li className="flex items-center px-4 py-3 border-b border-gray-200">
              <BiSearch className="text-xl mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-gray-50 rounded-md py-1 px-2 focus:outline-none text-black"
              />
            </li>
          </ul>
        </div>
      )}

      {/* Left Navigation (Desktop) */}
      <div className="hidden lg:block">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-700 font-medium hover:bg-black hover:text-white p-2 cursor-pointer transition"
            >
              WOMEN
            </Link>
          </li>
          <li>
            <Link
              href="/men"
              className="text-gray-700 font-medium hover:bg-black hover:text-white p-2 cursor-pointer transition"
            >
              MEN
            </Link>
          </li>
        </ul>
      </div>

      {/* Center Logo */}
      <div className="text-center mx-auto lg:mx-0">
        <Link
          href="/"
          className="text-lg md:text-2xl lg:text-4xl text-black font-bold font-serif tracking-tight"
        >
          BANARASI LEHANGA
        </Link>
        <Link
          href="/"
          className="font-medium text-black text-xs md:text-sm tracking-widest hidden lg:block"
        >
          HOUSE
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Input (Desktop) */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border bg-gray-50 rounded-md py-1 px-2 w-40 focus:w-48 focus:outline-none transition-all duration-300 text-black"
          />
          <BiSearch className="absolute right-2 top-2 text-black" />
        </div>

        <div className="flex gap-3 md:gap-4 text-gray-600">
          <Link href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer">
            <BsWhatsapp className="text-xl hover:text-green-600 transition hidden sm:block" />
          </Link>
          <button 
            type="button"
            onClick={handleUserClick}
            className="p-1"
            aria-label="User account"
          >
            <BiUserCircle className="text-xl md:text-2xl hover:text-black transition" />
          </button>
          <button 
            type="button"
            className="p-1"
            aria-label="Shopping cart"
          >
            <HiOutlineShoppingBag className="text-xl md:text-2xl hover:text-black transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;