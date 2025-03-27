// components/ui_blocks/NavigationWrapper.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationWrapper: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center py-4 mb-8">
      <div className="flex gap-8 px-8 py-2 bg-white/90 dark:bg-zinc-800/90 rounded-full shadow-md">
        <Link
          href="/profile"
          className={`relative px-3 py-1.5 text-sm font-medium transition ${
            pathname === "/profile"
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          Profile
          {pathname === "/profile" && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-zinc-500/0 via-zinc-500/70 to-zinc-500/0 dark:from-zinc-400/0 dark:via-zinc-400/40 dark:to-zinc-400/0" />
          )}
        </Link>

        <Link
          href="/articles"
          className={`relative px-3 py-1.5 text-sm font-medium transition ${
            pathname === "/articles" || pathname.startsWith("/articles/")
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          Portfolio
          {(pathname === "/articles" || pathname.startsWith("/articles/")) && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-zinc-500/0 via-zinc-500/70 to-zinc-500/0 dark:from-zinc-400/0 dark:via-zinc-400/40 dark:to-zinc-400/0" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavigationWrapper;
