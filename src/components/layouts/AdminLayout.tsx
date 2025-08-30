import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Package, LogOut, Menu, X, User } from "lucide-react";
import { useAdminStore } from "@/lib/hooks/useAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

  const { admin, hydrate, fetchAdminData } = useAdminStore();

  useEffect(() => {
    hydrate();
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetchAdminData(token); // ✅ ensure latest data
    }
  }, []);

  if (!admin) return <p>Loading admin...</p>;


  const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package }
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    window.location.href = "/admin/login";
  };

  const getFirstLetter = (username: string | undefined) => {
    return username?.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 app-color rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {getFirstLetter(admin?.username)}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">Admin Panel</span>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-pink-100 app-text-color border-r-2 border-app-color"
                    : "text-gray-700 hover:bg-gray-50 hover:app-text-color"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="mr-3" size={18} />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-3 right-3">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
          >
            <LogOut className="mr-3" size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 text-black rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {admin?.username || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {admin?.email || "admin@banarasi.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
