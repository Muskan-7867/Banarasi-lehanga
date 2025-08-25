import axios from "axios";
import { base_url } from "@/lib/services";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
}

// Fetch customers from backend
export async function getCustomers(): Promise<Customer[]> {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${base_url}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.data.map((u: any) => ({
    id: u.id,
    name: u.username,
    email: u.email,
    avatar: u.avatar || "",
    phone: u.phone || "",
    address: u.address || "",
    joinDate: u.createdAt,
    totalOrders: u.totalOrders || 0,
    totalSpent: u.totalSpent || 0,
    status: "active" // derive from API if available
  }));
}
