// components/layout/UserDashboardLayout.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, ClipboardList, Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/userdashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/userdashboard/profile", icon: User },
  {
    name: "Task Management",
    href: "/userdashboard/tasks",
    icon: ClipboardList,
  },
];

export default function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-800"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold">TailAdmin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium">M</span>
              </div>
              <span className="hidden md:inline">Musharof</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white dark:bg-zinc-800 h-[calc(100vh-64px)] shadow-lg fixed left-0 top-16 z-10 transition-all duration-300",
            sidebarOpen ? "w-56" : "w-0 -translate-x-full"
          )}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-zinc-700"
                      )}
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            sidebarOpen ? "ml-56" : "ml-0"
          )}
        >
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
