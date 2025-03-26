// components/dashboard/UserDashboardHeader.tsx

"use client";

import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ui_blocks/ThemeToggle";
import Image from "next/image";

interface UserDashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function UserDashboardHeader({
  sidebarOpen,
  toggleSidebar,
}: UserDashboardHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-20">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">TailAdmin</span>
              <span className="text-xl font-bold">TailAdmin</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="mr-4">
            <ThemeToggle />
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium">M</span>
              </div>
              <span className="hidden md:inline">Musharof</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-zinc-800 rounded-md shadow-lg z-50">
                <Link
                  href="/userdashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
