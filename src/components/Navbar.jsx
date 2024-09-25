import React from 'react';
import Image from 'next/image';
import { auth, signOut } from "../auth"; // Adjust the import path based on your project structure
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileBox from  "../components/ProfileBox"


const Header = async () => {
  const session = await auth(); // Get session data

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Clickable Logo */}
        <a href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
          Whisper
        </a>
        
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
              

                                <Dialog>
                  <DialogTrigger>  <Image src={session.user.image} alt="User Avatar" height={35} width={35} className="rounded-full" />
                  </DialogTrigger>
                  <DialogContent>
                    <ProfileBox/>
                  </DialogContent>
                </Dialog>
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
