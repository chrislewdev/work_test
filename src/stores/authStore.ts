// stores/authStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

// Define user stats type
export interface UserStats {
  tasksFulfilled: number;
  successScore: number;
  taskRating: number;
  responseRate: number;
  lastLogin: string;
  memberSince: string;
  profileCompleteness: number;
}

// Define user type
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  bio?: string;
  location?: string;
  country?: string;
  cityState?: string;
  postalCode?: string;
  taxId?: string;
  profilePic?: string;
  stats?: UserStats;
}

// Define auth store state
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;

  // Authentication actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// Create auth store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });

          // Use auth service to login
          const user = await authService.login(email, password);

          set({ isAuthenticated: true, user, loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      register: async (userData: Partial<User>, password: string) => {
        try {
          set({ loading: true, error: null });

          // Use auth service to register
          const newUser = await authService.register(userData, password);

          set({ isAuthenticated: true, user: newUser, loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      resetPassword: async (oldPassword: string, newPassword: string) => {
        try {
          set({ loading: true, error: null });

          const currentUser = get().user;
          if (!currentUser) {
            throw new Error("Not authenticated");
          }

          // Use auth service to reset password
          await authService.resetPassword(
            currentUser.email,
            oldPassword,
            newPassword
          );

          set({ loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      forgotPassword: async (email: string) => {
        try {
          set({ loading: true, error: null });

          // Use auth service to request password reset
          await authService.forgotPassword(email);

          set({ loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage", // name of the item in localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
