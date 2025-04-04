// app/userdashboard/profile/components/EditPersonalInfo.tsx

import React from "react";
import FormField from "@/components/ui_blocks/FormField";
import TextAreaField from "@/components/ui_blocks/TextAreaField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import { useForm } from "@/app/hooks/useForm";

interface EditPersonalInfoProps {
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
  };
  onCancel: () => void;
  onSave: (data: any) => void;
}

export default function EditPersonalInfo({
  profileData,
  onCancel,
  onSave,
}: EditPersonalInfoProps) {
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
        value: /^[0-9]*$/,
        message: "Only numbers are allowed",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(e);

    // If form is valid, save it
    if (Object.keys(form.errors).length === 0) {
      onSave(form.values);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Personal Information
      </h2>

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
