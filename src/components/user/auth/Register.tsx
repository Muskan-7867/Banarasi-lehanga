import { login } from "@/app/constants/imagePath";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiX } from "react-icons/bi";

interface RegisterProps {
  setShowSignup: (showSignUp: boolean) => void;

}

function Register({ setShowSignup}: RegisterProps) {
    const router = useRouter()
  return (
    <div className="fixed inset-0  flex items-center justify-center z-[1000] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-lg min-h-[500px]">
        {/* Left Image Panel - Hidden on small screens */}
        <div className="relative h-60 md:h-auto hidden md:block">
          <Image
            src={login}
            alt="Banarasi Lehanga House"
       
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0  bg-opacity-20 px-4 md:px-8 py-6 text-black flex flex-col items-center justify-start">
            <h2 className="text-xl md:text-2xl font-bold leading-snug text-center">
              Be A Part Of The
              <br />
              <span className="block text-xl md:text-2xl text-center mt-1">
                Banarasi Lehanga House!
              </span>
            </h2>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-6 md:p-8 flex flex-col justify-center relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-black"
            onClick={() => setShowSignup(false)}
          >
            <BiX className="text-2xl" />
          </button>

          {/* Branding - Show on small screens if image is hidden */}
          <div className="text-center mb-4 md:mb-6 md:hidden">
            <h1 className="text-2xl font-bold tracking-widest app-text-color">
              BANARASI LEHANGA
            </h1>
            <p className="text-xs tracking-[0.3em] text-black">HOUSE</p>
          </div>

          {/* Branding - Regular */}
          <div className="text-center mb-6 hidden md:block">
            <h1 className="text-3xl font-bold tracking-widest app-text-color">
              BANARASI LEHANGA
            </h1>
            <p className="text-xs tracking-[0.3em] text-black">HOUSE</p>
          </div>

          {/* Form */}
          <form className="w-full space-y-3 md:space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full px-4 py-2 border-b border-pink-300 rounded-md focus:outline-none text-black text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border-b border-pink-300 rounded-md focus:outline-none text-black text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border-b border-pink-300 rounded-md focus:outline-none text-black text-sm"
                required
              />
            </div>

            {/* Password Strength Indicator - Added for better UX */}
            <div className="text-xs text-gray-500">
              Password strength: <span className="font-medium">Medium</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium mt-2 md:mt-4"
            >
              Sign Up
            </button>

            {/* Terms */}
            <div className="flex items-start mt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-2"
                required
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I accept that I have read & understood Privacy Policy and T&Cs.
              </label>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-4 md:mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="font-medium text-black hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;