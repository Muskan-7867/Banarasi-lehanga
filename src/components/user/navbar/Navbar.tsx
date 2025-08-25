"use client";
import { BiUserCircle, BiMenu, BiLogOut } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCart from "@/lib/hooks/useCart";
import Cartpage from "../cart/CartOverlay";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cartCount, syncCartFromStorage } = useCart();

  useEffect(() => {
    syncCartFromStorage();
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (token && email) setUserEmail(email);
  }, [syncCartFromStorage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (userEmail) setShowUserMenu(!showUserMenu);
    else router.push("/auth/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setShowUserMenu(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    router.push("/profile");
  };

  const handleMobileLinkClick = () => setIsMenuOpen(false);
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleCartClick = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
  const handleViewCart = () => {
    setIsCartOpen(false);
    router.push("/wishlist");
  };

  return (
    <>
      <div className="h-16 md:h-20 lg:h-24 bg-white flex justify-between items-center px-4 md:px-6 lg:px-8 border-b border-gray-300 relative z-40">
        {/* Mobile menu button */}
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
                  href="/bridal"
                  className="px-4 py-3 border-b border-gray-200 text-black font-medium block"
                  onClick={handleMobileLinkClick}
                >
                  BRIDAL
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
                href="/bridal"
                className="text-gray-700 font-medium hover:bg-black hover:text-white p-2 cursor-pointer transition"
              >
                BRIDAL
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
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
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
        <div className="flex items-center gap-2 lg:gap-4 md:gap-6">
          <div className="flex  gap-1 lg:gap-3 md:gap-4 text-gray-600">
            {userEmail ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={handleUserClick}
                  className="p-1 flex items-center"
                  aria-label="User profile"
                >
                  <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userEmail}
                      </p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <BiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUserClick}
                className="p-1"
                aria-label="User account"
              >
                <BiUserCircle className="text-xl md:text-2xl hover:text-black transition" />
              </button>
            )}
            <button
              type="button"
              className="p-1 relative"
              aria-label="Shopping cart"
              onClick={handleCartClick}
            >
              <HiOutlineShoppingBag className="text-xl md:text-2xl hover:text-black transition" />
              {cartCount > 0 && (
                <span className="absolute -top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <Cartpage onClose={handleCloseCart} onViewCart={handleViewCart} />
      )}
    </>
  );
};

export default Navbar;
