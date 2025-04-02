// src/app/userdashboard/profile/client-page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  InstagramIcon,
  XIcon,
  TikTokIcon,
  XiaohongshuIcon,
} from "@/components/ui_blocks/SocialIcons";
import EditPersonalInfo from "./components/EditPersonalInfo";
import EditAddress from "./components/EditAddress";
import EditProfile from "./components/EditProfile";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

function EditIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="20"
      height="20"
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
  const { user } = useAuthStore();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  // Fetch profile if not already loaded
  useEffect(() => {
    if (user && !profile) {
      fetchProfile(user.id);
    }
  }, [user, profile, fetchProfile]);

  // If profile is loading, show loading state
  if (profileLoading && !profile) {
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
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">
        {/* Profile card */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <div className="relative overflow-hidden rounded-full w-20 h-20 mb-4 md:mb-0 md:mr-4 border-4 border-white shadow">
              <Image
                src={currentUser.profilePic || "/images/photos/profile-pic.jpg"}
                alt="Profile picture"
                width={80}
                height={80}
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800">
                {currentUser.firstName} {currentUser.lastName}
              </h3>
              <p className="text-blue-600">
                {currentUser.title || "Team Manager"}
              </p>
              <p className="text-gray-500 text-sm">
                {currentUser.location || "Arizona, United States"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-80">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>
            </Link>
            <Link href="#" className="hover:opacity-80">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <XIcon className="h-4 w-4 fill-current" />
              </div>
            </Link>
            <Link href="#" className="hover:opacity-80">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </Link>
            <Link href="#" className="hover:opacity-80">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <InstagramIcon className="h-4 w-4 fill-current" />
              </div>
            </Link>
            <button
              onClick={() => setEditingProfile(true)}
              className="ml-2 px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
              disabled={profileLoading}
            >
              <EditIcon className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
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
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Personal Information
          </h2>

          <button
            className="ml-2 px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
            onClick={() => setEditingPersonalInfo(true)}
            disabled={profileLoading}
          >
            <EditIcon className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            <p className="text-gray-800 font-medium">{currentUser.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            <p className="text-gray-800 font-medium">{currentUser.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email address</p>
            <p className="text-gray-800 font-medium">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone</p>
            <p className="text-gray-800 font-medium">
              {currentUser.phone || "+09 343 398 45"}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Bio</p>
            <p className="text-gray-800 font-medium">
              {currentUser.bio || "Team Manager"}
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
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Address</h2>

          <button
            className="ml-2 px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
            onClick={() => setEditingAddress(true)}
            disabled={profileLoading}
          >
            <EditIcon className="h-3.5 w-3.5" />
            Edit
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Country</p>
            <p className="text-gray-800 font-medium">
              {currentUser.country || "United States"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">City/State</p>
            <p className="text-gray-800 font-medium">
              {currentUser.cityState || "Arizona, United States."}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Postal Code</p>
            <p className="text-gray-800 font-medium">
              {currentUser.postalCode || "ERT 2489"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">TAX ID</p>
            <p className="text-gray-800 font-medium">
              {currentUser.taxId || "AS4568384"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main profile header outside of cards */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          </div>

          {/* Wrapper box containing all profile components */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="space-y-6">
              <ProfileCard />
              <PersonalInformation />
              <Address />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
