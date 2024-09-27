import React, { useState } from 'react';
import { FaBars, FaHome, FaUser, FaSmile, FaBullseye, FaComments, FaSignOutAlt, FaCog, FaMedal,FaRunning } from 'react-icons/fa';
import { logout } from "@/actions/logout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button 
        className="md:hidden bg-blue-600 text-white p-3 fixed top-4 left-4 z-50 focus:outline-none rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed h-screen w-64 bg-blue-600 text-white top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 z-40`}
      >
        <div className="flex flex-col justify-between h-full py-6 px-4">
          <div>
            <h2 className="text-3xl font-bold text-center mb-10 transition-transform transform hover:scale-105 hover:text-gray-300">
              Dashboard
            </h2>
            <ul className="space-y-4">
              {[
                { name: "Home", icon: <FaHome />, link: "/dashboard" },
                { name: "Profile", icon: <FaUser />, link: "/Profile" },
                { name: "Start Chat", icon: <FaComments />, link: "/Chat" },
                { name: "Activity", icon: <FaRunning />, link: "/exercises" },
                { name: "Mood Tracking", icon: <FaSmile />, link: "/mood-tracker" },
                { name: "Goals", icon: <FaBullseye />, link: "/Goals" },
                { name: "Settings", icon: <FaCog />, link: "/Settings" },
              ].map((item, index) => (
                <li key={index} className="hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-colors duration-200">
                  <a href={item.link} className="flex items-center space-x-2 py-3 px-4">
                    {React.cloneElement(item.icon, { className: "transition-transform transform hover:rotate-12" })}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <logout onClick={()=>{logout()}}>
            <div className="flex items-center space-x-2 py-3 px-4 hover:bg-red-200 hover:text-red-600 rounded-lg transition-colors duration-200 cursor-pointer">
              <FaSignOutAlt className="transition-transform transform hover:rotate-12" />
              <span className="font-normal">
                 Logout
              </span>
            </div>
            </logout>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-100" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
