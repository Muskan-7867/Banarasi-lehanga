"use client";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Eye,
  Mail,
  Phone,
  Calendar,
  Search,
  Users,
  UserCheck,
  UserX
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { getCustomers } from "@/lib/services/CustomerService";
import { useRouter } from "next/navigation";

interface Customer {
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  console.log(loading)
  const router = useRouter();

  // Fetch customers from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter customers
  useEffect(() => {
    let filtered = customers;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (customer) => customer.status === statusFilter
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer.email || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  }, [statusFilter, searchTerm, customers]);
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and view all customer information
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or customer ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-0"
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter((c) => c.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-red-600">
                  {customers.filter((c) => c.status === "inactive").length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Orders</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    customers.reduce((acc, c) => acc + c.totalOrders, 0) /
                      customers.length
                  )}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>

              
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {customer.avatar ? (
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={customer.avatar}
                              alt={customer.name}
                              height={40}
                              width={40}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-1 mb-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {customer.phone}
                          </div>
                        )}
                        {/* {customer.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="truncate max-w-xs">
                              {customer.address}
                            </span>
                          </div>
                        )} */}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(customer.joinDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.totalOrders}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(customer.totalSpent)}
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          customer.status
                        )}`}
                      >
                        {getStatusIcon(customer.status)}
                        {customer.status.charAt(0).toUpperCase() +
                          customer.status.slice(1)}
                      </span>
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button  className="text-blue-600 hover:text-blue-900 flex items-center gap-1 cursor-pointer">
                        <Eye className="h-4 w-4" />
                        View Profile
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No customers found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No customers have registered yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

// function getStatusColor(status: "active" | "inactive"): string {
//   return status === "active"
//     ? "bg-green-100 text-green-800"
//     : "bg-red-100 text-red-800";
// }

// function getStatusIcon(status: "active" | "inactive"): JSX.Element {
//   return status === "active" ? (
//     <UserCheck className="h-3 w-3" />
//   ) : (
//     <UserX className="h-3 w-3" />
//   );
// }
