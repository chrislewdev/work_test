# State Reset Mechanism

This document provides an overview of the state reset mechanism for asynchronous state management in our application.

## Overview

Our state reset system provides a flexible and consistent way to reset asynchronous state across the application. It addresses several key requirements:

1. **Type-Safety**: All reset functions are type-safe.
2. **Selective Reset**: Reset only what's needed (status flags only vs. full state).
3. **Batch Reset**: Reset multiple related states with a single operation.
4. **Consistent Policy**: Standardized approach for when and how resets happen.
5. **Integration**: Built on top of our existing AsyncState utilities.

## Core Components

### 1. AsyncState Utilities

Located in `src/utils/asyncState.ts`, these utilities provide the foundation for our reset mechanism:

```typescript
// Reset full state
export const resetState = <T>(
  options: { preserveData?: boolean } = {}
): AsyncState<T> => ({
  data: options.preserveData ? null : null, // Will be replaced with actual data if preserveData is true
  loading: false,
  error: null,
  success: false,
});

// Reset only status flags, preserving data
export const resetStatusState = <T>(
  currentState: AsyncState<T>
): AsyncState<T> => ({
  data: currentState.data,
  loading: false,
  error: null,
  success: false,
});
```

### 2. State Reset Utilities

Located in `src/utils/stateResetUtils.ts`, these utilities generate type-safe reset functions:

```typescript
// Create a reset function for a specific state slice
export function createResetFunction<T>(
  getter: (state: T) => any,
  setter: StoreApi<T>["setState"],
  initialValue: any
) {
  return (options: ResetOptions = {}) => {
    // Reset logic
  };
}

// Generate multiple reset functions for a store
export function createStoreResetFunctions<T>(
  store: StoreApi<T>,
  asyncStateMap: Record<string, any>
) {
  // Creates individual reset functions and a batch reset
}
```

### 3. React Hooks

Located in `src/hooks/useStateReset.ts`, these hooks make it easy to use reset functions in components:

```typescript
// Reset state based on various conditions
export function useStateReset(configs: ResetConfig[]) {
  // Hook implementation
}

// Reset state on component unmount
export function useResetOnUnmount(
  resetFn: ResetFunction,
  preserveData = false
) {
  // Hook implementation
}
```

## Usage Examples

### 1. Store Setup

When creating a Zustand store, use the utilities to generate reset functions:

```typescript
const useMyStore = create<MyState>()((set, get) => {
  const store = {
    // Your state and actions

    // Reset state placeholder
    resetState: {} as any,
  };

  // Generate reset functions
  const storeApi = { setState: set, getState: get };
  store.resetState = createStoreResetFunctions(storeApi, {
    myAsyncState: initialAsyncState,
  });

  return store;
});
```

### 2. Component Usage

In your React components, use the reset functions:

```typescript
function MyComponent() {
  const { myAsyncState, fetchData, resetState } = useMyStore();

  // Reset on unmount
  useResetOnUnmount(resetState.myAsyncState);

  // Reset based on conditions
  useStateReset([
    {
      resetFn: resetState.myAsyncState,
      condition: myAsyncState.error !== null,
      preserveData: true,
    },
  ]);

  // Manual reset
  const handleReset = () => resetState.all();

  // Reset after success
  const handleSubmit = async () => {
    await fetchData();
    if (myAsyncState.success) {
      resetState.myAsyncState({ preserve: true });
    }
  };

  // ...
}
```

## Reset Policies

Consider these standard policies for when to reset state:

1. **On Component Unmount**: Clean up state when components are no longer rendered.
2. **After Successful Operations**: Reset success flags after showing success messages.
3. **Before New Operations**: Reset error and loading states before starting a new async operation.
4. **On Specific User Actions**: Reset when the user takes actions like closing a form or modal.
5. **On Route Changes**: Reset relevant state when navigating to different parts of the app.

## Best Practices

1. **Preserve Data When Appropriate**: Use `{ preserve: true }` when you only want to reset status flags.
2. **Use Batch Resets for Related State**: Use the `.all()` reset function for related state.
3. **Be Consistent**: Apply the same reset policies across similar components.
4. **Consider Auto-Reset**: For success/error messages, consider auto-resetting after a delay.
5. **Reset Before New Operations**: Always reset relevant state before starting a new async operation.
6. **Document Custom Reset Policies**: If you deviate from standard patterns, document why.
