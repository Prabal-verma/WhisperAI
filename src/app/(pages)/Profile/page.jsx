"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // For smooth transition animations
import Sidebar from "@/components/ui/Sidebar";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div>
      <Sidebar/>
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-[100px]">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 transition-all duration-500 hover:shadow-2xl">
        {/* Avatar Section */}
        <motion.div
          className="relative -mt-12 flex justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={session?.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-md"
          />
        </motion.div>

        {/* Profile Info */}
        <div className="mt-6 text-center">
          <motion.h1
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {session?.user?.name || "John Doe"}
          </motion.h1>
          <motion.p
            className="text-gray-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {session?.user?.email || "johndoe@example.com"}
          </motion.p>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
            <p className="mt-2 text-gray-500">Phone: +1 (555) 123-4567</p>
            <p className="mt-1 text-gray-500">Location: New York, USA</p>
          </motion.div>

          {/* Chatbot Status */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Chatbot Usage</h2>
            <p className="mt-2 text-gray-500">Chatbot Status: Active</p>
            <p className="mt-1 text-gray-500">Interactions: 52 sessions</p>
          </motion.div>

          {/* Your Goal */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Your Goal</h2>
            <p className="mt-2 text-gray-500">Goal: To promote mental well-being and provide emotional support.</p>
          </motion.div>

          {/* Joined Date */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Joined Date</h2>
            <p className="mt-2 text-gray-500">Joined: January 15, 2023</p>
          </motion.div>

          {/* Emotional Support Usage */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Support Sessions</h2>
            <p className="mt-2 text-gray-500">Total Sessions: 32</p>
          </motion.div>

          {/* User's Emotional Status */}
          <motion.div
            className="p-4 bg-gray-50 rounded-lg shadow transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-gray-700">Emotional Status</h2>
            <p className="mt-2 text-gray-500">Current Mood: Feeling optimistic and positive</p>
          </motion.div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEdit}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </motion.button>
        </div>
      </div>
    </div>
    </div>
  );
}
