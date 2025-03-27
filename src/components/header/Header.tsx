// components/header/Header.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MobileMenu } from "@/components/header/MobileMenu";
import { HeaderProps } from "@/types";
import CustomLink from "@/components/ui_blocks/CustomLink";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import Link from "next/link";
import ThemeToggle from "@/components/ui_blocks/ThemeToggle";

export const Header: React.FC<HeaderProps> = ({
  logoSrc = "https://asiainfluencerx.com/wp-content/uploads/2022/10/Logo_AIX-White.png",
  companyName = "Asia Influencer X",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const { profile, fetchProfile } = useProfileStore();

  // Fetch profile if authenticated but no profile loaded
  useEffect(() => {
    if (isAuthenticated && user && !profile) {
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, profile, fetchProfile]);

  // Define navigation items
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/articles" },
    { name: "Talent", href: "/talent" },
  ];

  // Get display user data from profile if available, fallback to auth user
  const displayUser = profile || user;

  return (
    <header className="bg-black">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 lg:px-8"
        style={{ height: "84px" }}
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{companyName}</span>
            <img alt="" src={logoSrc} className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="mr-4">
            <ThemeToggle />
          </div>
          {isAuthenticated && displayUser ? (
            <Link href="/userdashboard" className="flex items-center gap-3">
              <span className="text-sm/6 font-semibold text-white">
                {displayUser.firstName} {displayUser.lastName}
              </span>
              {displayUser.profilePic ? (
                <img
                  src={displayUser.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-400"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                  {displayUser.firstName?.[0]}
                  {displayUser.lastName?.[0]}
                </div>
              )}
            </Link>
          ) : (
            <CustomLink
              href="/login"
              className="text-sm/6 font-semibold text-white"
              variant="default_dark"
            >
              Sign-Up / Log in here <span aria-hidden="true">&rarr;</span>
            </CustomLink>
          )}
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        setIsOpen={setMobileMenuOpen}
        navigation={navigation || []}
      />
    </header>
  );
};

export default Header;
