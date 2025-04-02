// app/userdashboard/profile/components/EditAddress.tsx

import React from "react";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import { useForm } from "@/app/hooks/useForm";

interface EditAddressProps {
  addressData: {
    country: string;
    cityState: string;
    postalCode: string;
    taxId: string;
  };
  onCancel: () => void;
  onSave: (data: any) => void;
}

export default function EditAddress({
  addressData,
  onCancel,
  onSave,
}: EditAddressProps) {
  // Initialize form with useForm hook
  const form = useForm({
    initialValues: {
      country: addressData.country,
      cityState: addressData.cityState,
      postalCode: addressData.postalCode,
      taxId: addressData.taxId,
    },
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
        Edit Address
      </h2>

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
