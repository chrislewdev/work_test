// src/components/profile/ProfileEditForm.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";
import { User } from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

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
  const { updateProfile, profileState, resetState } = useProfileStore();
  const { loading, error, success } = profileState;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset profile state on component unmount - consistent pattern
  useResetOnUnmount(resetState.profile);

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

  // Setup form submission handler
  const formSubmission = useFormSubmission<ProfileEditFormValues>({
    onSubmit: async (data) => {
      const updateData = {
        ...data,
        profilePic: previewImage || user.profilePic,
      };
      await updateProfile(updateData);
    },
  });

  // Only monitor the profile store's success state
  useEffect(() => {
    if (success && onSuccess) {
      // Auto-reset success state after a delay - consistent pattern
      const timer = setTimeout(() => {
        resetState.profile({ preserve: true });
        onSuccess();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, onSuccess, resetState]);

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

    // Only reset if we had a previous error - consistent pattern
    if (error) {
      resetState.profile();
    }

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
        title: "Error",
      };
    }

    if (success) {
      return {
        type: "success" as const,
        message: "Profile updated successfully.",
        title: "Success",
      };
    }

    return undefined;
  };

  const formStatus = getFormStatus();
  const isFormDisabled = loading || formSubmission.isSubmitting || success;

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
        {/* Form content omitted for brevity */}

        {/* Form Actions */}
        <FormActions>
          {onCancel && (
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isFormDisabled}
            >
              Cancel
            </FormButton>
          )}
          <FormButton
            type="submit"
            isLoading={loading || formSubmission.isSubmitting}
            loadingText="Saving Changes..."
            disabled={success}
          >
            Save Changes
          </FormButton>
        </FormActions>
      </form>
    </div>
  );
};

export default ProfileEditForm;
