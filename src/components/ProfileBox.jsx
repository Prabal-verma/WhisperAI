// components/ProfileBox.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
 // Adjust import based on your project structure

const ProfileBox = ({ session }) => {
  const [name, setName] = useState(session?.user?.name || '');
  const [email, setEmail] = useState(session?.user?.email || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(session?.user?.image || '');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Logic to save profile changes
    console.log('Profile Updated:', { name, email, password, avatar });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
      <p className="text-sm text-gray-500">Update your profile information and save changes.</p>

      <div className="mt-4 space-y-4">
        {/* Avatar Upload */}
        <div className="flex items-center space-x-4">
          <Image
            src={avatar || '/default-avatar.png'}
            alt="Profile Avatar"
            height={60}
            width={60}
            className="rounded-full border-2 border-gray-300"
          />
          <div>
            <label htmlFor="avatar" className="text-sm font-medium text-gray-600">Change Avatar</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Leave blank to keep current password"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition duration-150"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
