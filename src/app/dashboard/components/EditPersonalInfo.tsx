// app/dashboard/components/EditPersonalInfo.tsx

import React from "react";
import { useRouter } from "next/navigation";

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
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 mt-6">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Edit Personal Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="bio"
              className="block text-sm text-zinc-500 dark:text-zinc-400 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
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
