"use client";
import { useAdminStore } from "@/lib/hooks/useAdmin";
import { base_url } from "@/lib/services";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AdminLoginForm {
  email: string;
  password: string;
  username: string;
}

export default function AdminLogin() {
  const [formData, setFormData] = useState<AdminLoginForm>({
    email: "",
    password: "",
    username: ""
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
      const res = await fetch(`${base_url}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.username
        })
      });

      const data = await res.json();
      console.log("from login", data);

      if (res.ok) {
        const token = data.token;

        // ✅ store all fields (email, username, phone, token)
        setAdmin({
          email: data.user?.email,
          username: data.user?.username, // ✅ always set
          phone: data.user?.phone,
          token
        });

        // fetch full admin profile into zustand
        await useAdminStore.getState().fetchAdminData(token);

        setMessage("Admin logged in successfully!");
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Login
        </h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full app-color text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
