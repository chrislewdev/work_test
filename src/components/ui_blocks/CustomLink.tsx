// components/ui_blocks/CustomLink.tsx

import React from "react";
import Link from "next/link";
import { UrlObject } from "url";

export type CustomLinkProps = {
  href: string | UrlObject;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "default_dark"
    | "primary"
    | "secondary"
    | "subtle"
    | "destructive";
  size?: "sm" | "md" | "lg";
  isExternal?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
  tabIndex?: number;
};

const variantStyles = {
  default:
    "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
  default_dark:
    "text-gray-100 hover:text-gray-200 dark:text-gray-600 dark:hover:text-white",
  primary:
    "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
  secondary:
    "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
  subtle:
    "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
  destructive:
    "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
};

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  className = "",
  variant = "default",
  size = "md",
  isExternal = false,
  onClick,
  ariaLabel,
  tabIndex,
}) => {
  const baseStyles =
    "font-medium underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm transition-colors";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Link
      href={href}
      className={combinedStyles}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...externalProps}
    >
      {children}
      {isExternal && (
        <span className="inline-block ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      )}
    </Link>
  );
};

export default CustomLink;
