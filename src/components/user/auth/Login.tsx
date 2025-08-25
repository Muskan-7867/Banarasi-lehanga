"use client";
import { login } from "@/app/constants/imagePath";
import { base_url } from "@/lib/services";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiX } from "react-icons/bi";

interface LoginProps {
  setShowSignup: (showSignUp: boolean) => void;
}

function Login({ setShowSignup }: LoginProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ Input Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Handler
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(`${base_url}/auth/login`, formData);
    console.log("✅ login Success:", res.data);

    // Check actual token path
    const token = res.data.data?.token; // <-- notice .data?.token
    if (!token) throw new Error("Token not received");

    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", formData.email);

    router.push("/");
  } catch (err) {
    console.error("❌ login Error:", err);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0  flex items-center justify-center z-[1000] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl relative overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-lg min-h-[500px]">
        {/* Left Image Panel - Hidden on small screens */}
        <div className="relative h-80 md:h-auto hidden md:block">
          <Image
            src={login}
            alt="Kalki Circle"
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-opacity-20 px-8 py-6 text-black flex flex-col items-center justify-start">
            <h2 className="text-xl md:text-2xl font-bold leading-snug text-center">
              Welcome Back!
              <br />
              <span className="block text-center mt-1">
                Banarasi Lehanga House
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
          <div className="text-center mb-6 md:hidden">
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
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full px-4 py-2 border-b border-pink-300 rounded-md focus:outline-none text-black text-sm"
                required
              />
            </div>

            {/* Remember me and Forgot password - Added for better UX */}
            <div className="flex justify-end text-sm">
              <button type="button" className="text-pink-600 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium mt-4"
            >
              {loading ? "Logging in..." : "Login"}
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
          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/auth/register")}
              className="font-medium text-black hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
