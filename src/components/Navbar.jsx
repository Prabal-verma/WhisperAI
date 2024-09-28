"use client"
import React from 'react';
import Link from 'next/link';
import { UserButton } from './auth/user-button';
import { useSession } from 'next-auth/react';
import DarkMode from "../hooks/DarkMode"



const Header = () => {
  const {data:session, status:sessionStatus }=useSession() // Get session data
  // const [darkMode, setDarkMode] = useState(false);  
  if(sessionStatus=="loading"){
    return<h1>Loading...</h1>
  }



  return (
    <nav className="bg-white dark:bg-black dark:text-white shadow-lg fixed w-full top-0 z-50 transition-shadow duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Clickable Logo */}
        <Link href="/" className="text-3xl font-bold ml-[40px] bg-gradient-to-r from-blue-600  to-pink-400 inline-block text-transparent bg-clip-text  lg:ml-0 text-blue-600 tracking-tight transition duration-200 hover:text-blue-700 hover:scale-105 transform" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Whisper
        </Link>

        <div className="flex items-center space-x-6">
          <DarkMode/>
          {!session? (
            <>
              <Link href="/auth/login" className="text-blue-600 font-bold hover:text-blue-500 transition duration-200 py-2 px-4 rounded-lg hover:bg-blue-100 shadow-md">
                Login
              </Link>
              <Link href="/auth/register" className="text-blue-600 font-bold hover:text-blue-500 transition duration-200 py-2 px-4 rounded-lg hover:bg-blue-100 shadow-md">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Show User Avatar if logged in */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-lg">
                <UserButton />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
