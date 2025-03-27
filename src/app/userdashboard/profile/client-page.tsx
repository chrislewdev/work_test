// app/userdashboard/profile/client-page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui_blocks/Container";
import {
  InstagramIcon,
  XIcon,
  TikTokIcon,
  XiaohongshuIcon,
} from "@/components/ui_blocks/SocialIcons";
import Button from "@/components/ui_blocks/Button";
import EditPersonalInfo from "./components/EditPersonalInfo";
import EditAddress from "./components/EditAddress";
import EditProfile from "./components/EditProfile";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

function EditIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function DashboardClientPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
    updateProfile,
    clearProfile,
  } = useProfileStore();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !profile) {
      // If authenticated but no profile loaded, fetch it
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, profile, router, fetchProfile]);

  // If still loading or not authenticated, show nothing yet
  if (!user || !isAuthenticated) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  // If profile is loading, show loading state
  if (profileLoading) {
    return (
      <div className="flex justify-center p-8">Loading profile data...</div>
    );
  }

  // If there's an error loading the profile
  if (profileError) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error: {profileError}
      </div>
    );
  }

  // If we have no profile, show error
  if (!profile) {
    return (
      <div className="flex justify-center p-8">No profile data available</div>
    );
  }

  // Ensure we have a user profile for TypeScript
  const currentUser = profile;

  // Handlers for updates
  const handleProfileUpdate = async (data: any) => {
    await updateProfile(data);
    setEditingProfile(false);
  };

  const handlePersonalInfoUpdate = async (data: any) => {
    await updateProfile(data);
    setEditingPersonalInfo(false);
  };

  const handleAddressUpdate = async (data: any) => {
    await updateProfile(data);
    setEditingAddress(false);
  };

  function ProfileCard() {
    if (editingProfile) {
      return (
        <EditProfile
          profileData={{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            title: currentUser.title || "",
            location: currentUser.location || "",
            profilePic:
              currentUser.profilePic || "/images/photos/profile-pic.jpg",
          }}
          onCancel={() => setEditingProfile(false)}
          onSave={handleProfileUpdate}
        />
      );
    }

    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-md w-24 h-24">
            <Image
              src={currentUser.profilePic || "/images/photos/profile-pic.jpg"}
              alt="Profile picture"
              width={96}
              height={96}
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {currentUser.firstName} {currentUser.lastName}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {currentUser.title} | {currentUser.location}
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 fill-current"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="X (Twitter)"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                <XIcon className="h-6 w-6 fill-current" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                <InstagramIcon className="h-6 w-6 fill-current" />
              </Link>
              <Link
                href="#"
                aria-label="TikTok"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                <TikTokIcon className="h-6 w-6 fill-current" />
              </Link>
              <Link
                href="#"
                aria-label="Xiaohongshu"
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                <XiaohongshuIcon className="h-6 w-6 fill-current" />
              </Link>
            </div>
          </div>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => setEditingProfile(true)}
            disabled={profileLoading}
          >
            <EditIcon className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    );
  }

  function PersonalInformation() {
    if (editingPersonalInfo) {
      return (
        <EditPersonalInfo
          profileData={{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            phone: currentUser.phone || "",
            bio: currentUser.bio || "",
          }}
          onCancel={() => setEditingPersonalInfo(false)}
          onSave={handlePersonalInfoUpdate}
        />
      );
    }

    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Personal Information
          </h2>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => setEditingPersonalInfo(true)}
            disabled={profileLoading}
          >
            <EditIcon className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              First Name
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.firstName}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Last Name
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Email address
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Phone</p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.phone || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Bio</p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.bio || "No bio provided"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function Address() {
    if (editingAddress) {
      return (
        <EditAddress
          addressData={{
            country: currentUser.country || "",
            cityState: currentUser.cityState || "",
            postalCode: currentUser.postalCode || "",
            taxId: currentUser.taxId || "",
          }}
          onCancel={() => setEditingAddress(false)}
          onSave={handleAddressUpdate}
        />
      );
    }

    return (
      <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Address
          </h2>
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => setEditingAddress(true)}
            disabled={profileLoading}
          >
            <EditIcon className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Country</p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.country || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              City/State
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.cityState || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Postal Code
            </p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.postalCode || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">TAX ID</p>
            <p className="text-zinc-900 dark:text-zinc-100">
              {currentUser.taxId || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container className="mt-16 max-w-4xl mx-auto">
        {profileLoading && (
          <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 rounded-md p-3 mt-4">
            Saving changes...
          </div>
        )}
        {profileError && (
          <div className="bg-red-50 border border-red-100 text-red-700 rounded-md p-3 mt-4">
            Error: {profileError}
          </div>
        )}
        <ProfileCard />
        <PersonalInformation />
        <Address />
      </Container>
    </>
  );
}
