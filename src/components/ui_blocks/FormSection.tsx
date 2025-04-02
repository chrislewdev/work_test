// src/components/ui_blocks/FormSection.tsx

import React, { ReactNode, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  collapsible = false,
  defaultOpen = true,
  className,
  headerClassName,
  bodyClassName,
  titleClassName,
  descriptionClassName,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={cn(
        "mb-6 rounded-lg border border-gray-200 dark:border-zinc-700",
        className
      )}
    >
      {title && (
        <div
          className={cn(
            "flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-700",
            collapsible && "cursor-pointer",
            headerClassName
          )}
          onClick={toggleOpen}
        >
          <div>
            <h3
              className={cn(
                "text-lg font-medium text-gray-800 dark:text-white",
                titleClassName
              )}
            >
              {title}
            </h3>
            {description && (
              <p
                className={cn(
                  "mt-1 text-sm text-gray-500 dark:text-gray-400",
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}
          </div>
          {collapsible && (
            <div className="text-gray-500 dark:text-gray-400">
              {isOpen ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </div>
          )}
        </div>
      )}
      {(!collapsible || isOpen) && (
        <div className={cn("p-6", !title && "pt-6", bodyClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default FormSection;
