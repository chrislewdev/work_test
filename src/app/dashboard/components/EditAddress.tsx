// app/dashboard/components/EditAddress.tsx

import React from "react";

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
  const [formData, setFormData] = React.useState({
    country: addressData.country,
    cityState: addressData.cityState,
    postalCode: addressData.postalCode,
    taxId: addressData.taxId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mt-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Edit Address
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="country"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cityState"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              City/State
            </label>
            <input
              type="text"
              id="cityState"
              name="cityState"
              value={formData.cityState}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="taxId"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              TAX ID
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
