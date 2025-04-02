// src/components/profile/ProfileEditForm.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FormField from "@/components/ui_blocks/FormField";
import TextAreaField from "@/components/ui_blocks/TextAreaField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormSection from "@/components/ui_blocks/FormSection";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { User } from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";
import { cn } from "@/app/lib/utils";

interface ProfileEditFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  location: string;
  country: string;
  cityState: string;
  postalCode: string;
  taxId: string;
}

interface ProfileEditFormProps {
  user: User;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  onCancel,
  onSuccess,
}) => {
  const { updateProfile, loading, error, clearError } = useProfileStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form validation rules
  const validationRules = {
    firstName: {
      required: "First name is required",
    },
    lastName: {
      required: "Last name is required",
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    phone: {
      pattern: {
        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        message: "Invalid phone number format",
      },
    },
  };

  // Initialize form with useForm hook
  const form = useForm<ProfileEditFormValues>({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      title: user.title || "",
      bio: user.bio || "",
      location: user.location || "",
      country: user.country || "",
      cityState: user.cityState || "",
      postalCode: user.postalCode || "",
      taxId: user.taxId || "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<ProfileEditFormValues>({
    onSubmit: async (data) => {
      const updateData = {
        ...data,
        profilePic: previewImage || user.profilePic,
      };
      await updateProfile(updateData);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Handle image selection
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);
    }
  };

  // Determine form status based on error, success, or loading state
  const getFormStatus = () => {
    if (error) {
      return {
        type: "error" as const,
        message: error,
        title: "Error", // Add a default title for error states
      };
    }

    if (formSubmission.isSubmitted) {
      return {
        type: "success" as const,
        message: "Profile updated successfully.",
        title: "Success", // Add a default title for success states
      };
    }

    return undefined;
  };

  const formStatus = getFormStatus();

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Profile
      </h2>

      {formStatus && (
        <FormStatus
          type={formStatus.type}
          message={formStatus.message}
          title={formStatus.title}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative overflow-hidden rounded-full w-24 h-24 mb-4 border-4 border-white dark:border-zinc-700 shadow-sm">
            <Image
              src={
                previewImage ||
                user.profilePic ||
                "/images/photos/profile-pic.jpg"
              }
              alt="Profile picture"
              width={96}
              height={96}
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

        {/* Personal Information Section */}
        <FormSection title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={form.values.firstName}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("firstName")}
              error={form.errors.firstName}
              touched={form.touched.firstName}
              required
              disabled={loading || formSubmission.isSubmitting}
            />

            <FormField
              label="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={form.values.lastName}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("lastName")}
              error={form.errors.lastName}
              touched={form.touched.lastName}
              required
              disabled={loading || formSubmission.isSubmitting}
            />

            <FormField
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("email")}
              error={form.errors.email}
              touched={form.touched.email}
              required
              disabled={true} // Email is typically not editable
            />

            <FormField
              label="Phone"
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("phone")}
              error={form.errors.phone}
              touched={form.touched.phone}
              disabled={loading || formSubmission.isSubmitting}
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
              disabled={loading || formSubmission.isSubmitting}
              className="md:col-span-2"
            />

            <TextAreaField
              label="Bio"
              id="bio"
              name="bio"
              value={form.values.bio}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("bio")}
              error={form.errors.bio}
              touched={form.touched.bio}
              disabled={loading || formSubmission.isSubmitting}
              rows={4}
              className="md:col-span-2"
            />
          </div>
        </FormSection>

        {/* Location Section */}
        <FormSection title="Location" collapsible defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              disabled={loading || formSubmission.isSubmitting}
              className="md:col-span-2"
            />

            <FormField
              label="Country"
              id="country"
              name="country"
              type="text"
              value={form.values.country}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("country")}
              error={form.errors.country}
              touched={form.touched.country}
              disabled={loading || formSubmission.isSubmitting}
            />

            <FormField
              label="City/State"
              id="cityState"
              name="cityState"
              type="text"
              value={form.values.cityState}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("cityState")}
              error={form.errors.cityState}
              touched={form.touched.cityState}
              disabled={loading || formSubmission.isSubmitting}
            />

            <FormField
              label="Postal Code"
              id="postalCode"
              name="postalCode"
              type="text"
              value={form.values.postalCode}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("postalCode")}
              error={form.errors.postalCode}
              touched={form.touched.postalCode}
              disabled={loading || formSubmission.isSubmitting}
            />

            <FormField
              label="Tax ID"
              id="taxId"
              name="taxId"
              type="text"
              value={form.values.taxId}
              onChange={form.handleChange}
              onBlur={() => form.handleBlur("taxId")}
              error={form.errors.taxId}
              touched={form.touched.taxId}
              disabled={loading || formSubmission.isSubmitting}
            />
          </div>
        </FormSection>

        {/* Form Actions */}
        <FormActions>
          {onCancel && (
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading || formSubmission.isSubmitting}
            >
              Cancel
            </FormButton>
          )}
          <FormButton
            type="submit"
            isLoading={loading || formSubmission.isSubmitting}
            loadingText="Saving Changes..."
          >
            Save Changes
          </FormButton>
        </FormActions>
      </form>
    </div>
  );
};

export default ProfileEditForm;
