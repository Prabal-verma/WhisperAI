import React from 'react'
import UserAvatar from "../components/auth/UserAvatar";

const header = () => {
  return (
    <>
     <nav className="bg-white shadow-md">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-blue-600 tracking-tight">Whisper</h1>
      <div className="space-x-4">
        <a href="/login" className="text-blue-600 font-semibold hover:text-blue-500">Login</a>
        <a href="/signup" className="text-blue-600 font-semibold hover:text-blue-500">Sign Up</a>

        <div className="w-10 h-10 rounded-full">
        <UserAvatar/>
        </div>
        
      </div>
    </div>
  </nav>
  </>
  )
}

export default header