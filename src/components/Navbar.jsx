import React from 'react';
import Image from 'next/image';
import { auth,signOut } from "../auth"; // Adjust the import path based on your project structure

const Header = async () => {
  const session = await auth(); // Get session data

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">Whisper</h1>
        <div className="flex items-center space-x-6">
          {/* Show Login and Sign Up if user is not logged in */}
          {!session || !session.user ? (
            <>
              <a href="/sign-in" className="text-blue-600 font-semibold hover:text-blue-500 transition duration-200">Login</a>
              <a href="/sign-up" className="text-blue-600 font-semibold hover:text-blue-500 transition duration-200">Sign Up</a>
            </>
          ) : (
            <>
              {/* Show User Avatar if logged in */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <Image src={session.user.image} alt="User Avatar" height={35} width={35} className="rounded-full" />
              </div>
              {/* Logout Button */}
              <form action={async () => {
                "use server";
                await signOut(); // Ensure you import signOut from the right module
              }}>
                <button type="submit" className="text-blue-600 font-semibold hover:text-blue-500 transition duration-200">Sign Out</button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
