// app/userdashboard/layout.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, ClipboardList, Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import UserDashboardHeader from "@/components/dashboard/UserDashboardHeader";

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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkIfMobile();

    // Set sidebar closed by default on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    // Update on resize
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle click outside sidebar to close it (on mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, isMobile]);

  // Prevent scrolling of body when mobile sidebar is open
  useEffect(() => {
    if (isMobile) {
      if (sidebarOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900">
      {/* Header */}
      <UserDashboardHeader
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      {/* Overlay for mobile (when sidebar is open) */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={cn(
            "bg-white dark:bg-zinc-800 h-[calc(100vh-64px)] shadow-lg fixed left-0 top-16 z-20 transition-all duration-300",
            isMobile
              ? sidebarOpen
                ? "translate-x-0 w-64"
                : "-translate-x-full"
              : sidebarOpen
              ? "w-56"
              : "w-20",
            "overflow-y-auto"
          )}
        >
          <div
            className={cn(
              "border-b border-gray-200 dark:border-zinc-700 flex items-center transition-all duration-300",
              sidebarOpen || isMobile
                ? "p-4 justify-between"
                : "justify-center py-4"
            )}
          >
            {(sidebarOpen || isMobile) && (
              <span className="font-medium text-gray-800 dark:text-white">
                Menu
              </span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors lg:block hidden"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          {/* Navigation */}
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
                          : "hover:bg-gray-100 dark:hover:bg-zinc-700",
                        !sidebarOpen && !isMobile && "justify-center py-3"
                      )}
                      title={!sidebarOpen && !isMobile ? item.name : undefined}
                      onClick={
                        isMobile ? () => setSidebarOpen(false) : undefined
                      }
                    >
                      <item.icon size={24} />
                      {(sidebarOpen || isMobile) && <span>{item.name}</span>}
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
            !isMobile && (sidebarOpen ? "lg:ml-56" : "lg:ml-20")
          )}
        >
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
