// src/hooks/useAsyncOperation.ts

import { useState, useCallback, useEffect } from "react";
import { AsyncState, initialAsyncState } from "@/utils/asyncState";

// Options for useAsyncOperation hook
interface UseAsyncOperationOptions<T, P extends any[]> {
  operation: (...args: P) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  initialData?: T | null;
  autoReset?: boolean;
  resetTime?: number; // Time in ms to auto-reset success/error states
}

// Manage asynchronous operations with loading, error, and success states
export function useAsyncOperation<T, P extends any[]>({
  operation,
  onSuccess,
  onError,
  initialData = null,
  autoReset = false,
  resetTime = 3000, // Default 3 seconds
}: UseAsyncOperationOptions<T, P>) {
  // State to track the async operation
  const [state, setState] = useState<AsyncState<T>>({
    ...initialAsyncState,
    data: initialData,
  });

  // Reset state
  const reset = useCallback(() => {
    setState({
      ...initialAsyncState,
      data: initialData,
    });
  }, [initialData]);

  // Auto-reset success/error after specified time
  useEffect(() => {
    if (autoReset && (state.success || state.error) && !state.loading) {
      const timer = setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          success: false,
          error: null,
        }));
      }, resetTime);

      return () => clearTimeout(timer);
    }
  }, [state.success, state.error, state.loading, autoReset, resetTime]);

  // Execute the operation
  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      try {
        // Set loading state
        setState((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
          success: false,
        }));

        // Call the operation
        const result = await operation(...args);

        // Set success state
        setState({
          data: result,
          loading: false,
          error: null,
          success: true,
        });

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (error) {
        // Set error state
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: errorMessage,
          success: false,
        }));

        // Call error callback if provided
        if (onError) {
          onError(errorMessage);
        }

        return null;
      }
    },
    [operation, onSuccess, onError]
  );

  return {
    execute,
    reset,
    ...state,
    isLoading: state.loading,
    isSuccess: state.success,
    isError: !!state.error,
  };
}

// Wrapping fetch operations with common error handling and loading states
export function useFetch<T>(url: string) {
  return useAsyncOperation<T, []>({
    operation: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    },
  });
}
