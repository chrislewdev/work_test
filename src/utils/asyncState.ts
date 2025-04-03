// src/utils/asyncState.ts

// Manage asynchronous state, standardize loading, error, and success states across the application

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

export const loadingState = <T>(
  currentState: AsyncState<T>
): AsyncState<T> => ({
  data: currentState.data,
  loading: true,
  error: null,
  success: false,
});

export const successState = <T>(data: T): AsyncState<T> => ({
  data,
  loading: false,
  error: null,
  success: true,
});

export const errorState = <T>(
  error: string,
  currentState: AsyncState<T>
): AsyncState<T> => ({
  data: currentState.data,
  loading: false,
  error,
  success: false,
});

export const resetState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
  success: false,
});
