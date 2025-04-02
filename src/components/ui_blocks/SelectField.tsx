// src/components/ui_blocks/SelectField.tsx

"use client";

import React, { forwardRef, SelectHTMLAttributes, useState } from "react";
import { cn } from "@/app/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string;
  error?: string;
  touched?: boolean;
  helper?: string;
  options: SelectOption[];
  showErrorOnly?: boolean;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  emptyOptionLabel?: string;
  showEmptyOption?: boolean;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      error,
      touched,
      helper,
      options,
      showErrorOnly = false,
      fullWidth = true,
      containerClassName,
      labelClassName,
      selectClassName,
      errorClassName,
      helperClassName,
      className,
      id,
      emptyOptionLabel = "Select an option",
      showEmptyOption = true,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const [uniqueId] = useState(
      () => id || `select-${Math.random().toString(36).substring(2, 9)}`
    );
    const showError = showErrorOnly ? !!error : touched && !!error;

    return (
      <div
        className={cn("mb-4", fullWidth ? "w-full" : "", containerClassName)}
      >
        {label && (
          <label
            htmlFor={uniqueId}
            className={cn(
              "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
              labelClassName
            )}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            id={uniqueId}
            ref={ref}
            className={cn(
              "w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md",
              "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:opacity-70 disabled:cursor-not-allowed",
              "appearance-none",
              showError ? "border-red-500 dark:border-red-400" : "",
              selectClassName,
              className
            )}
            {...props}
          >
            {showEmptyOption && <option value="">{emptyOptionLabel}</option>}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {showError && (
          <p
            className={cn(
              "mt-1 text-sm text-red-600 dark:text-red-400",
              errorClassName
            )}
          >
            {error}
          </p>
        )}

        {!showError && helper && (
          <p
            className={cn(
              "mt-1 text-sm text-gray-500 dark:text-gray-400",
              helperClassName
            )}
          >
            {helper}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
