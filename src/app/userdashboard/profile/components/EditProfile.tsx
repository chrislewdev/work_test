// app/userdashboard/profile/components/EditProfile.tsx

import React, { useState, useRef } from "react";
import Image from "next/image";

interface EditProfileProps {
  profileData: {
    firstName: string;
    lastName: string;
    title: string;
    location: string;
    profilePic: string;
  };
  onCancel: () => void;
  onSave: (data: any) => void;
}

export default function EditProfile({
  profileData,
  onCancel,
  onSave,
}: EditProfileProps) {
  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    title: profileData.title,
    location: profileData.location,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle image upload here
    onSave({ ...formData, profilePic: previewImage || profileData.profilePic });
  };

  return (
    <div className="border border-gray-100 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <div className="relative overflow-hidden rounded-full ring-1 ring-gray-200 w-20 h-20 mb-4">
            <Image
              src={previewImage || profileData.profilePic}
              alt="Profile picture"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Change Profile Picture
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          <div>
            <label
              htmlFor="firstName-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName-mobile"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName-mobile"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title-mobile"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label
              htmlFor="location-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location-mobile"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="submit"
              className="rounded-full bg-gray-800 py-2.5 text-white hover:bg-gray-700 text-sm"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-gray-300 py-2.5 text-gray-700 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          <div>
            <label
              htmlFor="firstName-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName-desktop"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName-desktop"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title-desktop"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label
              htmlFor="location-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location-desktop"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex mt-6 justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
