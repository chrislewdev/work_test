// src/utils/stateResetUtils.ts

import { resetState } from "@/utils/asyncState";
import { type StoreApi } from "zustand";

// Type for reset options
export interface ResetOptions {
  preserve?: boolean; // Whether to preserve current data
}

// Type for the path to a state property
export type StatePath<T> = string[] | ((state: T) => any);

// Create a type-safe reset function for a specific state slice
export function createResetFunction<T>(
  getter: (state: T) => any,
  setter: StoreApi<T>["setState"],
  initialValue: any
) {
  return (options: ResetOptions = {}) => {
    setter((state) => {
      // Use functional updates to get the current state
      const currentState = getter(state);

      // Preserve data if specified
      const data = options.preserve ? currentState.data : null;

      // Return the state update
      return {
        ...state,
        [getLastKey(getter)]: { ...resetState(), data },
      };
    });
  };
}

// Reset multiple state properties at once
export function createBatchResetFunction<T>(setters: {
  [key: string]: (options?: ResetOptions) => void;
}) {
  return (options: ResetOptions = {}) => {
    // Execute all reset functions with the provided options
    Object.values(setters).forEach((resetFn) => resetFn(options));
  };
}

// Helper function to get the last key from a function path
function getLastKey<T>(getter: (state: T) => any): string {
  // This is a simplified implementation that relies on
  // common naming patterns where the getter function name
  // corresponds to the state property
  const fnString = getter.toString();
  const match = fnString.match(/state\.(\w+)/);

  if (!match) {
    // Fallback: Try to extract from function name or error
    const fnNameMatch = fnString.match(/return\s+state\.(\w+)/);
    return fnNameMatch ? fnNameMatch[1] : "state";
  }

  return match[1];
}

// Factory function to generate reset functions for a store
export function createStoreResetFunctions<T>(
  store: {
    setState: StoreApi<T>["setState"];
    getState: StoreApi<T>["getState"];
  },
  asyncStateMap: Record<string, any>
) {
  const resetFunctions: Record<string, (options?: ResetOptions) => void> = {};

  // Create a reset function for each async state property
  for (const key in asyncStateMap) {
    resetFunctions[key] = createResetFunction(
      (state: T) => (state as any)[key],
      store.setState,
      asyncStateMap[key]
    );
  }

  // Add a batch reset function for all states
  resetFunctions.all = createBatchResetFunction(resetFunctions);

  return resetFunctions;
}
