// components/header/MobileMenu.tsx

"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { MobileMenuProps } from "@/types";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import Link from "next/link";
import ThemeToggle from "@/components/ui_blocks/ThemeToggle";

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen,
  navigation,
}) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { profile, fetchProfile, clearProfile } = useProfileStore();

  // Fetch profile if authenticated but no profile loaded
  useEffect(() => {
    if (isAuthenticated && user && !profile && isOpen) {
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, profile, fetchProfile, isOpen]);

  // Get display user data from profile if available, fallback to auth user
  const displayUser = profile || user;

  // Handle logout
  const handleLogout = () => {
    clearProfile();
    logout();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Asia Influencer X</span>
            <img
              alt=""
              src="https://asiainfluencerx.com/wp-content/uploads/2022/10/Logo_AIX-White.png"
              className="h-8 w-auto"
            />
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            {isAuthenticated && displayUser && (
              <div className="py-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  {displayUser.profilePic ? (
                    <img
                      src={displayUser.profilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                      {displayUser.firstName?.[0]}
                      {displayUser.lastName?.[0]}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      {displayUser.firstName} {displayUser.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {displayUser.email}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 py-6">
              <div className="flex items-center -mx-3 px-3 py-2">
                <span className="text-base/7 font-semibold text-gray-900 dark:text-gray-100 mr-2">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/userdashboard"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
