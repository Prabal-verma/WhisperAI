import React from 'react';
import UserAvatar from "../components/auth/UserAvatar";


const Header = () => {


  
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">Whisper</h1>
        <div className="flex items-center space-x-6">
          <a href="/sign-in" className="text-blue-600 font-semibold hover:text-blue-500 transition duration-200">Login</a>
          <a href="/sign-up" className="text-blue-600 font-semibold hover:text-blue-500 transition duration-200">Sign Up</a>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300">
            <UserAvatar />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
