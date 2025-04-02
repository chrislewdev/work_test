// src/utils/asyncState.ts

/**
 * A utility for managing asynchronous state in a consistent way
 * This helps us standardize loading, error, and success states across the application
 */

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialAsyncState: AsyncState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

/**
 * Create loading state
 */
export const loadingState = <T>(
  currentState: AsyncState<T>
): AsyncState<T> => ({
  data: currentState.data,
  loading: true,
  error: null,
  success: false,
});

/**
 * Create success state with data
 */
export const successState = <T>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
  success: true,
});

/**
 * Create error state
 */
export const errorState = <T>(
  error: string,
  currentState: AsyncState<T>
): AsyncState<T> => ({
  data: currentState.data,
  loading: false,
  error,
  success: false,
});

/**
 * Create reset state
 */
export const resetState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
  success: false,
});

/**
 * Create a utility to handle async operations in stores
 * This takes a set state function and returns a function that wraps async operations
 */
export const createAsyncOperation = <T, P extends any[]>(
  setState: (
    state: AsyncState<T> | ((prevState: AsyncState<T>) => AsyncState<T>)
  ) => void,
  operation: (...args: P) => Promise<T>,
  initialState: AsyncState<T> = initialAsyncState as AsyncState<T>
) => {
  let currentState = initialState;

  // Update the current state tracker when state changes
  const updateState = (newState: AsyncState<T>) => {
    currentState = newState;
    setState(newState);
  };

  return async (...args: P): Promise<T | null> => {
    try {
      // Set loading state
      updateState(loadingState(currentState));

      // Call the operation
      const result = await operation(...args);

      // Set success state
      updateState(successState(result));
      return result;
    } catch (error) {
      // Set error state
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      updateState(errorState(errorMessage, currentState));
      return null;
    }
  };
};
