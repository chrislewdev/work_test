// components/ui_blocks/Navigation.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

interface NavigationItem {
  href: string;
  label: string;
}

export default function Navigation() {
  const pathname = usePathname();

  const navItems: NavigationItem[] = [
    { href: "/profile", label: "Profile" },
    { href: "/articles", label: "Articles" },
  ];

  return (
    <nav className="flex justify-center py-4 mb-8">
      <div className="flex gap-8 px-8 py-2 bg-white/90 dark:bg-zinc-800/90 rounded-full shadow-md">
        {navItems.map((item) => {
          const isActive =
            (item.href === "/profile" && pathname === "/profile") ||
            (item.href === "/articles" &&
              (pathname === "/articles" || pathname.startsWith("/articles/")));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition",
                isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
            >
              {item.label}
              {isActive && (
                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
