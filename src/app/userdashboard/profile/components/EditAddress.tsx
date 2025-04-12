// app/userdashboard/profile/components/EditAddress.tsx

import React, { useState } from "react";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";

interface EditAddressProps {
  addressData: {
    country: string;
    cityState: string;
    postalCode: string;
    taxId: string;
  };
  onCancel: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
}

export default function EditAddress({
  addressData,
  onCancel,
  onSubmit,
  isLoading = false,
  isError = false,
  errorMessage = "",
  isSuccess = false,
}: EditAddressProps) {
  // Track local form submission to prevent double clicks
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with useForm hook
  const form = useForm({
    initialValues: {
      country: addressData.country,
      cityState: addressData.cityState,
      postalCode: addressData.postalCode,
      taxId: addressData.taxId,
    },
  });

  // Determine form status based on error or success
  const getFormStatus = () => {
    if (isError) {
      return {
        type: "error" as const,
        message: errorMessage,
      };
    }

    if (isSuccess) {
      return {
        type: "success" as const,
        message: "Address updated successfully.",
      };
    }

    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Run form validation
    form.handleSubmit(e);

    // Prevent double submission
    if (isSubmitting) return;

    // If form is valid, call the parent's submit handler
    if (Object.keys(form.errors).length === 0) {
      try {
        setIsSubmitting(true);
        await onSubmit(form.values);
        // Note: We don't need to handle success/error here as it's managed by the parent component
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        // Reset submission state if not redirecting or closing
        if (!isSuccess) {
          setIsSubmitting(false);
        }
      }
    }
  };

  // Calculate if the form should be disabled
  const isFormDisabled = isLoading || isSubmitting || isSuccess;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border border-gray-200 dark:border-zinc-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Edit Address
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
            label="Country"
            id="country"
            name="country"
            type="text"
            value={form.values.country}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("country")}
            error={form.errors.country}
            touched={form.touched.country}
            disabled={isFormDisabled}
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
            disabled={isFormDisabled}
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
            disabled={isFormDisabled}
          />

          <FormField
            label="TAX ID"
            id="taxId"
            name="taxId"
            type="text"
            value={form.values.taxId}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("taxId")}
            error={form.errors.taxId}
            touched={form.touched.taxId}
            disabled={isFormDisabled}
          />
        </div>

        <FormActions>
          <FormButton
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isFormDisabled}
          >
            Cancel
          </FormButton>
          <FormButton
            type="submit"
            isLoading={isLoading || isSubmitting}
            loadingText="Saving..."
            disabled={isFormDisabled}
          >
            Save Changes
          </FormButton>
        </FormActions>
      </form>
    </div>
  );
}
