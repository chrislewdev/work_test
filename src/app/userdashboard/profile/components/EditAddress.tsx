// app/userdashboard/profile/components/EditAddress.tsx

import React, { useEffect } from "react";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";
import useProfileStore from "@/stores/profileStore";

interface EditAddressProps {
  addressData: {
    country: string;
    cityState: string;
    postalCode: string;
    taxId: string;
  };
  onCancel: () => void;
  onSave: (data: any) => void; // Changed from onClose to onSave to match parent component
}

export default function EditAddress({
  addressData,
  onCancel,
  onSave, // Changed from onClose to onSave
}: EditAddressProps) {
  const { updateProfile, profileState, resetState } = useProfileStore();

  const { loading, error, success } = profileState;

  // Initialize form with useForm hook
  const form = useForm({
    initialValues: {
      country: addressData.country,
      cityState: addressData.cityState,
      postalCode: addressData.postalCode,
      taxId: addressData.taxId,
    },
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
        message: "Address updated successfully.",
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
