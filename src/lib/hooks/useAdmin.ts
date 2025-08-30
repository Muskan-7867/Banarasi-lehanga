
import { create } from "zustand";
import { base_url } from "../services";


interface Admin {
  username?: string;
  email: string;
  phone?: string;
  token?: string;
}

interface AdminState {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
  logout: () => void;
  hydrate: () => void;
  fetchAdminData: (token: string) => Promise<void>; // 👈 new
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,

  setAdmin: (admin) => {
    localStorage.setItem("adminInfo", JSON.stringify(admin));
    if (admin.token) localStorage.setItem("adminToken", admin.token);
    set({ admin });
  },

  logout: () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminToken");
    set({ admin: null });
  },

  hydrate: () => {
    const storedAdmin = localStorage.getItem("adminInfo");
    if (storedAdmin) {
      set({ admin: JSON.parse(storedAdmin) });
    }
  },

  fetchAdminData: async (token: string) => {
    try {
      const res = await fetch(`${base_url}/auth/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (res.ok) {
        set({
          admin: { ...data.admin, token } // ✅ merge token with profile
        });
        localStorage.setItem(
          "adminInfo",
          JSON.stringify({ ...data.admin, token })
        );
      }
    } catch (err) {
      console.error("Failed to fetch admin profile", err);
    }
  }
}));
