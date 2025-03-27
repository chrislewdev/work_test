// app/userdashboard/profile/components/EditAddress.tsx

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
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Address</h2>

      <form onSubmit={handleSubmit}>
        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          <div>
            <label
              htmlFor="country-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country-mobile"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cityState-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              City/State
            </label>
            <input
              type="text"
              id="cityState-mobile"
              name="cityState"
              value={formData.cityState}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postalCode-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode-mobile"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="taxId-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              TAX ID
            </label>
            <input
              type="text"
              id="taxId-mobile"
              name="taxId"
              value={formData.taxId}
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
              htmlFor="country-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country-desktop"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cityState-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              City/State
            </label>
            <input
              type="text"
              id="cityState-desktop"
              name="cityState"
              value={formData.cityState}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="postalCode-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode-desktop"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="taxId-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              TAX ID
            </label>
            <input
              type="text"
              id="taxId-desktop"
              name="taxId"
              value={formData.taxId}
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
