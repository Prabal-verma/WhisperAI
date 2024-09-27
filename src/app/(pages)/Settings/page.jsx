"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion"; // For smooth transition animations
import Sidebar from "@/components/ui/Sidebar";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState(session?.user?.email || '');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);
  const toggleTwoFactor = () => setTwoFactorEnabled(!twoFactorEnabled);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChangePassword = () => {
    // Add your logic for changing the password here
    alert("Password changed successfully!");
  };

  return (
    <div>
        <Sidebar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-[100px]">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 transition-all duration-500 hover:shadow-2xl">
        {/* Header Section */}
        <motion.h1
          className="text-3xl font-bold text-gray-900 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Settings
        </motion.h1>

        {/* User Information Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Account Information</h2>
          <p className="text-gray-500">Name: {session?.user?.name || "John Doe"}</p>
          <p className="text-gray-500">Email: {primaryEmail}</p>
          <input
            type="email"
            placeholder="Primary Email"
            value={primaryEmail}
            onChange={(e) => setPrimaryEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Secondary Email"
            value={secondaryEmail}
            onChange={(e) => setSecondaryEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Change Password Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleChangePassword}
            className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Change Password
          </button>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Notification Settings</h2>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="notifications"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="notifications" className="text-gray-600">Enable Notifications</label>
          </div>
        </motion.div>

        {/* Two-Factor Authentication Section */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Security Settings</h2>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="two-factor"
              checked={twoFactorEnabled}
              onChange={toggleTwoFactor}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="two-factor" className="text-gray-600">Enable Two-Factor Authentication</label>
          </div>
        </motion.div>

        {/* Save Settings Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEdit}
          >
            {isEditing ? "Save Settings" : "Edit Settings"}
          </motion.button>
        </div>
      </div>
    </div>
    </div>
  );
}
