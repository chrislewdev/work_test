// stores/profileStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { profileService } from "@/services/profileService";
import { User, UserStats } from "@/stores/authStore";
import {
  AsyncState,
  initialAsyncState,
  loadingState,
  successState,
  errorState,
} from "@/utils/asyncState";

// Define profile store state
interface ProfileState {
  // Profile data
  profile: User | null;

  // Async states
  profileState: AsyncState<User>;
  statsState: AsyncState<UserStats>;

  // Profile actions
  fetchProfile: (userId: string) => Promise<User | null>;
  updateProfile: (profileData: Partial<User>) => Promise<User | null>;
  fetchUserStats: (userId: string) => Promise<UserStats | null>;

  // State management
  clearProfile: () => void;
  clearProfileState: () => void;
  clearStatsState: () => void;
}

// Create profile store with persistence
const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Profile data
      profile: null,

      // Async states
      profileState: initialAsyncState,
      statsState: initialAsyncState,

      // Profile actions
      fetchProfile: async (userId: string) => {
        try {
          set({ profileState: loadingState(get().profileState) });

          const profile = await profileService.fetchUserProfile(userId);

          set({
            profileState: successState(profile),
            profile,
          });

          return profile;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          set({ profileState: errorState(errorMessage, get().profileState) });
          return null;
        }
      },

      updateProfile: async (profileData: Partial<User>) => {
        const currentProfile = get().profile;
        if (!currentProfile) {
          const errorMsg = "No profile loaded";
          set({
            profileState: errorState(errorMsg, get().profileState),
          });
          return null;
        }

        try {
          set({ profileState: loadingState(get().profileState) });

          const updatedProfile = await profileService.updateUserProfile(
            currentProfile.id,
            profileData
          );

          set({
            profileState: successState(updatedProfile),
            profile: updatedProfile,
          });

          return updatedProfile;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          set({ profileState: errorState(errorMessage, get().profileState) });
          return null;
        }
      },

      fetchUserStats: async (userId: string) => {
        try {
          set({ statsState: loadingState(get().statsState) });

          const stats = await profileService.getUserStats(userId);

          set({ statsState: successState(stats) });

          return stats;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          set({ statsState: errorState(errorMessage, get().statsState) });
          return null;
        }
      },

      // State management
      clearProfile: () => {
        set({
          profile: null,
          profileState: initialAsyncState,
          statsState: initialAsyncState,
        });
      },
      clearProfileState: () => set({ profileState: initialAsyncState }),
      clearStatsState: () => set({ statsState: initialAsyncState }),
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
