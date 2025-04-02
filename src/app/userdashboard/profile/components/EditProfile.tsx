// app/userdashboard/profile/components/EditProfile.tsx

import React, { useState, useRef } from "react";
import Image from "next/image";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import { useForm } from "@/app/hooks/useForm";

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with useForm hook
  const form = useForm({
    initialValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      title: profileData.title,
      location: profileData.location,
    },
    validationRules: {
      firstName: {
        required: "First name is required",
      },
      lastName: {
        required: "Last name is required",
      },
    },
  });

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
    form.handleSubmit(e);

    // If form is valid, save it with the profile image
    if (Object.keys(form.errors).length === 0) {
      onSave({
        ...form.values,
        profilePic: previewImage || profileData.profilePic,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <div className="relative overflow-hidden rounded-full ring-1 ring-gray-200 dark:ring-zinc-700 w-20 h-20 mb-4">
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
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
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

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            value={form.values.firstName}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("firstName")}
            error={form.errors.firstName}
            touched={form.touched.firstName}
            required
          />

          <FormField
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            value={form.values.lastName}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("lastName")}
            error={form.errors.lastName}
            touched={form.touched.lastName}
            required
          />

          <FormField
            label="Title"
            id="title"
            name="title"
            type="text"
            value={form.values.title}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("title")}
            error={form.errors.title}
            touched={form.touched.title}
          />

          <FormField
            label="Location"
            id="location"
            name="location"
            type="text"
            value={form.values.location}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("location")}
            error={form.errors.location}
            touched={form.touched.location}
          />
        </div>

        <FormActions>
          <FormButton type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </FormButton>
          <FormButton type="submit">Save Changes</FormButton>
        </FormActions>
      </form>
    </div>
  );
}
