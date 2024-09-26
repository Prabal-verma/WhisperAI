import React from 'react';
import { FaHome, FaUser, FaChartBar, FaSignOutAlt, FaCog, FaSmile, FaBullseye } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-600 text-white fixed">
      <div className="flex flex-col justify-between h-full py-6 px-4">
        <div>
          <h2 className="text-3xl font-bold text-center mb-10 transition-transform transform hover:scale-105 hover:text-gray-300">
            Dashboard
          </h2>
          <ul className="space-y-8">
            <li>
              <a href="/dashboard" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaHome className="transition-transform transform hover:rotate-12"/>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/profile" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaUser className="transition-transform transform hover:rotate-12"/>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="/analytics" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaChartBar className="transition-transform transform hover:rotate-12"/>
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a href="/mood-tracking" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaSmile className="transition-transform transform hover:rotate-12"/>
                <span>Mood Tracking</span>
              </a>
            </li>
            <li>
              <a href="/goals" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaBullseye className="transition-transform transform hover:rotate-12"/>
                <span>Goals</span>
              </a>
            </li>
            <li>
              <a href="/settings" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
                <FaCog className="transition-transform transform hover:rotate-12"/>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <a href="/logout" className="flex items-center space-x-2 hover:text-blue-200 transition-transform transform hover:scale-105">
            <FaSignOutAlt className="transition-transform transform hover:rotate-12"/>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
