// app/userdashboard/profile/components/EditPersonalInfo.tsx

import React from "react";

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
  const [formData, setFormData] = React.useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
    bio: profileData.bio,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Edit Personal Information
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          <div>
            <label
              htmlFor="firstName-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName-mobile"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName-mobile"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email-mobile"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone-mobile"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>
          <div>
            <label
              htmlFor="bio-mobile"
              className="block text-sm text-gray-500 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio-mobile"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
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
              htmlFor="firstName-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName-desktop"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName-desktop"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email-desktop"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone-desktop"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="bio-desktop"
              className="block text-sm text-gray-500 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio-desktop"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
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
