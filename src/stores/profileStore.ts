// stores/profileStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { profileService } from "@/services/profileService";
import { User, UserStats } from "@/stores/authStore";

// Define profile store state
interface ProfileState {
  profile: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  clearProfile: () => void;
  clearError: () => void;
}

// Create profile store with persistence
const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      loading: false,
      error: null,

      fetchProfile: async (userId: string) => {
        try {
          set({ loading: true, error: null });

          // Use profile service to fetch profile
          const profile = await profileService.fetchUserProfile(userId);

          set({ profile, loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      updateProfile: async (profileData: Partial<User>) => {
        try {
          set({ loading: true, error: null });

          const currentProfile = get().profile;
          if (!currentProfile) {
            throw new Error("No profile loaded");
          }

          // Use profile service to update profile
          const updatedProfile = await profileService.updateUserProfile(
            currentProfile.id,
            profileData
          );

          set({ profile: updatedProfile, loading: false });
        } catch (error: any) {
          set({ loading: false, error: error.message });
        }
      },

      clearProfile: () => {
        set({ profile: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "profile-storage", // name of the item in localStorage
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);

export default useProfileStore;
