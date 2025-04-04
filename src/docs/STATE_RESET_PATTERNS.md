# State Reset Patterns

This document outlines the standardized patterns for managing state resets in our application.

## Overview

A proper state reset mechanism ensures our application maintains a clean state lifecycle, preventing stale data, lingering errors, and unexpected UI behaviors when navigating between components. Our implementation follows a consistent approach with the following patterns:

## Core Reset Patterns

### 1. Component Mount/Unmount Resets

- **Reset on Unmount**: Components that use async state should clean up when they unmount
- **Reset Before Fetch**: Reset relevant state before initiating data fetching
- **Preserve vs. Full Reset**: Use `{ preserve: true }` to keep data but reset status flags

### 2. Action-Based Resets

- **Reset Before Action**: Clear error states before performing new actions
- **Auto-Reset Success**: Automatically reset success states after showing a message or redirecting
- **Timeout-Based Reset**: Use consistent timeouts (typically 1500-3000ms) for auto-resets

### 3. Navigation Resets

- **Reset Before Navigation**: Clear relevant state before navigating away
- **Preserve Relevant Data**: Only reset what's necessary, keeping global state when appropriate

## Implementation

We use the following patterns throughout the codebase:

### 1. Using `useResetOnUnmount` Hook

```typescript
// Reset a single state slice
useResetOnUnmount(resetState.taskDetail);

// Reset multiple state slices
useResetOnUnmount(resetState.profile);
useResetOnUnmount(resetState.stats);
```

### 2. Reset Before Fetching

```typescript
useEffect(() => {
  // Reset state before fetching
  resetState.taskDetail();
  fetchTaskById(taskId);
}, [taskId, fetchTaskById, resetState]);
```

### 3. Auto-Reset After Success

```typescript
// Auto-reset success state after a delay
if (success) {
  setTimeout(() => {
    resetState.profile({ preserve: true });
    onSuccess();
  }, 1500);
}
```

### 4. Reset Before Actions

```typescript
// Only reset if we had a previous error
if (taskMutationState.error) {
  resetState.taskMutation();
}
```

## Component-Specific Reset Patterns

### Form Components

- Reset async state on unmount
- Reset error state before submitting
- Auto-reset success state after successful submission

### List Views

- Reset filter/sort/pagination state on specific actions
- Preserve data but reset loading/error states on unmount

### Detail Views

- Reset detail state on unmount
- Reset before fetching new data

### Dashboard Components

- Reset state selectively, often preserving data
- Reset error states when appropriate

## Examples

### Authentication Components

```typescript
// Reset auth state on unmount
useResetOnUnmount(resetState.auth);

// Reset before login attempt
if (authState.error) {
  resetState.auth();
}

// Auto-reset success state after login
if (authState.success) {
  setTimeout(() => resetState.auth({ preserve: true }), 3000);
}
```

### Data Fetching Components

```typescript
// Reset before fetching
resetState.taskList();
fetchTasks();

// Reset both detail and mutation states on form unmount
useResetOnUnmount(resetState.taskDetail);
useResetOnUnmount(resetState.taskMutation);
```

## Best Practices

1. **Be Consistent**: Use the same reset patterns across similar components
2. **Prefer Specific Resets**: Reset only what's needed, not everything
3. **Preserve Data When Appropriate**: Use `{ preserve: true }` to keep data while resetting status flags
4. **Document Exceptions**: If a component uses a non-standard reset pattern, document why
5. **Reset Before Fetch**: Always reset state before fetching new data to ensure clean slate
6. **Auto-Reset Success States**: Don't leave success messages showing indefinitely

By following these standardized patterns, we ensure a consistent and predictable state management approach across the entire application.
