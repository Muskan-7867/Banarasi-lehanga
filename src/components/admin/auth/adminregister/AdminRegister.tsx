"use client";
import { useAdminStore } from "@/lib/hooks/useAdmin";
import { base_url } from "@/lib/services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AdminRegisterForm {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export default function AdminRegister() {
  const [formData, setFormData] = useState<AdminRegisterForm>({
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`${base_url}/auth/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("fromregister", data);

      if (res.ok) {
        setAdmin({
          username: data.data.username,
          email: data.data.email,
          phone: data.data.phone,
          token: data.data.token
        });
        setMessage("Admin register Successfully!!!")
        router.push("/admin");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Registration
        </h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 text-gray-700 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded text-gray-700 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded text-gray-700 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full app-color text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
