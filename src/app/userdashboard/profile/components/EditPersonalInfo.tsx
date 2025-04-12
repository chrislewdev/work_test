// app/userdashboard/profile/components/EditPersonalInfo.tsx

import React, { useEffect } from "react";
import FormField from "@/components/ui_blocks/FormField";
import TextAreaField from "@/components/ui_blocks/TextAreaField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";
import useProfileStore from "@/stores/profileStore";

interface EditPersonalInfoProps {
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
  };
  onCancel: () => void;
  onSave: (data: any) => void; // Changed from onClose to onSave to match parent component
}

export default function EditPersonalInfo({
  profileData,
  onCancel,
  onSave, // Changed from onClose to onSave
}: EditPersonalInfoProps) {
  const { updateProfile, profileState, resetState } = useProfileStore();

  const { loading, error, success } = profileState;

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
        value: /^[0-9+\-\s]*$/,
        message: "Invalid phone number format",
      },
    },
  };

  // Initialize form with useForm hook
  const form = useForm({
    initialValues: {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      bio: profileData.bio,
    },
    validationRules,
  });

  // Monitor success state to close form after successful update
  useEffect(() => {
    if (success) {
      // Close the form after a delay to show the success message
      const timer = setTimeout(() => {
        onSave(form.values); // Changed from onClose to onSave
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, onSave, form.values]);

  // Determine form status based on error or success
  const getFormStatus = () => {
    if (error) {
      return {
        type: "error" as const,
        message: error,
      };
    }

    if (success) {
      return {
        type: "success" as const,
        message: "Profile updated successfully.",
      };
    }

    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(e);

    // If form is valid, save it
    if (Object.keys(form.errors).length === 0) {
      // Reset state before submitting to clear any previous messages
      resetState.profile();

      // Call the update directly (no intermediate handler)
      await updateProfile(form.values);

      // The useEffect above will handle closing the form if successful
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Personal Information
      </h2>

      {getFormStatus() && (
        <FormStatus
          type={getFormStatus()!.type}
          message={getFormStatus()!.message}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit}>
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
            disabled={loading}
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
            disabled={loading}
          />

          <FormField
            label="Email address"
            id="email"
            name="email"
            type="email"
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
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("phone")}
            error={form.errors.phone}
            touched={form.touched.phone}
            disabled={loading}
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
            rows={3}
            className="md:col-span-2"
            disabled={loading}
          />
        </div>

        <FormActions>
          <FormButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            isLoading={loading}
            loadingText="Saving..."
            disabled={loading || success}
          >
            Save Changes
          </FormButton>
        </FormActions>
      </form>
    </div>
  );
}
